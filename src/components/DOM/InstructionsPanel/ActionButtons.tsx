import React, { useContext } from "react";
import StoreContext from "../../../store/context";
import { FormattedMessage } from "react-intl";

interface IActionButtonsProps {
  handleNextClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ActionButtons: React.FC<IActionButtonsProps> = ({ handleNextClick }) => {
  const { gameStore } = useContext(StoreContext);

  const getLabel = () => {
    if (gameStore.isLevelCompleted) {
      if (gameStore.isLevelNotCompletedSuccessfully) {
        return (
          <FormattedMessage
            id="ACTION_BUTTON_RETRY_SAME_LEVEL"
            defaultMessage="Réessayer le même niveau >>"
          />
        );
      }
      return (
        <FormattedMessage
          id="ACTION_BUTTON_NEXT_LEVEL"
          defaultMessage="Niveau suivant >>"
        />
      );
    } else {
      if (!gameStore.isGameCompleted) {
        return (
          <FormattedMessage
            id="ACTION_BUTTON_NEXT_PHASE"
            defaultMessage="Phase suivante >>"
          />
        );
      }
    }
  };

  return (
    <button className="panel-action-button" onClick={handleNextClick}>
      {getLabel()}
    </button>
  );
};

export default ActionButtons;
