import React, { useEffect } from "react";
import { Light, Mesh, Group } from "three";
import useScene from "./useScene";
import config from "../../../config";
import { observer } from "mobx-react";
import Character from "../Character/Character";
import Coin from "../Coin/Coin";

interface IScene {
  items: Mesh[];
  groups?: Group[];
  light: Light;
  Character: typeof Character;
  Coin: typeof Coin;
}

const Scene: React.FC<IScene> = observer(
  ({ items, light, groups, Character }) => {
    const {
      setAllScene,
      setCanvas,
      getRenderer,
      addLightsToScene,
      addItemsToScene,
      addGroupsToScene,
      addCharacterToScene,
      addCoinToScene,
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
    }, [container, renderer]);

    // create a point light and add to the scene
    // addPointLightsToScene(config.POINT_LIGHT);
    addLightsToScene(light);

    // add Items to the scene
    addItemsToScene(items);

    if (groups) {
      addGroupsToScene(groups);
    }

    if (Character) {
      addCharacterToScene(Character);
    }

    if (Coin) {
      addCoinToScene(Coin);
    }

    // addOrbitControls();

    // Draw!
    render();

    return <div ref={container} />;
  }
);

export default Scene;
