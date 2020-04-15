import { DirectionalLight } from "three";
import config from "../../../config";
import * as dat from "dat.gui";

// for debugging purposes
const addGui = (light: DirectionalLight) => {
  const gui = new dat.GUI();

  gui.add(light, "intensity", 0, 10);
  gui.add(light.position, "x", -20, 20);
  gui.add(light.position, "y", 0, 20);
  gui.add(light.position, "z", -20, 20);
};

const getDirectionalLight = () => {
  var light = new DirectionalLight(
    config.DIRECTIONAL_LIGHT.COLOR,
    config.DIRECTIONAL_LIGHT.INTENSITY
  );
  light.castShadow = true;

  light.shadow.camera.left = -20;
  light.shadow.camera.bottom = -20;
  light.shadow.camera.right = 20;
  light.shadow.camera.top = 20;

  light.position.x = -5;
  light.position.y = 10;
  light.position.z = -10;

  return light;
};

export default getDirectionalLight;
