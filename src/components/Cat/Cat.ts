import * as OBJLoader from "three-obj-loader";
import * as THREE from "three";

const Cat = (scene: THREE.Scene) => {
  const threeInstance = THREE;
  OBJLoader(threeInstance);

  // @ts-ignore
  const loader = new threeInstance.OBJLoader();

  loader.load("./CatMac.obj", (object: THREE.Mesh) => {
    object.scale.x = 3;
    object.scale.y = 3;
    object.scale.z = 3;

    object.position.z = 2;
    object.position.y = 0;
    object.position.x = 2;

    scene.add(object);
  });
};

export default Cat;
