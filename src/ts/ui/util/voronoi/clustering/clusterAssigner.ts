import {VoiCell, VoiDiagram} from "../types";
import {PartitionInfo} from "../../../../data/disk";

export interface ClusteredCell extends VoiCell {
  diskId: string;
  isUsed: boolean;
}

export interface IClusterAssigner {
  assignCells(diagram: VoiDiagram, partitions: PartitionInfo[], numSites: number, width: number, height: number): ClusteredCell[];
}
