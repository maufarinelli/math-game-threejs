import React, { useContext } from "react";
import StoreContext from "../../../store/context";

interface IActionButtonsProps {
  handleNextClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ActionButtons: React.FC<IActionButtonsProps> = ({ handleNextClick }) => {
  const { gameStore } = useContext(StoreContext);

  const getLabel = () => {
    if (gameStore.isLevelCompleted) {
      if (gameStore.isLevelNotCompletedSuccessfully) {
        return "Réessayer le même niveau >>";
      }
      return "Niveau suivant >>";
    } else {
      if (!gameStore.isGameCompleted) {
        return "Phase suivante >>";
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
