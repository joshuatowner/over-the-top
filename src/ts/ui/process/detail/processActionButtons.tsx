import * as React from "react";

interface ProcessActionButtonsProps {
  selectedPid: number | null;
  onStop: (force: boolean) => void;
}

const ProcessActionButtons: React.FC<ProcessActionButtonsProps> = ({ selectedPid, onStop }) => {
  return (
    <div className="process-action-buttons">
      <button className="stop-button" onClick={() => onStop(false)}>
        STOP {selectedPid ? `PID ${selectedPid}` : 'ALL'}
      </button>
      <button className="force-stop-button" onClick={() => onStop(true)}>
        FORCE STOP {selectedPid ? `PID ${selectedPid}` : 'ALL'}
      </button>
    </div>
  );
};

export default ProcessActionButtons;
