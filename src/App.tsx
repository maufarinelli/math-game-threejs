import React, { useContext } from "react";
import "./App.css";
import Scene from "./components/3D/Scene/Scene";
import BoxGrid from "./components/3D/Box/BoxGrid";
import Header from "./components/React/Header/Header";
import Plane from "./components/3D/Plane/Plane";
import Character from "./components/3D/Character/Character";
import getDirectionalLight from "./components/3D/DirectionalLight/DirectionalLight";
import Form from "./components/React/Form/Form";
import StoreContext from "./store/context";
import { observer } from "mobx-react";
import Coin from "./components/3D/Coin/Coin";

const App: React.FC = observer(() => {
  const boxGrid = BoxGrid(10);
  const plane = Plane();
  const light = getDirectionalLight();
  const cat = Character;
  const coin = Coin;

  return (
    <div className="App">
      <Header />
      <Scene
        items={[plane]}
        Character={cat}
        Coin={coin}
        groups={[boxGrid]}
        light={light}
      />
      <Form />
    </div>
  );
});

export default App;
