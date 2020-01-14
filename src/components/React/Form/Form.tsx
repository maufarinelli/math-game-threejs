import React, { useState, useContext } from "react";
import "./form.css";
import StoreContext from "../../../store/context";
import { observer } from "mobx-react";

const Form: React.FC = observer(() => {
  const [value, setValue] = useState("0");
  const [isPristine, setIsPristine] = useState(true);
  const store = useContext(StoreContext);

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    const numberValue = parseInt(value, 10);

    if (Number.isInteger(numberValue)) {
      setValue(value);
    } else {
      setValue("");
    }
  };

  const handleCheckboxChange = () => {
    store.toggleTextVisibility();
  };

  const handleChallengeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsPristine(false);
    store.setUserAswer(value);
  };

  const getAnswerStatus = () => {
    if (isPristine) return;

    if (store.isRightAnswer) {
      return "Ta reponse est CORRECT!";
    }
    return 'Ta reponse n\'est pas correct!';
  };

  return (
    <form className="challenge-form" onSubmit={handleChallengeSubmit}>
      <fieldset>
        <input
          className="challenge-form"
          type="text"
          value={value}
          onChange={handleInputChange}
        />
        <button type="submit">OK</button>
      </fieldset>
      <div>
        <p>{getAnswerStatus()}</p>
      </div>
      <fieldset>
        <label>
          <input
            type="checkbox"
            checked={store.showText}
            onChange={handleCheckboxChange}
          />
          Montrer les chiffres
        </label>
      </fieldset>
    </form>
  );
});

export default Form;
