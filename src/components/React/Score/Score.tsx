import React, { useContext } from "react";
import StoreContext from "../../../store/context";
import { observer } from "mobx-react";

interface ICoins {
  score: number;
}

const Coins: React.FC<ICoins> = ({ score }) => {
  let coins: JSX.Element[] = [];

  for (let i = 0; i < score; i++) {
    coins.push(<img src="./coin.png" />);
  }

  return <>{coins}</>;
};

const Score: React.FC = observer(() => {
  const { gameStore, challengeStore } = useContext(StoreContext);
  const { score, level, phase } = gameStore;

  const getAnswerStatus = () => {
    if (challengeStore.isPristine) return;

    if (challengeStore.isRightAnswer) {
      return "Ta reponse est CORRECT!";
    }
    return 'Ta reponse n\'est pas correct!';
  };

  return (
    <div>
      <p>
        {getAnswerStatus()} Level: {level}x{phase}
      </p>
      <div>
        <Coins score={score} />
      </div>
      <span>Score: {score}</span>
    </div>
  );
});

export default Score;
