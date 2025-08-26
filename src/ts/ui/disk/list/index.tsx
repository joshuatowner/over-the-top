import * as React from "react";
import { PartitionInfo } from "../../../data/disk";
import { DiskListEntry } from "./entry";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

interface DiskListProps {
  partitions: PartitionInfo[];
  hoveredDiskId: string | null;
  onHover: (diskId: string | null) => void;
}

export class DiskList extends React.Component<DiskListProps> {
  render() {
    return (
      <div className={"disk-list-container disk-table-container"}>
        <div className={"disk-legend"}>
          <div className={"disk-name"}>DISK</div>
          <div className={"disk-value disk-value-right-aligned"}>USAGE</div>
          <div className={"disk-value disk-value-right-aligned"}>CAPACITY</div>
          <div className={"disk-value disk-value-right-aligned"}>TYPE</div>
        </div>
        <OverlayScrollbarsComponent
          className={"process-list-container"}
          options={{
            scrollbars: {
              autoHide: 'leave',
              theme: 'os-theme-light',
            }
          }}
          defer
        >
          {this.props.partitions.map(partition =>
            <DiskListEntry
              key={partition.label}
              partition={partition}
              isHovered={this.props.hoveredDiskId === partition.label}
              onHover={this.props.onHover}
            />
          )}
        </OverlayScrollbarsComponent>
      </div>
    );
  }
}
