import React from "react";
import "./sidebar.css";
import Form from "../Form/Form";
import Challenge from "../Challenge/Challenge";

const Sidebar = () => (
  <div className="sidebar">
    <p>Aidez votre ami Fox à trouver le trésor de cette île.</p>
    <p>Répondez à la question pour savoir où le trésor est caché.</p>

    <Challenge />
    <Form />
  </div>
);

export default Sidebar;
