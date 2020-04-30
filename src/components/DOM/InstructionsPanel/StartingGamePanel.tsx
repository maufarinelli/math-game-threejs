import React from "react";
import { FormattedMessage } from "react-intl";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

interface IStartingGamePanelProps {
  handleStartClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const StartingGamePanel: React.FC<IStartingGamePanelProps> = ({
  handleStartClick,
}) => (
  <div className="panel-wrapper">
    <LanguageSwitcher />
    <img alt="pirate" className="pirate-img" src="./pirate-math.png" />
    <div className="panel">
      <h1>
        <FormattedMessage
          id="STARTING_GAME_TITLE"
          defaultMessage="Le Pirate Mathématicien"
        />
      </h1>
      <p className="story">
        <FormattedMessage
          id="STARTING_GAME_TEXT_1"
          defaultMessage="Un pirate avait caché toutes les pièces de monnais de son trésor sur des îles différentes. Fox a trouvé des cartes avec des indications mystérieuses, telles que l'addition et la soustraction des nombres."
        />
      </p>
      <p className="story">
        <FormattedMessage
          id="STARTING_GAME_TEXT_2"
          defaultMessage="Aidez Fox à résoudre ces mystères et à trouver ce trésor caché."
        />
      </p>
      <hr />
      <h3>
        <FormattedMessage
          id="STARTING_GAME_SUBTITLE"
          defaultMessage="Comment jouer: "
        />
      </h3>
      <ul>
        <li>
          <FormattedMessage
            id="STARTING_GAME_HOW_TO_PLAY_TEXT_1"
            defaultMessage="Vous devez <b>Cliquer</b> sur <b>chaque carré</b> adjacent à sa position, pour que le personnage se déplace."
            values={{
              b: (...chunks: string[]) => <b>{chunks}</b>,
            }}
          />
        </li>
        <li>
          <FormattedMessage
            id="STARTING_GAME_HOW_TO_PLAY_TEXT_2"
            defaultMessage="Dès que vous atteignez <b>le carré où se trouve le résultat</b> de votre calcul <b>double-cliquez</b> (<i>ou appuyez longtemps pour les utilisateurs de tablette</i>) pour creuser et trouver la pièce cachée."
            values={{
              b: (...chunks: string[]) => <b>{chunks}</b>,
              i: (...chunks: string[]) => <i>{chunks}</i>,
            }}
          />
        </li>
      </ul>
    </div>
    <div className="panel-restart">
      <button onClick={handleStartClick}>
        <FormattedMessage id="ACTION_BUTTON_START" defaultMessage="Commencer" />
      </button>
    </div>
    <div className="overlay"></div>
  </div>
);

export default StartingGamePanel;
