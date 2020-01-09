import React, { useEffect } from "react";
import { Light, Mesh, Group } from "three";
import useScene from "./useScene";
import config from "../../config";

interface IScene {
  items: Mesh[];
  groups?: Group[];
  light: Light;
  externalItems?: Array<(scene: any) => void>;
}

const Scene: React.FC<IScene> = ({ items, light, groups, externalItems }) => {
  const {
    setAllScene,
    getRenderer,
    addLightsToScene,
    addItemsToScene,
    addGroupsToScene,
    addExternalItemsToScene,
    addOrbitControls,
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
    container.current && container.current.appendChild(renderer.domElement);
  }, [container, renderer]);

  // create a point light and add to the scene
  // addPointLightsToScene(config.POINT_LIGHT);
  addLightsToScene(light);

  // add Items to the scene
  addItemsToScene(items);

  if (groups) {
    addGroupsToScene(groups);
  }

  if (externalItems) {
    addExternalItemsToScene(externalItems);
  }

  addOrbitControls();

  // Draw!
  render();

  return <div ref={container} />;
};

export default Scene;
