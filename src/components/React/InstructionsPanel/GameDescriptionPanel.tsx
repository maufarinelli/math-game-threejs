import React, { useContext } from "react";
import StoreContext from "../../../store/context";

const GameDescriptionPanel = () => {
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

  return (
    <div>
      <p>{getAnswerStatus()}</p>
      <br />
      <h3>Niveau {gameStore.level}.</h3>
      <p className="story">
        Vous devez avoir au moins {getHowMany()} points pour passer au prochain
        niveau. <b>Vous avez {gameStore.score}!</b>
      </p>
      <p className="story">Chaque trésor trouvé vaut 3 points.</p>
      <p className="story last">
        ATTENTION! Si vous tombez sur un trou ou une araignée, vous perdrez 1
        point.
      </p>
    </div>
  );
};

export default GameDescriptionPanel;
