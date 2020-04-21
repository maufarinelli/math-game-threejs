import React, { useEffect } from "react";
import { Light, Mesh } from "three";
import config from "../../../config";
import useScene from "./useScene";
import Character from "../Character/Character";

interface IScene {
  plane: Mesh;
  light: Light;
  Character: typeof Character;
}

const Scene: React.FC<IScene> = ({ plane, light, Character }) => {
  const {
    setAllScene,
    setCanvas,
    getRenderer,
    addLightsToScene,
    addPlaneToScene,
    addBoxGridToScene,
    addCharacterToScene,
    addSpidersToScene,
    addCoinToScene,
    addOrbitControls,
    onWindowResize,
    onMouseDown,
    onTouchStart,
    onTouchEnd,
    onDoubleClick,
    render,
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
    if (!container.current) return;

    const canvas = container.current;

    canvas.appendChild(renderer.domElement);
    // @ts-ignore
    canvas.addEventListener("mousedown", onMouseDown, false);
    canvas.addEventListener("touchstart", onTouchStart, false);
    canvas.addEventListener("dblclick", onDoubleClick, false);
    canvas.addEventListener("touchend", onTouchEnd, false);

    window.addEventListener("resize", onWindowResize, false);

    setCanvas(container);

    return function cleanup() {
      if (!canvas) return;

      canvas.removeEventListener("mousedown", onMouseDown, false);
      canvas.removeEventListener("touchstart", onTouchStart, false);
      canvas.removeEventListener("dblclick", onDoubleClick, false);
      canvas.removeEventListener("touchend", onTouchEnd, false);

      window.removeEventListener("resize", onWindowResize, false);
    };
  }, []);

  // create a point light and add to the scene
  // addPointLightsToScene(config.POINT_LIGHT);
  addLightsToScene(light);

  // add Items to the scene
  addPlaneToScene(plane);
  addBoxGridToScene();
  addSpidersToScene();
  addCoinToScene();

  if (Character) {
    addCharacterToScene(Character);
  }

  addOrbitControls();

  render();

  return <div ref={container} />;
};

export default Scene;
