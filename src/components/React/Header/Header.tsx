import React from "react";
import "./header.css";
import Form from "../Form/Form";
import Challenge from "../Challenge/Challenge";
import Score from "../Score/Score";

const Header = () => (
  <div className="header">
    <div>
      <p>
        Aidez votre ami Fox à trouver le trésor de cette île. Répondez à la
        question pour savoir où le trésor est caché.
      </p>

      <Challenge />
    </div>
    <div>
      <Form />
      <Score />
    </div>
  </div>
);

export default Header;
