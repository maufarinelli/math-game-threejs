import React, { useContext } from "react";
import "./challenge.css";
import StoreContext from "../../../store/context";
import { observer } from "mobx-react";

const Challenge: React.FC = observer(() => {
  const { challengeStore } = useContext(StoreContext);

  return (
    <div className="challenge">
      <span className="challenge-number">{challengeStore.initialNumber}</span>
      <span className="challenge-math-sign">{challengeStore.operation}</span>
      <span className="challenge-number">
        {challengeStore.numberToCalculate}
      </span>
    </div>
  );
});

export default Challenge;
