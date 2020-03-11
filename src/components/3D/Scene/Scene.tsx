import React, { useEffect } from "react";
import { Light, Mesh, Group } from "three";
import useScene from "./useScene";
import config from "../../../config";
// import { observer } from "mobx-react";
import Character from "../Character/Character";

interface IScene {
  items: Mesh[];
  light: Light;
  Character: typeof Character;
}

const Scene: React.FC<IScene> = ({ items, light, Character }) => {
  const {
    setAllScene,
    setCanvas,
    getRenderer,
    addLightsToScene,
    addItemsToScene,
    addBoxGridToScene,
    addCharacterToScene,
    addSpidersToScene,
    addOrbitControls,
    onMouseDown,
    onTouchStart,
    onDoubleClick,
    render
  } = useScene(config.SCENE_CONFIG);

  // Get the DOM element to attach to
  const container: React.RefObject<HTMLDivElement> = React.createRef();

  // Create a WebGL renderer, camera
  // and a scene
  setAllScene();

  const renderer = getRenderer();

  useEffect(() => {
    // Attach the renderer-supplied
    // DOM element.
    if (container.current) {
      container.current.appendChild(renderer.domElement);
      // @ts-ignore
      container.current.addEventListener("mousedown", onMouseDown, false);
      container.current.addEventListener("touchstart", onTouchStart, false);
      container.current.addEventListener("dblclick", onDoubleClick, false);

      setCanvas(container);
    }
  }, []);

  // create a point light and add to the scene
  // addPointLightsToScene(config.POINT_LIGHT);
  addLightsToScene(light);

  // add Items to the scene
  addItemsToScene(items);

  addBoxGridToScene();
  addSpidersToScene();

  if (Character) {
    addCharacterToScene(Character);
  }

  // addOrbitControls();

  // Draw!
  render();

  return <div ref={container} />;
};

export default Scene;
