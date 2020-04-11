import React, { useContext } from "react";
import "./challenge.css";
import StoreContext from "../../../store/context";
import { observer } from "mobx-react";

const Challenge: React.FC = observer(() => {
  const { challengeStore } = useContext(StoreContext);

  return (
    <div className="challenge">
      <p>Le pirate a laissé le conseil suivant:</p>
      <span className="challenge-number">{challengeStore.initialNumber}</span>
      <span className="challenge-math-sign">{challengeStore.operation}</span>
      <span className="challenge-number">
        {challengeStore.numberToCalculate}
      </span>
      <br />
      <p>Trouvez où le trésor est caché et creusez.</p>
    </div>
  );
});

export default Challenge;
