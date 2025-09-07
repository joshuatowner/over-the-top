import * as React from "react";
import { ProcessDetailInfo } from "../../../data/process";
import { formatBinaryBytes } from "../../util/data";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/styles/overlayscrollbars.css";

interface ProcessPidsTableProps {
  processes: ProcessDetailInfo[];
  selectedPid: number | null;
  onPidSelect: (pid: number) => void;
}

const ProcessPidsTable: React.FC<ProcessPidsTableProps> = ({ processes, selectedPid, onPidSelect }) => {
  return (
    <div className="process-pids-container">
      <table className="process-pids-table process-pids-table-header">
        <thead>
          <tr>
            <th>PID</th>
            <th>CPU</th>
            <th>MEM</th>
            <th>CMD</th>
          </tr>
        </thead>
      </table>
      <OverlayScrollbarsComponent
        className="process-pids-table-body-container os-theme-light"
        options={{ scrollbars: { theme: 'os-theme-light' } }}
      >
        <table className="process-pids-table">
          <tbody>
            {processes.map(p => (
              <tr
                key={p.pid}
                onClick={() => onPidSelect(p.pid)}
                className={selectedPid === p.pid ? 'selected-row' : ''}
              >
                <td>{p.pid}</td>
                <td>{p.cpu.toFixed(2)}%</td>
                <td>{formatBinaryBytes(p.mem)}</td>
                <td className="command-cell">{p.command}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </OverlayScrollbarsComponent>
    </div>
  );
};

export default ProcessPidsTable;
