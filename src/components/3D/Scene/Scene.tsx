import React, { useEffect } from "react";
import { Light, Mesh } from "three";
import config from "../../../config";
import useScene from "./useScene";
import Character from "../Character/Character";
import useMeshes from "./useMeshes";
import EventHandlers from "./EventHandlers";

interface IScene {
  plane: Mesh;
  light: Light;
  Character: typeof Character;
}

const Scene: React.FC<IScene> = ({ plane, light, Character }) => {
  const {
    setAllScene,
    setCanvas,
    getScene,
    getRenderer,
    getCamera,
    addLightsToScene,
    addOrbitControls,
    setMousePosition,
    raycasterAction,
    render,
  } = useScene(config.SCENE_CONFIG);

  // Get the DOM element to attach to
  const container: React.RefObject<HTMLDivElement> = React.createRef();

  // Create a WebGL renderer, camera
  // and a scene
  setAllScene();

  const scene = getScene();
  const renderer = getRenderer();
  const camera = getCamera();

  // To add Meshes to the Scene
  const {
    addPlaneToScene,
    addBoxGridToScene,
    addCharacterToScene,
    addSpidersToScene,
    addCoinToScene,
  } = useMeshes(scene);

  // Event Handlers
  const eventHandlers = new EventHandlers(
    camera,
    renderer,
    setMousePosition,
    raycasterAction
  );

  useEffect(() => {
    // Attach the renderer-supplied
    // DOM element.
    if (!container.current) return;

    const canvas = container.current;

    canvas.appendChild(renderer.domElement);
    // @ts-ignore
    canvas.addEventListener(
      "mousedown",
      eventHandlers.onMouseDown.bind(eventHandlers),
      false
    );
    canvas.addEventListener(
      "touchstart",
      eventHandlers.onTouchStart.bind(eventHandlers),
      false
    );
    canvas.addEventListener(
      "dblclick",
      eventHandlers.onDoubleClick.bind(eventHandlers),
      false
    );
    canvas.addEventListener(
      "touchend",
      eventHandlers.onTouchEnd.bind(eventHandlers),
      false
    );

    window.addEventListener(
      "resize",
      eventHandlers.onWindowResize.bind(eventHandlers),
      false
    );

    setCanvas(container);

    return function cleanup() {
      if (!canvas) return;

      canvas.removeEventListener("mousedown", eventHandlers.onMouseDown, false);
      canvas.removeEventListener(
        "touchstart",
        eventHandlers.onTouchStart,
        false
      );
      canvas.removeEventListener(
        "dblclick",
        eventHandlers.onDoubleClick,
        false
      );
      canvas.removeEventListener("touchend", eventHandlers.onTouchEnd, false);

      window.removeEventListener("resize", eventHandlers.onWindowResize, false);
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
