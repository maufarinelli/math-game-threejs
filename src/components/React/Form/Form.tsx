import React, { useContext } from "react";
import "./form.css";
import StoreContext from "../../../store/context";
import { observer } from "mobx-react";
import Overlay from "../Overlay/Overlay";

const Form: React.FC = observer(() => {
  const { gameStore } = useContext(StoreContext);

  const getGameDescription = () => {
    let howMany = 5;

    if (gameStore.level === 1) howMany = 3;
    if (gameStore.level === 2) howMany = 5;

    return `Niveau ${gameStore.level}. Vous devez avoir au moins ${howMany} points pour passer au prochain niveau`;
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

  return (
    <div className="form-wrapper">
      <form className="form">
        <p>{getGameDescription()}</p>
        {!gameStore.isLevelCompleted &&
          !gameStore.isLevelNotCompletedSuccessfully && (
            <button onClick={handleNextClick}>Next Phase >></button>
          )}
        {gameStore.isLevelCompleted &&
          !gameStore.isLevelNotCompletedSuccessfully && (
            <button onClick={handleNextClick}>Next Level >></button>
          )}
        {gameStore.isLevelCompleted &&
          gameStore.isLevelNotCompletedSuccessfully && (
            <button onClick={handleRetryLevelClick}>Retry Same Level >></button>
          )}

        {gameStore.isGameCompleted && (
          <h2>FÉLICITATION! VOUS AVEZ RENCONTRÉ TOUS LES TRÉSORS.</h2>
        )}
      </form>
      <form className="form-restart">
        <button onClick={handleRestartClick}>Restart Game</button>
      </form>
      <Overlay />
    </div>
  );
});

export default Form;
