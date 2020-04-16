import React, { useContext } from "react";
import "./form.css";
import StoreContext from "../../../store/context";
import { observer } from "mobx-react";
import Overlay from "../Overlay/Overlay";

const Form: React.FC = observer(() => {
  const { gameStore, challengeStore } = useContext(StoreContext);

  const getAnswerStatus = () => {
    if (challengeStore.isPristine) return;

    if (challengeStore.isRightAnswer) {
      return "Ta reponse est CORRECT!";
    }
    return 'Ta reponse n\'est pas correct!';
  };

  const getGameDescription = () => {
    let howMany = 13;

    if (gameStore.level === 1) howMany = 7;
    if (gameStore.level === 2) howMany = 10;

    return (
      <>
        <p>{getAnswerStatus()}</p>
        <br />
        <h3>Niveau {gameStore.level}. </h3>
        <p className="story">
          Vous devez avoir au moins {howMany} points pour passer au prochain
          niveau. <b>Vous avez {gameStore.score}!</b>
        </p>
        <p className="story">Chaque tresor trouvé vaut 3 points.</p>
        <p className="story last">
          ATTENTION! Si vous tombez sur en trou ou une araignée, vous perdrez 1
          point.
        </p>
      </>
    );
  };

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
    <div className="form-wrapper">
      <img alt="pirate" className="pirate-img" src="./pirate-math.png" />
      <form className="form">
        <h1>Le Pirate Mathématicien</h1>
        <p className="story">
          Un pirate avait caché tous les monnais de son trésor sur des îles
          differentes. Fox a trouvé des cartes avec des indications
          mystérieuses, telles que l'addition et la soustraction de nombres.
        </p>
        <p className="story">
          Aidez Fox à résoudre ces mystères et à trouver tout ce trésor caché.
        </p>
        <hr />
        <h3>Comment jouer: </h3>
        <ul>
          <li>
            Vous devez <b>Cliquer</b> sur <b>chaque carré</b> adjacent à sa
            position, pour que le personnage se déplace.
          </li>
          <li>
            Dès que vous atteignez <b>le carré où ce trouve le résultat</b> de
            votre calcul <b>double-cliquez</b> (
            <i>ou touchez longtemps pour ceux qui jouent sur une tablette</i>)
            pour creuser et trouver la pièce cachée.
          </li>
        </ul>
      </form>
      <Overlay />
      <form className="form-restart">
        <button onClick={handleStartClick}>Commencer >></button>
      </form>
    </div>
  ) : (
    <div className="form-wrapper">
      <form className="form">
        {!gameStore.isGameCompleted && getGameDescription()}
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
            <h3>FÉLICITATION! Vous avez rencontré tous les trésors.</h3>
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
      <form className="form-restart">
        <button onClick={handleRestartClick}>Restart Game</button>
      </form>
      <Overlay />
    </div>
  );
});

export default Form;
