import * as React from "react";
import "../../../../scss/process-detail.scss";
import { ProcessUsageInfo, ProcessDetailInfo } from "../../../data/process";
import { IpcBackend } from "../../serverBackend";
import { processDetailInfo } from "../../observer/process";
import { formatBinaryBytes } from "../../util/data";
import IntervalObservable from "../../../data/observable/intervalObservable";

interface ProcessDetailState {
  processName: string;
  process?: ProcessUsageInfo;
  isLoading: boolean;
  selectedPid: number | null; // New state for selected PID
}

export class ProcessDetail extends React.Component<{}, ProcessDetailState> {
  private backend: IpcBackend;
  private processDetailObservable: IntervalObservable<ProcessUsageInfo[]>;

  constructor(props: {}) {
    super(props);
    this.backend = new IpcBackend();
    const processName = this.getProcessNameFromHash();
    this.state = {
      processName: processName,
      process: undefined,
      isLoading: true,
      selectedPid: null, // Initialize selected PID
    };
    this.processDetailObservable = processDetailInfo(this.backend);
  }

  getProcessNameFromHash = () => {
    return decodeURIComponent(window.location.hash.substring(1));
  };

  handlePidSelect = (pid: number) => {
    this.setState(prevState => ({
      selectedPid: prevState.selectedPid === pid ? null : pid // Toggle selection
    }));
  };

  updateProcessData = (allProcesses: ProcessUsageInfo[]) => {
    const targetProcess = allProcesses.find(
      (p) => p.name === this.state.processName
    );

    if (targetProcess) {
      this.setState({
        process: targetProcess,
        isLoading: false,
      });
    } else {
      throw new Error("Unable to find target process");
    }
  };

  componentDidMount() {
    this.processDetailObservable.watch(this.updateProcessData);
    this.processDetailObservable.update();
  }

  componentWillUnmount() {
    this.processDetailObservable.remove(this.updateProcessData);
  }

  render() {
    const { processName, isLoading, selectedPid, process } = this.state;

    return (
      <div className="process-detail-container">
        <div className="process-detail-header">
          {processName}
        </div>

        {isLoading ? (
          <div className="loading-indicator">Loading process data...</div>
        ) : (
          <>
            {/* Overall CPU and Memory Usage */}
            <div className="process-overall-usage">
              <div className="process-overall-usage-item">
                CPU: <span className="process-overall-usage-value">{process?.cpu.toFixed(2)}%</span>
              </div>
              <div className="process-overall-usage-item">
                MEM: {formatBinaryBytes(process?.mem || 0)}
              </div>
            </div>

            {/* Individual PIDs Table */}
            <h3>Individual PIDs ({process?.processes.length}):</h3>
            <table className="process-pids-table">
              <thead>
                <tr>
                  <th>PID</th>
                  <th>CPU</th>
                  <th>MEM</th>
                  <th>Command</th>
                </tr>
              </thead>
              <tbody>
                {process?.processes.map(p => (
                  <tr
                    key={p.pid}
                    onClick={() => this.handlePidSelect(p.pid)}
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

            {/* Stop and Force Stop Buttons */}
            <div className="process-action-buttons">
              <button className="stop-button">
                Stop {selectedPid ? `PID ${selectedPid}` : 'All'}
              </button>
              <button className="force-stop-button">
                Force Stop {selectedPid ? `PID ${selectedPid}` : 'All'}
              </button>
            </div>
          </>
        )}
      </div>
    );
  }
}