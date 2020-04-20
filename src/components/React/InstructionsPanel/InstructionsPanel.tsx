import React, { useContext } from "react";
import "./instructions-panel.css";
import StoreContext from "../../../store/context";
import { observer } from "mobx-react";
import StartingGamePanel from "./StartingGamePanel";
import GameDescriptionPanel from "./GameDescriptionPanel";
import WinnerPanel from "./WinnerPanel";
import ActionButtons from "./ActionButtons";

const InstructionsPanel: React.FC = observer(() => {
  const { gameStore } = useContext(StoreContext);

  const handleStartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    gameStore.handleStartClick();
  };

  const handleRestartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    gameStore.handleRestartClick();
  };

  const handleNextClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    gameStore.handleNextClick();
  };

  if (!gameStore.showForm) return null;

  return gameStore.startingNewGame ? (
    <StartingGamePanel handleStartClick={handleStartClick} />
  ) : (
    <>
      {!gameStore.isGameCompleted ? (
        <GameDescriptionPanel
          handleRestartClick={handleRestartClick}
          handleNextClick={handleNextClick}
        />
      ) : (
        <WinnerPanel handleRestartClick={handleRestartClick} />
      )}
    </>
  );
});

export default InstructionsPanel;
