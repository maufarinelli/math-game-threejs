// @ts-nocheck
import React, { useState } from "react";
import "./App.css";
import Scene from "./components/3D/Scene/Scene";
import Header from "./components/React/Header/Header";
import Plane from "./components/3D/Plane/Plane";
import Character from "./components/3D/Character/Character";
import getDirectionalLight from "./components/3D/DirectionalLight/DirectionalLight";
import Form from "./components/React/Form/Form";

const App: React.FC = () => {
  const [isFullscreen, toggleFullScreenMode] = useState(false);
  const plane = Plane();
  const light = getDirectionalLight();
  const cat = Character;

  const toggleFullScreen = () => {
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen =
      docEl.requestFullscreen ||
      docEl.mozRequestFullScreen ||
      docEl.webkitRequestFullScreen ||
      docEl.msRequestFullscreen;
    var cancelFullScreen =
      doc.exitFullscreen ||
      doc.mozCancelFullScreen ||
      doc.webkitExitFullscreen ||
      doc.msExitFullscreen;

    if (
      !doc.fullscreenElement &&
      !doc.mozFullScreenElement &&
      !doc.webkitFullscreenElement &&
      !doc.msFullscreenElement
    ) {
      requestFullScreen.call(docEl);
    } else {
      cancelFullScreen.call(doc);
    }
  };

  const handleFullscreenClick = () => {
    toggleFullScreen();
    toggleFullScreenMode((prev) => !prev);
  };

  return (
    <div className="App">
      <Header />
      <Scene items={[plane]} Character={cat} light={light} />
      <Form />
      <button className="btn-fullscreen" onClick={handleFullscreenClick}>
        {isFullscreen ? "Cancel fullscreen" : "Go fullscreen"}
      </button>
    </div>
  );
};

export default App;
