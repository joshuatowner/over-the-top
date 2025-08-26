import { PartitionInfo } from '../../../../data/disk';
import { ClusteredCell, IClusterAssigner } from './clusterAssigner';
import { VoiCell, VoiDiagram, VoiHalfedge } from '../types';

export class EdgeProportionalAssigner implements IClusterAssigner {
  assignCells(diagram: VoiDiagram, partitions: PartitionInfo[], numSites: number, width: number, height: number): ClusteredCell[] {
    const totalCapacity = partitions.reduce((sum, p) => sum + (p.capacity || 0), 0);

    const assignedCells: ClusteredCell[] = [];
    const unassignedCellIds = new Set(diagram.cells.map(cell => cell.site.id));

    const diskAssignments = new Map<string, ClusteredCell[]>();
    const growingQueues = new Map<string, VoiCell[]>();
    const targetCellCounts = new Map<string, number>();

    const cellIdMap = new Map<number, VoiCell>();
    diagram.cells.forEach(cell => {
      cellIdMap.set(cell.site.id, cell);
    });

    partitions.forEach(p => {
      const targetCount = Math.round((p.capacity || 0) / totalCapacity * numSites);
      targetCellCounts.set(p.label, targetCount);
      diskAssignments.set(p.label, []);
      growingQueues.set(p.label, []);
    });

    const edgeCells = this.identifyEdgeCells(diagram, width, height);
    this.placeSeedCells(partitions, totalCapacity, edgeCells, unassignedCellIds, growingQueues, targetCellCounts);
    this.growPartitions(diagram, partitions, unassignedCellIds, growingQueues, targetCellCounts, assignedCells, cellIdMap);
    this.handleRemainingUnassignedCells(partitions, unassignedCellIds, assignedCells, cellIdMap);

    return assignedCells;
  }

  private identifyEdgeCells(diagram: VoiDiagram, width: number, height: number): { cell: VoiCell; angle: number; distance: number }[] {
    const centerX = width / 2;
    const centerY = height / 2;
    const diagramRadius = Math.min(width, height) / 2; // Approximate radius of the diagram
    const edgeBandMinRadius = diagramRadius * 0.8; // Cells within 80%-100% of radius
    const edgeBandMaxRadius = diagramRadius * 1.0;

    const edgeCells: { cell: VoiCell; angle: number; distance: number }[] = [];
    diagram.cells.forEach(cell => {
      const dist = Math.sqrt(Math.pow(cell.site.x - centerX, 2) + Math.pow(cell.site.y - centerY, 2));
      if (dist >= edgeBandMinRadius && dist <= edgeBandMaxRadius) {
        const angle = Math.atan2(cell.site.y - centerY, cell.site.x - centerX);
        edgeCells.push({ cell, angle, distance: dist });
      }
    });

    // Sort edge cells by angle
    edgeCells.sort((a, b) => a.angle - b.angle);
    return edgeCells;
  }

  private placeSeedCells(
    partitions: PartitionInfo[],
    totalCapacity: number,
    edgeCells: { cell: VoiCell; angle: number; }[],
    unassignedCellIds: Set<number>,
    growingQueues: Map<string, VoiCell[]>,
    targetCellCounts: Map<string, number>
  ): void {
    let currentAngle = -Math.PI; // Start from -PI (equivalent to 180 degrees left)
    partitions.forEach(p => {
      if (unassignedCellIds.size === 0) return;

      const proportionalAngleSpan = (p.capacity || 0) / totalCapacity * (2 * Math.PI);
      const targetAngle = currentAngle + proportionalAngleSpan / 2; // Center of the arc

      // Find candidate edge cells close to the targetAngle
      const candidateSeedCells: { cell: VoiCell; angle: number; }[] = [];
      const angleTolerance = Math.PI / 8; // Define a tolerance for "close enough" (e.g., 22.5 degrees)

      edgeCells.forEach(edgeCell => {
        if (unassignedCellIds.has(edgeCell.cell.site.id)) {
          let angleDiff = Math.abs(edgeCell.angle - targetAngle);
          // Handle angle wrapping around -PI/PI
          if (angleDiff > Math.PI) {
            angleDiff = 2 * Math.PI - angleDiff;
          }

          if (angleDiff <= angleTolerance) { // If within tolerance, add to candidates
            candidateSeedCells.push(edgeCell);
          }
        }
      });

      let seedCell: VoiCell | undefined;
      if (candidateSeedCells.length > 0) {
        // Randomly select one from the candidates
        const randomIndex = Math.floor(Math.random() * candidateSeedCells.length);
        const chosenCandidate = candidateSeedCells[randomIndex];
        seedCell = chosenCandidate.cell;
        (seedCell as any)._logAngle = chosenCandidate.angle; // Store angle for logging
      } else {
        // Fallback: if no candidates within tolerance, pick the closest one (original logic)
        let minAngleDiff = Infinity;
        edgeCells.forEach(edgeCell => {
          if (unassignedCellIds.has(edgeCell.cell.site.id)) {
            let angleDiff = Math.abs(edgeCell.angle - targetAngle);
            if (angleDiff > Math.PI) {
              angleDiff = 2 * Math.PI - angleDiff;
            }
            if (angleDiff < minAngleDiff) {
              minAngleDiff = angleDiff;
              seedCell = edgeCell.cell;
              (seedCell as any)._logAngle = edgeCell.angle;
            }
          }
        });
      }

      if (seedCell) {
        growingQueues.get(p.label)?.push(seedCell);
      }
      currentAngle += proportionalAngleSpan;
    });
  }

  private growPartitions(
    diagram: VoiDiagram,
    partitions: PartitionInfo[],
    unassignedCellIds: Set<number>,
    growingQueues: Map<string, VoiCell[]>,
    targetCellCounts: Map<string, number>,
    assignedCells: ClusteredCell[],
    cellIdMap: Map<number, VoiCell>
  ): void {
    let stillGrowing = true;
    while (stillGrowing && unassignedCellIds.size > 0) {
      stillGrowing = false; // Assume we are done unless a partition grows

      partitions.forEach(p => {
        const queue = growingQueues.get(p.label);
        const currentTarget = targetCellCounts.get(p.label) || 0;

        if (queue && queue.length > 0 && currentTarget > 0) {
          stillGrowing = true; // This partition is still active, so we continue the loop

          const cellToProcess = queue.shift()!; // Get the next cell to process for this partition

          // This cell might have been claimed by another partition since it was queued.
          // We check if it's still unassigned before processing.
          if (unassignedCellIds.has(cellToProcess.site.id)) {
            // Assign the cell when it's dequeued, not before.
            (cellToProcess as ClusteredCell).diskId = p.label;
            assignedCells.push(cellToProcess as ClusteredCell);
            unassignedCellIds.delete(cellToProcess.site.id);
            targetCellCounts.set(p.label, currentTarget - 1);

            // Add its unassigned neighbors to the queue for future processing.
            cellToProcess.halfedges.forEach((halfedge: VoiHalfedge) => {
              const neighborSite = (halfedge.edge.lSite && halfedge.edge.lSite.id === cellToProcess.site.id)
                ? halfedge.edge.rSite
                : halfedge.edge.lSite;

              if (neighborSite) {
                const neighborCell = cellIdMap.get(neighborSite.id) as VoiCell;
                // Check if the neighbor is unassigned before adding to the queue
                if (neighborCell && unassignedCellIds.has(neighborCell.site.id)) {
                  // To avoid adding the same cell to multiple queues, we can check a global set of queued IDs
                  // For now, we'll accept the possibility of duplicates in different queues,
                  // the check `unassignedCellIds.has()` at the start of the processing handles this.
                  queue.push(neighborCell);
                }
              }
            });
          }
        }
      });
    }
  }

  private handleRemainingUnassignedCells(
    partitions: PartitionInfo[],
    unassignedCellIds: Set<number>,
    assignedCells: ClusteredCell[],
    cellIdMap: Map<number, VoiCell>
  ): void {
    unassignedCellIds.forEach(id => {
      const cell = cellIdMap.get(id) as VoiCell;
      if (cell) {
        let minDistance = Infinity;
        let closestDiskId: string | undefined;

        assignedCells.forEach(assigned => {
          const dist = Math.sqrt(Math.pow(cell.site.x - assigned.site.x, 2) + Math.pow(cell.site.y - assigned.site.y, 2));
          if (dist < minDistance) {
            minDistance = dist;
            closestDiskId = assigned.diskId;
          }
        });

        if (closestDiskId) {
          (cell as ClusteredCell).diskId = closestDiskId;
          assignedCells.push(cell as ClusteredCell);
        } else {
          if (partitions.length > 0) {
            (cell as ClusteredCell).diskId = partitions[0].label;
            assignedCells.push(cell as ClusteredCell);
          }
        }
      }
    });
  }
}
