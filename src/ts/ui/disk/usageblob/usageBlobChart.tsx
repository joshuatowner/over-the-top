import * as React from "react";
import { ClusteredCell } from "../../util/voronoi/clustering/clusterAssigner";
import { VoiHalfedge } from "../../util/voronoi/types";
import { DEFAULT_FONT_FAMILY, FEATURE_BACKGROUND_COLOR } from "../../constants/styles";

interface BlobChartProps {
  clusteredCells: ClusteredCell[];
  calculatedCentroids: Map<string, { x: number; y: number }>;
  diskBorders: Map<string, string[]>;
  hoveredDiskId: string | null;
  onHover: (diskId: string | null) => void;
}

export default function BlobChart({ clusteredCells, calculatedCentroids, diskBorders, hoveredDiskId, onHover }: BlobChartProps): React.ReactNode {

  if (clusteredCells.length === 0) {
    return null; // Or a loading indicator
  }

  const borders: any[] = [];
  diskBorders.forEach((value, key) => {
    if (key === hoveredDiskId) return; // Don't render the base border if it's hovered
    borders.push(value!.map((pathData: string, index: number) => (
      <path
        key={`border-${key}-${index}`}
        d={pathData}
        fill="none"
        stroke="rgb(76.5, 76.5, 76.5)"
        strokeWidth="2"
        strokeOpacity="1"
        pointerEvents="none"
      />
    )))
  });

  return (
    <>
      <g onMouseLeave={() => onHover(null)}>
        {clusteredCells.map((cell: ClusteredCell, index: number) => {
          if (cell.halfedges.length === 0) return null;
          const pathData: string[] = [];
          let firstPoint = cell.halfedges[0].getStartpoint();
          pathData.push(`M${firstPoint.x},${firstPoint.y}`);

          cell.halfedges.forEach((halfedge: VoiHalfedge) => {
            const point = halfedge.getEndpoint();
            pathData.push(`L${point.x},${point.y}`);
          });
          pathData.push("Z");

          const fill = cell.diskId === "river" ? "none" : (cell.isUsed ? "white" : "rgb(50,50,50)");

          return (
            <path
              key={index}
              d={pathData.join("")}
              fill={fill}
              stroke="#242424"
              strokeWidth={2}
              onMouseEnter={() => {
                if (cell.diskId && cell.diskId !== "river") {
                  onHover(cell.diskId);
                }
              }}
            />
          );
        })}
      </g>
      {...borders}
      {hoveredDiskId && diskBorders.has(hoveredDiskId) && diskBorders.get(hoveredDiskId)!.map((pathData: string, index: number) => (
        <path
          key={`border-hover-${hoveredDiskId}-${index}`}
          d={pathData}
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeOpacity="1"
          pointerEvents="none"
        />
      ))}
      {hoveredDiskId && calculatedCentroids.has(hoveredDiskId) && (() => {
        const textX = calculatedCentroids.get(hoveredDiskId)!.x;
        const textY = calculatedCentroids.get(hoveredDiskId)!.y;
        const padding = 8;
        const fontSize = 16;
        const textLength = hoveredDiskId.length * (fontSize * 0.6);
        const rectWidth = textLength + 2 * padding;
        const rectHeight = fontSize + 2 * padding;
        const rectX = textX - rectWidth / 2;
        const rectY = textY - rectHeight / 2;

        return (
          <g pointerEvents="none">
            <rect
              x={rectX}
              y={rectY}
              width={rectWidth}
              height={rectHeight}
              fill={FEATURE_BACKGROUND_COLOR.toString()}
            />
            <text
              x={textX}
              y={textY}
              fill="white"
              fontSize={`${fontSize}px`}
              fontFamily={DEFAULT_FONT_FAMILY}
              fontWeight="bold"
              textAnchor="middle"
              dominantBaseline="central"
            >
              {hoveredDiskId}
            </text>
          </g>
        );
      })()}
    </>
  );
}
