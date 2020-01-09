import React from "react";
import "./App.css";
import Scene from "./components/Scene/Scene";
// import Sphere from "./components/Sphere/Sphere";
// import Cone from "./components/Cone/Cone";
import BoxGrid from "./components/Box/BoxGrid";
import Sidebar from "./components/Sidebar/Sidebar";
import Plane from "./components/Plane/Plane";
import Cat from "./components/Cat/Cat";
import getDirectionalLight from "./components/DirectionalLight/DirectionalLight";

function App() {
  // const sphere = new Sphere();
  // const cone = new Cone();
  const boxGrid = BoxGrid(10, 1.5);
  const plane = Plane();
  const light = getDirectionalLight();
  const cat = Cat;

  return (
    <div className="App">
      <Scene
        items={[plane]}
        externalItems={[cat]}
        groups={[boxGrid]}
        light={light}
      />
      <Sidebar />
    </div>
  );
}

export default App;
