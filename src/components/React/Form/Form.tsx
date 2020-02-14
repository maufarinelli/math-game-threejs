import React, { useContext } from "react";
import "./form.css";
import StoreContext from "../../../store/context";
import { observer } from "mobx-react";

const Form: React.FC = observer(() => {
  const { challengeStore } = useContext(StoreContext);

  const getAnswerStatus = () => {
    if (challengeStore.isPristine) return;

    if (challengeStore.isRightAnswer) {
      return "Ta reponse est CORRECT!";
    }
    return 'Ta reponse n\'est pas correct!';
  };

  return (
    <form className="challenge-form">
      <div>
        <p>{getAnswerStatus()}</p>
      </div>
    </form>
  );
});

export default Form;
