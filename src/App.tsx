import React from "react";
import "./App.css";
import Scene from "./components/3D/Scene/Scene";
import BoxGrid from "./components/3D/Box/BoxGrid";
import Sidebar from "./components/React/Sidebar/Sidebar";
import Plane from "./components/3D/Plane/Plane";
import Character from "./components/3D/Character/Character";
import getDirectionalLight from "./components/3D/DirectionalLight/DirectionalLight";

function App() {
  const boxGrid = BoxGrid(10);
  const plane = Plane();
  const light = getDirectionalLight();
  const cat = Character;

  return (
    <div className="App">
      <Scene items={[plane]} Character={cat} groups={[boxGrid]} light={light} />
      <Sidebar />
    </div>
  );
}

export default App;
