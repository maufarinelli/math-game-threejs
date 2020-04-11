import React, { useState, useEffect, useContext } from "react";
import "./header.css";
import Challenge from "../Challenge/Challenge";
import Score from "../Score/Score";
import StoreContext from "../../../store/context";
import { observer } from "mobx-react";

const Header = observer(() => {
  const { gameStore } = useContext(StoreContext);
  const [expanded, setExpanded] = useState(true);
  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  useEffect(() => {
    if (gameStore.showForm) {
      setExpanded(gameStore.showForm);
    } else {
      setTimeout(() => {
        setExpanded(gameStore.showForm);
      }, 3000);
    }
  }, [gameStore.showForm]);

  return (
    <div className="header">
      <div className={expanded ? "header-content expanded" : "header-content"}>
        <Challenge />
        <Score />
      </div>

      <button onClick={handleToggle}>
        <i className={expanded ? "arrow up" : "arrow down"}></i>
      </button>
    </div>
  );
});

export default Header;
