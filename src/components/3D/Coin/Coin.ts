// import * as OBJLoader from "three-obj-loader";
import * as FBXLoader from "three-fbx-loader";
import * as THREE from "three";

class Coin {
  public coin: THREE.Mesh = new THREE.Mesh();

  constructor(scene: THREE.Scene) {
    this.loadCoinIntoScene(scene);
  }

  public setCharacter(coin: THREE.Mesh) {
    this.coin = coin;
  }

  public loadCoinIntoScene(scene: THREE.Scene) {
    const threeInstance = THREE;
    // FBXLoader(threeInstance);

    // @ts-ignore
    const loader = new FBXLoader();

    loader.load("./Coin.fbx", (object: THREE.Mesh) => {
      // const { colorMap, normalMap, aoMap, specularMap } = this.loadTextures();
      debugger;
      const colorMaterial = new THREE.MeshBasicMaterial({ color: "red" });

      object.traverse((child: THREE.Object3D) => {
        // @ts-ignore
        child.material = colorMaterial;
      });

      this.setCharacter(object);

      object.scale.x = 200;
      object.scale.y = 200;
      object.scale.z = 200;

      this.changeCharacterPosition({ x: 1.5, y: 1, z: -1.5 });

      debugger;

      scene.add(object);
    });
  }

  public changeCharacterPosition({
    x,
    y,
    z
  }: {
    x?: number;
    y?: number;
    z?: number;
  }) {
    if (x || x === 0) this.coin.position.x = x;
    if (y || y === 0) this.coin.position.y = y;
    if (z || z === 0) this.coin.position.z = z;
  }
}

export default Coin;
