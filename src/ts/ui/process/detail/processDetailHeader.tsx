import * as React from "react";
import { formatBinaryBytes } from "../../util/data";

interface ProcessDetailHeaderProps {
  processName: string;
  cpuUsage: number;
  memUsage: number;
}

const ProcessDetailHeader: React.FC<ProcessDetailHeaderProps> = ({ processName, cpuUsage, memUsage }) => {
  return (
    <div className="process-detail-header">
      <div className="process-detail-title">{processName}</div>
      <div className="process-detail-usage">
        <div className="process-usage-item">
          <span className="process-usage-label">CPU</span> {cpuUsage.toFixed(2)}%
        </div>
        <div className="process-usage-divider" />
        <div className="process-usage-item">
          <span className="process-usage-label">MEM</span> {formatBinaryBytes(memUsage)}
        </div>
      </div>
    </div>
  );
};

export default ProcessDetailHeader;
