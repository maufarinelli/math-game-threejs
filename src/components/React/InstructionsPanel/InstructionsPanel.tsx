import React, { useContext } from "react";
import "./instructions-panel.css";
import StoreContext from "../../../store/context";
import { observer } from "mobx-react";
import Overlay from "../Overlay/Overlay";
import StartingGamePanel from "./StartingGamePanel";
import GameDescriptionPanel from "./GameDescriptionPanel";

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

  const handleRetryLevelClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    gameStore.handleNextClick();
  };

  if (!gameStore.showForm) return null;

  return gameStore.startingNewGame ? (
    <StartingGamePanel handleStartClick={handleStartClick} />
  ) : (
    <div className="panel-wrapper">
      <form className="panel">
        {!gameStore.isGameCompleted && <GameDescriptionPanel />}

        {!gameStore.isGameCompleted &&
          !gameStore.isLevelCompleted &&
          !gameStore.isLevelNotCompletedSuccessfully && (
            <button onClick={handleNextClick}>Phase suivante >></button>
          )}
        {gameStore.isLevelCompleted &&
          !gameStore.isLevelNotCompletedSuccessfully && (
            <button onClick={handleNextClick}>Niveau suivant >></button>
          )}
        {gameStore.isLevelCompleted &&
          gameStore.isLevelNotCompletedSuccessfully && (
            <button onClick={handleRetryLevelClick}>
              Réessayer le même niveau >>
            </button>
          )}

        {gameStore.isGameCompleted && (
          <>
            <h3>FÉLICITATIONS! Vous avez retrouvé tout le trésor.</h3>
            <div className="winner-images">
              <img alt="treasure" className="treasure" src="./treasure.png" />
              <img
                alt="winner-fox"
                className="winner-fox"
                src="./winner-fox.png"
              />
            </div>
          </>
        )}
      </form>
      <form className="panel-restart">
        <button onClick={handleRestartClick}>Recommencer</button>
      </form>
      <Overlay />
    </div>
  );
});

export default InstructionsPanel;
