import { PartitionInfo } from '../../../../data/disk';
import { ClusteredCell, IClusterAssigner } from './clusterAssigner';
import { VoiCell, VoiDiagram } from '../types';
import { DiskAnalyzer } from '../diskAnalyzer';

interface RunEvaluation {
  clusteredCells: ClusteredCell[];
  proportionalityError: number;
  blobbinessScore: number;
  actualCellCounts: Map<string, number>;
  targetCellCounts: Map<string, number>;
}

export class OptimizingAssigner implements IClusterAssigner {
  private wrappedAssigner: IClusterAssigner;
  private numRuns: number;

  constructor(wrappedAssigner: IClusterAssigner, numRuns: number = 3) {
    this.wrappedAssigner = wrappedAssigner;
    this.numRuns = numRuns;
  }

  assignCells(diagram: VoiDiagram, partitions: PartitionInfo[], numSites: number, width: number, height: number): ClusteredCell[] {
    const runResults: RunEvaluation[] = [];

    for (let i = 0; i < this.numRuns; i++) {
      const clusteredCells = this.wrappedAssigner.assignCells(diagram, partitions, numSites, width, height);
      const runEvaluation = this.evaluateRun(clusteredCells, partitions, numSites);
      runResults.push(runEvaluation);
      
    }

    // Sort run results based on proportionalityError then blobbinessScore
    runResults.sort((a, b) => {
      if (a.proportionalityError !== b.proportionalityError) {
        return a.proportionalityError - b.proportionalityError;
      }
      return a.blobbinessScore - b.blobbinessScore;
    });

    return runResults[0].clusteredCells;
  }

  private evaluateRun(clusteredCells: ClusteredCell[], partitions: PartitionInfo[], numSites: number): RunEvaluation {
    const totalCapacity = partitions.reduce((sum, p) => sum + (p.capacity || 0), 0);

    // Calculate targetCellCounts
    const targetCellCounts = new Map<string, number>();
    partitions.forEach(p => {
      const targetCount = Math.round((p.capacity || 0) / totalCapacity * numSites);
      targetCellCounts.set(p.label, targetCount);
    });

    // Calculate actualCellCounts
    const actualCellCounts = new Map<string, number>();
    clusteredCells.forEach(cell => {
      if (cell.diskId && cell.diskId !== "river") {
        actualCellCounts.set(cell.diskId, (actualCellCounts.get(cell.diskId) || 0) + 1);
      }
    });

    // Calculate proportionalityError (Sum of Squared Differences)
    let proportionalityError = 0;
    partitions.forEach(p => {
      const actualCount = actualCellCounts.get(p.label) || 0;
      const targetCount = targetCellCounts.get(p.label) || 0;
      const diff = actualCount - targetCount;
      proportionalityError += diff * diff;
    });

    // Calculate blobbinessScore (Compactness - Perimeter-to-Area Ratio)
    let blobbinessScore = 0;
    const diskAnalyzer = new DiskAnalyzer(clusteredCells);
    const borderHalfedgeCounts = diskAnalyzer.getDiskBorderHalfedgeCounts();

    partitions.forEach(p => {
      const perimeter = borderHalfedgeCounts.get(p.label) || 0;
      const area = actualCellCounts.get(p.label) || 0;

      if (area > 0) {
        const compactness = perimeter / Math.sqrt(area);
        blobbinessScore += compactness;
      } else {
        // Penalize empty disks heavily
        blobbinessScore += Infinity;
      }
    });

    return { clusteredCells, proportionalityError, blobbinessScore, actualCellCounts, targetCellCounts };
  }
}
