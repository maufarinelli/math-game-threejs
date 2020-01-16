import * as OBJLoader from "three-obj-loader";
import * as THREE from "three";

const Cat = (scene: THREE.Scene) => {
  const threeInstance = THREE;
  OBJLoader(threeInstance);

  // @ts-ignore
  const loader = new threeInstance.OBJLoader();
  const textureLoader = new THREE.TextureLoader();

  loader.load("./CatMac.obj", (object: THREE.Mesh) => {
    const colorMap = textureLoader.load("./cat_textures/CatMac_C.png");
    // const diffuseMap = textureLoader.load("./cat_textures/CatMac_D.jpg");
    const normalMap = textureLoader.load("./cat_textures/CatMac_N.jpg");
    const aoMap = textureLoader.load("./cat_textures/CatMac_AO.jpg");
    const specularMap = textureLoader.load("./cat_textures/CatMac_S.jpg");
    // const eyesMap = textureLoader.load("./cat_textures/CatMacEyes_S.png");

    const colorMaterial = new THREE.MeshPhongMaterial({
      map: colorMap,
      aoMap,
      normalMap,
      specularMap
    });

    object.traverse((child: THREE.Object3D) => {
      // @ts-ignore
      child.material = colorMaterial;
    });

    object.scale.x = 2;
    object.scale.y = 2;
    object.scale.z = 2;

    object.position.z = 7;
    object.position.y = 0;
    object.position.x = 7;

    object.rotation.y = -90;

    scene.add(object);
  });
};

export default Cat;
