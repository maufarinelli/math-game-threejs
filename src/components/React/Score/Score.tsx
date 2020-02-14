import React, { useState } from "react";

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

const Score: React.FC = () => {
  const [score] = useState(4);

  return (
    <div>
      <div>
        <Coins score={score} />
      </div>
      <span>{score}</span>
    </div>
  );
};

export default Score;
