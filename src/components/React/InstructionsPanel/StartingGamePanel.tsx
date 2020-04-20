import React from "react";

interface IStartingGamePanelProps {
  handleStartClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const StartingGamePanel: React.FC<IStartingGamePanelProps> = ({
  handleStartClick,
}) => (
  <div className="panel-wrapper">
    <img alt="pirate" className="pirate-img" src="./pirate-math.png" />
    <div className="panel">
      <h1>Le Pirate Mathématicien</h1>
      <p className="story">
        Un pirate avait caché toutes les pièces de monnais de son trésor sur des
        îles différentes. Fox a trouvé des cartes avec des indications
        mystérieuses, telles que l'addition et la soustraction des nombres.
      </p>
      <p className="story">
        Aidez Fox à résoudre ces mystères et à trouver ce trésor caché.
      </p>
      <hr />
      <h3>Comment jouer: </h3>
      <ul>
        <li>
          Vous devez <b>Cliquer</b> sur <b>chaque carré</b> adjacent à sa
          position, pour que le personnage se déplace.
        </li>
        <li>
          Dès que vous atteignez <b>le carré où se trouve le résultat</b> de
          votre calcul <b>double-cliquez</b> (
          <i>ou appuyez longtemps pour les utilisateurs de tablette</i>) pour
          creuser et trouver la pièce cachée.
        </li>
      </ul>
    </div>
    <div className="overlay"></div>
    <form className="panel-restart">
      <button onClick={handleStartClick}>Commencer >></button>
    </form>
  </div>
);

export default StartingGamePanel;
