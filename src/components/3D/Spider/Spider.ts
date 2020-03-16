import * as OBJLoader from "three-obj-loader";
import * as THREE from "three";

export interface IPosition {
  x: number;
  z: number;
}

class Spider {
  public spider: THREE.Mesh = new THREE.Mesh();

  constructor(scene: THREE.Scene, position: IPosition) {
    this.loadIntoScene(scene, position);
  }

  public setSpider(spider: THREE.Mesh) {
    this.spider = spider;
  }

  public getSpider() {
    return this.spider;
  }

  private loadIntoScene(scene: THREE.Scene, position: IPosition) {
    const threeInstance = THREE;
    OBJLoader(threeInstance);

    // @ts-ignore
    window.scene = scene;

    // @ts-ignore
    const loader = new threeInstance.OBJLoader();

    loader.load("./spider.obj", (object: THREE.Mesh) => {
      const colorMaterial = new THREE.MeshPhongMaterial({
        color: 0x000000
      });

      object.traverse((child: THREE.Object3D) => {
        // @ts-ignore
        child.material = colorMaterial;
      });

      this.setSpider(object);

      object.scale.x = 0.008;
      object.scale.y = 0.008;
      object.scale.z = 0.008;

      this.changeSpiderPosition(position);
      this.changeSpiderRotation({ y: Math.random() * 2 - 1 });

      scene.add(object);
    });
  }

  public changeSpiderPosition({
    x,
    y,
    z
  }: {
    x?: number;
    y?: number;
    z?: number;
  }) {
    if (x || x === 0) this.spider.position.x = x;
    if (y || y === 0) this.spider.position.y = y;
    if (z || z === 0) this.spider.position.z = z;
  }

  public changeSpiderRotation({
    x,
    y,
    z
  }: {
    x?: number;
    y?: number;
    z?: number;
  }) {
    if (x || x === 0) this.spider.rotation.x = x;
    if (y || y === 0) this.spider.rotation.y = y;
    if (z || z === 0) this.spider.rotation.z = z;
  }

  public clock: THREE.Clock = new THREE.Clock();
  public time = 0;
  public delta = 0;
  public spiderAnimation() {
    this.delta = this.clock.getDelta();
    this.time += this.delta;
    this.spider.position.x += Math.sin(this.time * 23) * 0.002;

    this.spider.rotation.x += Math.sin(this.time * 27) * 0.005;
    this.spider.rotation.z += Math.sin(this.time * 27) * 0.01;

    this.spider.rotation.y += 0.003;
  }
}

export default Spider;
