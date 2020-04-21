import React, { useContext } from "react";
import StoreContext from "../../../store/context";
import ActionButtons from "./ActionButtons";

interface IGameDescriptionPanelProps {
  handleRestartClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleNextClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const GameDescriptionPanel: React.FC<IGameDescriptionPanelProps> = ({
  handleRestartClick,
  handleNextClick,
}) => {
  const { gameStore, challengeStore } = useContext(StoreContext);

  const getHowMany = () => {
    if (gameStore.level === 1) return 7;
    if (gameStore.level === 2) return 10;
    return 13;
  };

  const getAnswerStatus = () => {
    if (challengeStore.isPristine) return;

    if (challengeStore.isRightAnswer) {
      return "Ta réponse est BONNE!";
    }
    return "Ta réponse est incorrecte.";
  };

  const getLevelCompletedMessage = () => {
    if (gameStore.isLevelCompleted) {
      if (gameStore.isLevelNotCompletedSuccessfully) {
        return (
          <p>
            Malheureusement vous n'avez pas atteint le nombre de points
            nécessaires pour passer au niveau suivant.
          </p>
        );
      } else {
        return (
          <p>
            Félicitations, vous avez atteint le nombre de points nécessaires
            pour passer au niveau suivant.
          </p>
        );
      }
    }
  };

  return (
    <div className="panel-wrapper">
      <div className="panel">
        <p>{getAnswerStatus()}</p>
        {getLevelCompletedMessage()}
        <ActionButtons handleNextClick={handleNextClick} />
        <h3 className="story-title">Niveau {gameStore.level}.</h3>
        <p className="story">
          Vous devez avoir au moins {getHowMany()} points pour passer au
          prochain niveau. <b>Vous avez {gameStore.score}!</b>
        </p>
        <p className="story">Chaque trésor trouvé vaut 3 points.</p>
        <p className="story last">
          ATTENTION! Si vous tombez sur un trou ou une araignée, vous perdrez 1
          point.
        </p>
      </div>
      <div className="panel-restart">
        <button onClick={handleRestartClick}>Recommencer</button>
      </div>
      <div className="overlay"></div>
    </div>
  );
};

export default GameDescriptionPanel;
