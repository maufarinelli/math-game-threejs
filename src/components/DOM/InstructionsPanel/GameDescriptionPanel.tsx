import React, { useContext } from "react";
import StoreContext from "../../../store/context";
import ActionButtons from "./ActionButtons";
import { FormattedMessage } from "react-intl";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

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
      return (
        <FormattedMessage
          id="RIGHT_ANSWER"
          defaultMessage="Ta réponse est BONNE!"
        />
      );
    }
    return (
      <FormattedMessage
        id="WRONG_ANSWER"
        defaultMessage="Ta réponse est incorrecte."
      />
    );
  };

  const getLevelCompletedMessage = () => {
    if (gameStore.isLevelCompleted) {
      if (gameStore.isLevelNotCompletedSuccessfully) {
        return (
          <p>
            <FormattedMessage
              id="NOT_ENOUGHT_POINTS_TEXT"
              defaultMessage="Malheureusement vous n'avez pas atteint le nombre de points nécessaires pour passer au niveau suivant."
            />
          </p>
        );
      } else {
        return (
          <p>
            <FormattedMessage
              id="ENOUGHT_POINTS_TEXT"
              defaultMessage="Félicitations, vous avez atteint le nombre de points nécessaires pour passer au niveau suivant."
            />
          </p>
        );
      }
    }
  };

  return (
    <div className="panel-wrapper">
      <LanguageSwitcher />
      <div className="panel">
        <p>{getAnswerStatus()}</p>
        {getLevelCompletedMessage()}
        <ActionButtons handleNextClick={handleNextClick} />
        <h3 className="story-title">
          <FormattedMessage
            id="DESCRIPTION_LEVEL_TITLE"
            defaultMessage="Niveau "
          />
          {gameStore.level}.
        </h3>
        <p className="story">
          <FormattedMessage
            id="DESCRIPTION_LEVEL_TEXT_1"
            defaultMessage="Vous devez avoir au moins {howMany} points pour passer au prochain niveau. "
            values={{
              howMany: getHowMany(),
            }}
          />
          <b>
            <FormattedMessage
              id="DESCRIPTION_LEVEL_TEXT_2"
              defaultMessage="Vous avez "
            />
            {gameStore.score}!
          </b>
        </p>
        <p className="story">
          <FormattedMessage
            id="DESCRIPTION_LEVEL_TEXT_3"
            defaultMessage="Chaque trésor trouvé vaut 3 points."
          />
        </p>
        <p className="story last">
          <FormattedMessage
            id="DESCRIPTION_LEVEL_TEXT_4"
            defaultMessage="ATTENTION! Si vous tombez sur un trou ou une araignée, vous perdrez 1 point."
          />
        </p>
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
};

export default GameDescriptionPanel;
