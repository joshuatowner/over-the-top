import { ClusteredCell } from "./clustering/clusterAssigner";
import { VoiCell, VoiHalfedge } from "./types";

export class DiskAnalyzer {
  private cellMap: Map<number, ClusteredCell>;

  constructor(clusteredCells: ClusteredCell[]) {
    this.cellMap = new Map<number, ClusteredCell>();
    clusteredCells.forEach(cell => {
      this.cellMap.set(cell.site.id, cell);
    });
  }

  private getNeighbors(cell: ClusteredCell): ClusteredCell[] {
    const neighbors: ClusteredCell[] = [];
    for (const halfedge of cell.halfedges) {
      const neighborSite = (halfedge.edge.lSite && halfedge.edge.lSite.id === cell.site.id)
        ? halfedge.edge.rSite
        : halfedge.edge.lSite;

      if (neighborSite) {
        const neighborCell = this.cellMap.get(neighborSite.id);
        if (neighborCell) {
          neighbors.push(neighborCell);
        }
      }
    }
    return neighbors;
  }

  private calculateCentroid(cells: ClusteredCell[]): {x: number, y: number} {
    if (cells.length === 0) {
      return {x: 0, y: 0};
    }
    let sumX = 0;
    let sumY = 0;
    cells.forEach(cell => {
      sumX += cell.site.x;
      sumY += cell.site.y;
    });
    return {x: sumX / cells.length, y: sumY / cells.length};
  }

  private findConnectedComponent(startCell: ClusteredCell, visited: Set<number>, filterDiskId?: string): ClusteredCell[] {
    const component: ClusteredCell[] = [];
    const stack: ClusteredCell[] = [startCell];
    visited.add(startCell.site.id);

    while (stack.length > 0) {
      const current = stack.pop()!;
      component.push(current);

      for (const neighbor of this.getNeighbors(current)) {
        const isSameDisk = filterDiskId ? neighbor.diskId === filterDiskId : true;
        if (isSameDisk && neighbor.diskId !== "river" && !visited.has(neighbor.site.id)) {
          visited.add(neighbor.site.id);
          stack.push(neighbor);
        }
      }
    }
    return component;
  }

  public getComponentCentroids(): Map<string, {x: number; y: number}> {
    const centroids = new Map<string, {x: number; y: number}>();
    const cellsByDiskId = this.groupCellsByDiskId();

    cellsByDiskId.forEach((cells, diskId) => {
      let largestComponent: ClusteredCell[] = [];
      const diskVisited = new Set<number>(); // Visited set for this disk's components

      cells.forEach(cell => {
        if (!diskVisited.has(cell.site.id)) {
          const component = this.findConnectedComponent(cell, diskVisited, diskId);
          if (component.length > largestComponent.length) {
            largestComponent = component;
          }
        }
      });

      if (largestComponent.length > 0) {
        centroids.set(diskId, this.calculateCentroid(largestComponent));
      }
    });

    return centroids;
  }

  private groupCellsByDiskId(): Map<string, ClusteredCell[]> {
    const cellsByDiskId = new Map<string, ClusteredCell[]>();
    this.cellMap.forEach(cell => {
      if (cell.diskId && cell.diskId !== "river") {
        if (!cellsByDiskId.has(cell.diskId)) {
          cellsByDiskId.set(cell.diskId, []);
        }
        cellsByDiskId.get(cell.diskId)!.push(cell);
      }
    });
    return cellsByDiskId;
  }

  public getDiskBorders(): Map<string, string[]> {
    const borders = new Map<string, string[]>();
    const borderSegmentsByDiskId = this.identifyBorderSegments();

    borderSegmentsByDiskId.forEach((segments, diskId) => {
      const svgPaths = this.chainSegmentsIntoPaths(segments);
      borders.set(diskId, svgPaths);
    });

    return borders;
  }

  private identifyBorderSegments(): Map<string, VoiHalfedge[]> {
    const borderSegmentsByDiskId = new Map<string, VoiHalfedge[]>();

    this.cellMap.forEach(cell => {
      if (cell.diskId && cell.diskId !== "river") {
        for (const halfedge of cell.halfedges) {
          const neighborSite = (halfedge.edge.lSite && halfedge.edge.lSite.id === cell.site.id)
            ? halfedge.edge.rSite
            : halfedge.edge.lSite;

          let isBorder = false;
          if (neighborSite) {
            const neighborCell = this.cellMap.get(neighborSite.id);
            if (!neighborCell || neighborCell.diskId === "river" || neighborCell.diskId !== cell.diskId) {
              isBorder = true;
            }
          } else { // Halfedge extends to boundary of diagram, so it's a border
            isBorder = true;
          }

          if (isBorder) {
            const diskId = cell.diskId;
            if (!borderSegmentsByDiskId.has(diskId)) {
              borderSegmentsByDiskId.set(diskId, []);
            }
            borderSegmentsByDiskId.get(diskId)!.push(halfedge);
          }
        }
      }
    });
    return borderSegmentsByDiskId;
  }

  private chainSegmentsIntoPaths(segments: VoiHalfedge[]): string[] {
    const svgPaths: string[] = [];
    const visitedSegments = new Set<VoiHalfedge>();
    const epsilon = 0.001;

    // Helper to check if two points are approximately equal
    const pointsAreEqual = (p1: { x: number; y: number }, p2: { x: number; y: number }) => {
      return Math.abs(p1.x - p2.x) < epsilon && Math.abs(p1.y - p2.y) < epsilon;
    };

    for (const startSegment of segments) {
      if (visitedSegments.has(startSegment)) {
        continue;
      }

      visitedSegments.add(startSegment);
      const pathVertices = [startSegment.getStartpoint(), startSegment.getEndpoint()];

      // Extend forward
      let currentHead = pathVertices[pathVertices.length - 1];
      let changed = true;
      while (changed) {
        changed = false;
        for (const segment of segments) {
          if (!visitedSegments.has(segment) && pointsAreEqual(segment.getStartpoint(), currentHead)) {
            visitedSegments.add(segment);
            currentHead = segment.getEndpoint();
            pathVertices.push(currentHead);
            changed = true;
            break; // Restart search for the new head
          }
        }
      }

      // Extend backward
      let currentTail = pathVertices[0];
      changed = true;
      while (changed) {
        changed = false;
        for (const segment of segments) {
          if (!visitedSegments.has(segment) && pointsAreEqual(segment.getEndpoint(), currentTail)) {
            visitedSegments.add(segment);
            currentTail = segment.getStartpoint();
            pathVertices.unshift(currentTail);
            changed = true;
            break; // Restart search for the new tail
          }
        }
      }

      // Build the SVG path string from the completed vertex chain
      if (pathVertices.length > 1) {
        let currentPath = `M ${pathVertices[0].x} ${pathVertices[0].y}`;
        for (let i = 1; i < pathVertices.length; i++) {
          currentPath += ` L ${pathVertices[i].x} ${pathVertices[i].y}`;
        }

        // Check if the path is closed and add the 'Z' if it is
        if (pointsAreEqual(pathVertices[0], pathVertices[pathVertices.length - 1])) {
          currentPath += " Z";
        }
        svgPaths.push(currentPath);
      }
    }
    return svgPaths;
  }

  public getDiskBorderHalfedgeCounts(): Map<string, number> {
    const borderHalfedgeCounts = new Map<string, number>();

    this.cellMap.forEach(cell => {
      if (cell.diskId && cell.diskId !== "river") {
        for (const halfedge of cell.halfedges) {
          const neighborSite = (halfedge.edge.lSite && halfedge.edge.lSite.id === cell.site.id)
            ? halfedge.edge.rSite
            : halfedge.edge.lSite;

          let isBorder = false;
          if (neighborSite) {
            const neighborCell = this.cellMap.get(neighborSite.id);
            if (!neighborCell || neighborCell.diskId === "river" || neighborCell.diskId !== cell.diskId) {
              isBorder = true;
            }
          } else { // Halfedge extends to boundary of diagram, so it's a border
            isBorder = true;
          }

          if (isBorder) {
            const diskId = cell.diskId;
            borderHalfedgeCounts.set(diskId, (borderHalfedgeCounts.get(diskId) || 0) + 1);
          }
        }
      }
    });

    return borderHalfedgeCounts;
  }
}
