import React, { useContext } from "react";
import "./form.css";
import StoreContext from "../../../store/context";
import { observer } from "mobx-react";
import Overlay from "../Overlay/Overlay";

const Form: React.FC = observer(() => {
  const { gameStore } = useContext(StoreContext);

  const handleNextClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    gameStore.handleNextClick();
  };

  if (!gameStore.showForm) return null;

  return (
    <div className="form-wrapper">
      <form className="form">
        {!gameStore.isLevelCompleted && (
          <button onClick={handleNextClick}>Next Phase >></button>
        )}
        {gameStore.isLevelCompleted && (
          <button onClick={handleNextClick}>Next Level >></button>
        )}
      </form>
      <Overlay />
    </div>
  );
});

export default Form;
