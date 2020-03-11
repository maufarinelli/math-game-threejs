import React from "react";
import "./App.css";
import Scene from "./components/3D/Scene/Scene";
import BoxGrid from "./components/3D/Box/BoxGrid";
import Header from "./components/React/Header/Header";
import Plane from "./components/3D/Plane/Plane";
import Character from "./components/3D/Character/Character";
import getDirectionalLight from "./components/3D/DirectionalLight/DirectionalLight";
import Form from "./components/React/Form/Form";
// import { observer } from "mobx-react";

const App: React.FC = () => {
  const plane = Plane();
  const light = getDirectionalLight();
  const cat = Character;

  return (
    <div className="App">
      <Header />
      <Scene items={[plane]} Character={cat} light={light} />
      <Form />
    </div>
  );
};

export default App;
