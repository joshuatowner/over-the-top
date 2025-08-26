import * as React from "react";
import { PartitionInfo } from "../../data/disk";
import { filterOuterCells, generateVoronoiDiagram } from "../util/voronoi/diagramGenerator";
import { ErodingRiverAssigner } from "../util/voronoi/clustering/erodingRiverAssigner";
import { EdgeProportionalAssigner } from "../util/voronoi/clustering/edgeProportionalAssigner";
import { OptimizingAssigner } from "../util/voronoi/clustering/optimizingAssigner";
import { shuffleArray } from "../util/list";
import { DiskAnalyzer } from "../util/voronoi/diskAnalyzer";
import BlobChart from "./usageblob/usageBlobChart";
import { DiskList } from "./list";
import { Size, Vec2 } from "../../util/vec2";
import {partitionInfo} from "../../backend/disk";

interface DiskDisplayProps {
  pixelSize: Size;
  topLeft: Vec2;
  size: Size;
  windowSize: Size;
}

const sortDisks = (disk1: PartitionInfo, disk2: PartitionInfo) => { // Copied from DiskRows.tsx
  const capacityCompare = (disk2.capacity || 0) - (disk1.capacity || 0);
  if (capacityCompare !== 0) {
    return capacityCompare;
  } else {
    return (disk2.usage || 0) - (disk1.usage || 0);
  }
}

export default function DiskDisplay({ pixelSize, topLeft, size, windowSize }: DiskDisplayProps) {
  const [hoveredDiskId, setHoveredDiskId] = React.useState<string | null>(null);
  const [partitions, setPartitions] = React.useState<PartitionInfo[]>([]);

  React.useEffect(() => {
    async function loadPartitions() {
      let fetchedPartitions = await partitionInfo();
      fetchedPartitions = fetchedPartitions
        .filter(partition => partition.fsType || partition.usage)
        .sort(sortDisks);

      // Filter out volumes that would have < 5 segments (based on proportional sites)
      const totalCapacity = fetchedPartitions.reduce((sum, p) => sum + (p.capacity || 0), 0);
      const numSites = 1000; // Same as used in useMemo

      const filteredBySegments = fetchedPartitions.filter(partition => {
        if (totalCapacity === 0) return false; // Avoid division by zero
        const proportionalSites = (partition.capacity || 0) / totalCapacity * numSites;
        return proportionalSites >= 5;
      });

      setPartitions(filteredBySegments);
    }
    loadPartitions();
  }, []); // Empty dependency array means this runs once on mount

  const chartWidth = Math.min(pixelSize.height, 400);
  const listWidth = pixelSize.width - chartWidth;
  const internalResolution = 400; // Fixed internal resolution for the SVG

  const { clusteredCells, calculatedCentroids, diskBorders } = React.useMemo(() => {
    if (partitions.length === 0) {
      return { clusteredCells: [], calculatedCentroids: new Map(), diskBorders: new Map() };
    }

    const numSites = 1000;
    const numBoundarySites = 16;
    const relaxationIterations = 5;

    const diagram = generateVoronoiDiagram({
      numSites, width: internalResolution, height: internalResolution, relaxationIterations, centerX: internalResolution / 2, centerY: internalResolution / 2,
      radius: (internalResolution / 2) * 1.2, numBoundarySites,
    });

    const filteredDiagram = filterOuterCells(diagram, internalResolution / 2, internalResolution / 2, (internalResolution / 2) * 0.9, 0.9);

    const assigner = new OptimizingAssigner(new ErodingRiverAssigner(new EdgeProportionalAssigner()));
    const clusteredCells = assigner.assignCells(filteredDiagram, partitions, filteredDiagram.cells.length, internalResolution, internalResolution);

    const cellsByDiskId = new Map<string, any[]>();
    clusteredCells.forEach(cell => {
      if (cell.diskId && cell.diskId !== "river") {
        if (!cellsByDiskId.has(cell.diskId)) {
          cellsByDiskId.set(cell.diskId, []);
        }
        cellsByDiskId.get(cell.diskId)!.push(cell);
      }
    });
    cellsByDiskId.forEach((value, key) => {
      shuffleArray(value);
      const percentUsed = partitions.find(partition => partition.label === key)?.usagePercent || 0;
      const activeCells = Math.floor(value.length * percentUsed / 100.0);
      for (let i = 0; i < activeCells; i++) {
        value[i].isUsed = true;
      }
    });

    const diskAnalyzer = new DiskAnalyzer(clusteredCells);
    const calculatedCentroids = diskAnalyzer.getComponentCentroids();
    const diskBorders = diskAnalyzer.getDiskBorders();

    return { clusteredCells, calculatedCentroids, diskBorders };
  }, [partitions]); // The calculation now only depends on partitions, not on size

  const onHover = (diskId: string | null) => {
    setHoveredDiskId(diskId);
  };

  return (
    <div className={"usage-blobs-container"} style={{ width: '100%', height: '100%', display: 'flex' }}>
      {chartWidth >= 400 && (
        <div className={"usage-blobs-chart chart-container"} style={{ width: chartWidth, height: '100%', marginRight: '20px' }}>
          <svg width="100%" height="100%" viewBox={`0 0 ${internalResolution} ${internalResolution}`} preserveAspectRatio="xMidYMid meet">
            <BlobChart
              clusteredCells={clusteredCells}
              calculatedCentroids={calculatedCentroids}
              diskBorders={diskBorders}
              hoveredDiskId={hoveredDiskId}
              onHover={onHover}
            />
          </svg>
        </div>
      )}
      {chartWidth >= 400 && <div className={"vertical-divider"} style={{ height: '100%', width: '1px', backgroundColor: '#444' }}></div>}
      <div className={"disk-list-wrapper"} style={{ width: (chartWidth >= 400 ? listWidth : pixelSize.width), height: '100%', marginLeft: '20px' }}>
        <DiskList partitions={partitions} hoveredDiskId={hoveredDiskId} onHover={onHover} />
      </div>
    </div>
  );
}
