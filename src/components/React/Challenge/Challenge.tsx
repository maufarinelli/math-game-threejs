import React, { useContext } from "react";
import "./challenge.css";
import StoreContext from "../../../store/context";
import { observer } from "mobx-react";

const Challenge: React.FC = observer(() => {
  const store = useContext(StoreContext);

  return (
    <div className="challenge">
      <span className="challenge-number">{store.initialNumber}</span>
      <span className="challenge-math-sign">{store.operation}</span>
      <span className="challenge-number">{store.numberToCalculate}</span>
    </div>
  );
});

export default Challenge;
