import React from "react";
import "./header.css";
import Challenge from "../Challenge/Challenge";
import Score from "../Score/Score";

const Header = () => (
  <div className="header">
    <Challenge />
    <Score />
  </div>
);

export default Header;
