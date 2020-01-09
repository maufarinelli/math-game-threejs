import * as OBJLoader from "three-obj-loader";
import * as THREE from "three";

const Cat = (scene: THREE.Scene) => {
  const threeInstance = THREE;
  OBJLoader(threeInstance);

  // @ts-ignore
  const loader = new threeInstance.OBJLoader();

  loader.load("src/CatMac.obj", (object: THREE.Mesh) => {
    object.scale.x = 20;
    object.scale.y = 20;
    object.scale.z = 20;

    object.position.z = 0;
    object.position.y = -2;

    scene.add(object);
  });
};

export default Cat;
