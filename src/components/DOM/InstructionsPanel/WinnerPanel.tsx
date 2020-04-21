import React from "react";

interface IWinnerPanelProps {
  handleRestartClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const WinnerPanel: React.FC<IWinnerPanelProps> = ({ handleRestartClick }) => (
  <div className="panel-wrapper">
    <div className="panel">
      <h3>FÉLICITATIONS! Vous avez retrouvé tout le trésor.</h3>
      <div className="winner-images">
        <img alt="treasure" className="treasure" src="./treasure.png" />
        <img alt="winner-fox" className="winner-fox" src="./winner-fox.png" />
      </div>
    </div>
    <div className="panel-restart">
      <button onClick={handleRestartClick}>Recommencer</button>
    </div>
    <div className="overlay"></div>
  </div>
);

export default WinnerPanel;
