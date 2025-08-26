import { ClusteredCell, IClusterAssigner } from "./clusterAssigner";
import { PartitionInfo } from "../../../../data/disk";
import { VoiDiagram } from "../types";

/**
 * An assigner that wraps another assigner and then creates rivers by "eroding" the borders between countries.
 * It converts cells on both sides of a border into river cells, creating a 2-cell wide river.
 * This method affects proportionality, as it takes cells away from the partitions.
 */
export class ErodingRiverAssigner implements IClusterAssigner {
  private wrappedAssigner: IClusterAssigner;

  constructor(wrappedAssigner: IClusterAssigner) {
    this.wrappedAssigner = wrappedAssigner;
  }

  assignCells(diagram: VoiDiagram, partitions: PartitionInfo[], numSites: number, width: number, height: number): ClusteredCell[] {
    // Get the initial clustering from the wrapped assigner.
    const clusteredCells = this.wrappedAssigner.assignCells(diagram, partitions, numSites, width, height);

    const cellMap = new Map<number, ClusteredCell>();
    clusteredCells.forEach(cell => {
      cellMap.set(cell.site.id, cell);
    });

    const cellsToErode = new Set<ClusteredCell>();

    // Find all cells that are on a border between two different countries.
    clusteredCells.forEach(cell => {
      if (cell.diskId === "river") {
        return; // Skip already-river cells
      }

      for (const halfedge of cell.halfedges) {
        const neighborSite = (halfedge.edge.lSite && halfedge.edge.lSite.id === cell.site.id)
          ? halfedge.edge.rSite
          : halfedge.edge.lSite;

        if (neighborSite) {
          const neighborCell = cellMap.get(neighborSite.id);
          // Check if the neighbor exists and belongs to a different country.
          if (neighborCell && neighborCell.diskId !== "river" && neighborCell.diskId !== cell.diskId) {
            // This is a border. Mark both this cell and its neighbor for erosion.
            cellsToErode.add(cell);
            cellsToErode.add(neighborCell);
          }
        }
      }
    });

    // Convert all the marked border cells to river cells.
    cellsToErode.forEach(cell => {
      cell.diskId = "river";
    });

    // Find and mark unconnected components as river, per disk
    const diskIds = new Set<string>();
    clusteredCells.forEach(cell => {
      if (cell.diskId !== "river" && cell.diskId !== undefined) {
        diskIds.add(cell.diskId);
      }
    });

    diskIds.forEach(diskId => {
      const componentVisited = new Set<number>();
      let largestComponent: ClusteredCell[] = [];

      clusteredCells.forEach(cell => {
        if (cell.diskId === diskId && !componentVisited.has(cell.site.id)) {
          const currentComponent: ClusteredCell[] = [];
          const stack: ClusteredCell[] = [cell];
          componentVisited.add(cell.site.id);

          while (stack.length > 0) {
            const current = stack.pop()!;
            currentComponent.push(current);

            for (const halfedge of current.halfedges) {
              const neighborSite = (halfedge.edge.lSite && halfedge.edge.lSite.id === current.site.id)
                ? halfedge.edge.rSite
                : halfedge.edge.lSite;

              if (neighborSite) {
                const neighborCell = cellMap.get(neighborSite.id);
                // Only consider neighbors of the same diskId for connectivity
                if (neighborCell && neighborCell.diskId === diskId && !componentVisited.has(neighborCell.site.id)) {
                  componentVisited.add(neighborCell.site.id);
                  stack.push(neighborCell);
                }
              }
            }
          }

          if (currentComponent.length > largestComponent.length) {
            largestComponent = currentComponent;
          }
        }
      });

      // Mark cells of this diskId not in its largest component as river
      clusteredCells.forEach(cell => {
        if (cell.diskId === diskId && !largestComponent.includes(cell)) {
          cell.diskId = "river";
        }
      });
    });

    return clusteredCells;
  }
}
