import React from "react";
import Scene from "./components/3D/Scene/Scene";
import Header from "./components/DOM/Header/Header";
import Plane from "./components/3D/Plane/Plane";
import Character from "./components/3D/Character/Character";
import getDirectionalLight from "./components/3D/DirectionalLight/DirectionalLight";
import InstructionsPanel from "./components/DOM/InstructionsPanel/InstructionsPanel";
import FullscreenManager from "./components/DOM/FullScreenManager/FullScreenManager";

const App: React.FC = () => {
  const plane = Plane();
  const light = getDirectionalLight();
  const cat = Character;

  return (
    <div className="App">
      <Header />
      <Scene plane={plane} Character={cat} light={light} />
      <InstructionsPanel />
      <FullscreenManager />
    </div>
  );
};

export default App;
