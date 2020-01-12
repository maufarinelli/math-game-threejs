import React, { useState, useContext } from "react";
import "./form.css";
import StoreContext from "../../../store/context";
import { observer } from "mobx-react";

const Form: React.FC = observer(() => {
  const [value, setValue] = useState("0");
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

  return (
    <form className="challenge-form">
      <fieldset>
        <input
          className="challenge-form"
          type="text"
          value={value}
          onChange={handleInputChange}
        />
        <button type="submit">OK</button>
      </fieldset>
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
