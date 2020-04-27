import React, { useContext } from "react";
import "./challenge.css";
import StoreContext from "../../../store/context";
import { observer } from "mobx-react";

const Challenge: React.FC = observer(() => {
  const { challengeStore } = useContext(StoreContext);

  return (
    <div className="challenge">
      <div>
        <p>Le pirate a laissé le conseil suivant:</p>
        <span>{challengeStore.initialNumber}</span>
        <span>{challengeStore.operation}</span>
        <span>{challengeStore.numberToCalculate}</span>
      </div>
      <p>Trouvez où le trésor est caché et creusez.</p>
    </div>
  );
});

export default Challenge;
