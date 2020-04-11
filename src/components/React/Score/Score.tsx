import React, { useContext } from "react";
import StoreContext from "../../../store/context";
import { observer } from "mobx-react";
import "./score.css";

interface ICoins {
  score: number;
}

const Coins: React.FC<ICoins> = ({ score }) => {
  let coins: JSX.Element[] = [];

  for (let i = 0; i < score; i++) {
    coins.push(<img alt="coin" src="./coin.png" />);
  }

  return <>{coins}</>;
};

const Score: React.FC = observer(() => {
  const { gameStore } = useContext(StoreContext);
  const { score, level, phase } = gameStore;

  return (
    <div className="score">
      <p>
        Level: {level}x{phase}
      </p>
      <div>
        <Coins score={score} />
      </div>
      <span>Score: {score}</span>
    </div>
  );
});

export default Score;
