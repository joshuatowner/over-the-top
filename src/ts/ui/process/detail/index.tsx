import * as React from "react";
import "../../../../scss/process-detail.scss";
import { ProcessUsageInfo, KillProcessInput, KillProcessOutput } from "../../../data/process"; // Updated import
import { IpcBackend } from "../../serverBackend";
import { processDetailInfo } from "../../observer/process";
import IntervalObservable from "../../../data/observable/intervalObservable";

import ProcessDetailHeader from "./processDetailHeader";
import ProcessPidsTable from "./processPidsTable";
import ProcessActionButtons from "./processActionButtons";

interface ProcessDetailState {
  processName: string;
  process?: ProcessUsageInfo;
  isLoading: boolean;
  selectedPid: number | null;
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
      selectedPid: null,
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
      this.processDetailObservable.update();
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
      this.setState({
        process: {
          name: this.state.processName,
          cpu: 0,
          mem: 0,
          processes: [],
        },
        isLoading: false,
      });
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
            <ProcessDetailHeader
              processName={processName}
              cpuUsage={process?.cpu || 0}
              memUsage={process?.mem || 0}
            />

            <ProcessPidsTable
              processes={process?.processes || []}
              selectedPid={selectedPid}
              onPidSelect={this.handlePidSelect}
            />

            <ProcessActionButtons
              selectedPid={selectedPid}
              onStop={this.handleStop}
            />
          </>
        )}
      </div>
    );
  }
}