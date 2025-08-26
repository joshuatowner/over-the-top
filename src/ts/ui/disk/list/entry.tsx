import * as React from "react";
import { PartitionInfo } from "../../../data/disk";

interface DiskListEntryProps {
  partition: PartitionInfo;
  isHovered: boolean;
  onHover: (diskId: string | null) => void;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export class DiskListEntry extends React.Component<DiskListEntryProps> {
  render() {
    const { partition, isHovered, onHover } = this.props;
    const usagePercent = partition.usagePercent || 0;

    return (
      <div
        className={`disk-entry ${isHovered ? 'disk-entry-hovered' : ''}`}
        onMouseEnter={() => onHover(partition.label)}
        onMouseLeave={() => onHover(null)}
      >
        <div className={"disk-name"}>{partition.label}</div>
        <div className={"disk-value disk-value-right-aligned"}>
          {usagePercent.toFixed(1)}%
        </div>
        <div className={"disk-value disk-value-right-aligned"}>{formatBytes(partition.capacity || 0)}</div>
        <div className={"disk-value disk-value-right-aligned"}>{partition.fsType}</div>
      </div>
    );
  }
}
