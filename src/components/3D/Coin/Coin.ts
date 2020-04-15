import * as OBJLoader from "three-obj-loader";
import * as THREE from "three";

export interface IPosition {
  x: number;
  z: number;
}

class Coin {
  public coin: THREE.Mesh = new THREE.Mesh();

  constructor(scene: THREE.Scene) {
    this.loadIntoScene(scene);
  }

  public setCoin(coin: THREE.Mesh) {
    this.coin = coin;
  }

  public getCoin() {
    return this.coin;
  }

  private loadTextures() {
    const textureLoader = new THREE.TextureLoader();

    return textureLoader.load("./skull_coin.jpg");
  }

  private loadIntoScene(scene: THREE.Scene) {
    const threeInstance = THREE;
    OBJLoader(threeInstance);

    // @ts-ignore
    const loader = new threeInstance.OBJLoader();

    loader.load("./skull_coin.obj", (object: THREE.Mesh) => {
      const map = this.loadTextures();
      const colorMaterial = new THREE.MeshBasicMaterial({
        color: 0xffd100,
        map,
        aoMap: map,
        specularMap: map,
      });

      object.traverse((child: THREE.Object3D) => {
        // @ts-ignore
        child.material = colorMaterial;
      });

      this.setCoin(object);

      // @ts-ignore
      object.children[0].geometry.center();

      object.position.y = -Math.PI / 2;
      object.position.z = 0;
      object.position.x = 0;

      object.scale.x = 0.1;
      object.scale.y = 0.1;
      object.scale.z = 0.1;

      object.rotation.x = 95;

      scene.add(object);
    });
  }

  public changeCoinPosition({
    x,
    y,
    z,
  }: {
    x?: number;
    y?: number;
    z?: number;
  }) {
    if (x || x === 0) this.coin.position.x = x;
    if (y || y === 0) this.coin.position.y = y;
    if (z || z === 0) this.coin.position.z = z;
  }

  public changeCoinRotation({
    x,
    y,
    z,
  }: {
    x?: number;
    y?: number;
    z?: number;
  }) {
    if (x || x === 0) this.coin.rotation.x = x;
    if (y || y === 0) this.coin.rotation.y = y;
    if (z || z === 0) this.coin.rotation.z = z;
  }

  public radians = (3 * Math.PI) / 2 + 1;
  public shouldAnimate: boolean | undefined;
  public coinAnimation() {
    this.radians += 0.1;
    if (this.radians <= (3 * Math.PI) / 2) {
      this.coin.position.y = Math.sin(this.radians) * 2;
    }
  }

  public animate(position: IPosition) {
    this.changeCoinPosition(position);
    this.radians = -Math.PI / 2;
  }
}

export default Coin;
