import React from "react";
import { FormattedMessage } from "react-intl";

interface IWinnerPanelProps {
  handleRestartClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const WinnerPanel: React.FC<IWinnerPanelProps> = ({ handleRestartClick }) => (
  <div className="panel-wrapper">
    <div className="panel">
      <h3>
        <FormattedMessage
          id="WINNER_TITLE"
          defaultMessage="FÉLICITATIONS! Vous avez retrouvé tout le trésor."
        />
      </h3>
      <div className="winner-images">
        <img alt="treasure" className="treasure" src="./treasure.png" />
        <img alt="winner-fox" className="winner-fox" src="./winner-fox.png" />
      </div>
    </div>
    <div className="panel-restart">
      <button onClick={handleRestartClick}>
        <FormattedMessage
          id="ACTION_BUTTON_RESTART"
          defaultMessage="Recommencer"
        />
      </button>
    </div>
    <div className="overlay"></div>
  </div>
);

export default WinnerPanel;
