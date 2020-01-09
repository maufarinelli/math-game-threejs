import React, { useState } from "react";
import "./form.css";

const Form: React.FC = () => {
  const [value, setValue] = useState("0");

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    const numberValue = parseInt(value, 10);

    if (Number.isInteger(numberValue)) {
      setValue(value);
    } else {
      setValue("");
    }
  };

  return (
    <form className="challenge-form">
      <input
        className="challenge-form"
        type="text"
        value={value}
        onChange={handleInputChange}
      />
      <br />
      <button type="submit">OK</button>
    </form>
  );
};

export default Form;
