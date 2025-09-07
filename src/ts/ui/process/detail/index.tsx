import * as React from "react";
import "../../../../scss/process-detail.scss";
import { ProcessUsageInfo, ProcessDetailInfo } from "../../../data/process";
import { IpcBackend } from "../../serverBackend";
import { processDetailInfo } from "../../observer/process";
import { formatBinaryBytes } from "../../util/data";
import IntervalObservable from "../../../data/observable/intervalObservable";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/styles/overlayscrollbars.css";
import { KillProcessInput, KillProcessOutput } from '../../../data/process'; // New import

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

  handleStop = async (force: boolean) => {
    const { selectedPid, process, processName } = this.state;
    if (!process) return;

    const pidsToKill = selectedPid ? [selectedPid] : process.processes.map(p => p.pid);
    const target = selectedPid ? `PID ${selectedPid}` : `all ${processName} processes`;

    let message: string;
    let action: string;

    if (force) {
      action = 'Force stop';
      message = `WARNING: Force stopping a process will terminate it immediately. Unsaved data will be lost. This action cannot be undone.\n\nAre you sure you want to force stop ${target}?`;
    } else {
      action = 'Stop';
      message = `This will attempt to gracefully stop ${target}. The process may take a moment to shut down.\n\nAre you sure you want to continue?`;
    }

    const confirmed = confirm(message);

    if (confirmed) {
      console.log(`${action} ${target}`);
      for (const pid of pidsToKill) {
        try {
          const input: KillProcessInput = { pid, force };
          const result: KillProcessOutput = await this.backend.killProcess(input);
          if (!result.success) {
            console.error(`Failed to ${action.toLowerCase()} PID ${pid}: ${result.error}`);
            alert(`Failed to ${action.toLowerCase()} PID ${pid}: ${result.error}`);
          }
        } catch (error) {
          console.error(`Error killing PID ${pid}:`, error);
          alert(`An error occurred while trying to kill PID ${pid}.`);
        }
      }
    }
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
        {isLoading ? (
          <div className="loading-indicator">Loading process data...</div>
        ) : (
          <>
            <div className="process-detail-header">
              <div className="process-detail-title">{processName}</div>
              <div className="process-detail-usage">
                <div className="process-usage-item">
                  <span className="process-usage-label">CPU</span> {process?.cpu.toFixed(2)}%
                </div>
                <div className="process-usage-divider" />
                <div className="process-usage-item">
                  <span className="process-usage-label">MEM</span> {formatBinaryBytes(process?.mem || 0)}
                </div>
              </div>
            </div>

            {/* Individual PIDs Table */}
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
              </OverlayScrollbarsComponent>
            </div>

            {/* Stop and Force Stop Buttons */}
            <div className="process-action-buttons">
              <button className="stop-button" onClick={() => this.handleStop(false)}>
                STOP {selectedPid ? `PID ${selectedPid}` : 'ALL'}
              </button>
              <button className="force-stop-button" onClick={() => this.handleStop(true)}>
                FORCE STOP {selectedPid ? `PID ${selectedPid}` : 'ALL'}
              </button>
            </div>
          </>
        )}
      </div>
    );
  }
}
