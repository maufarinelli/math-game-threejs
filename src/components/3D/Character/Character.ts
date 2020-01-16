import * as OBJLoader from "three-obj-loader";
import * as THREE from "three";
import config from "../../../config";

export interface ICharacter {
  character: THREE.Mesh;
}

class Character {
  public character: THREE.Mesh = new THREE.Mesh();

  constructor(scene: THREE.Scene) {
    this.loadCatIntoScene(scene);
  }

  public setCharacter(character: THREE.Mesh) {
    this.character = character;
  }

  private loadTextures() {
    const textureLoader = new THREE.TextureLoader();

    const colorMap = textureLoader.load("./cat_textures/CatMac_C.png");
    // const diffuseMap = textureLoader.load("./cat_textures/CatMac_D.jpg");
    const normalMap = textureLoader.load("./cat_textures/CatMac_N.jpg");
    const aoMap = textureLoader.load("./cat_textures/CatMac_AO.jpg");
    const specularMap = textureLoader.load("./cat_textures/CatMac_S.jpg");
    // const eyesMap = textureLoader.load("./cat_textures/CatMacEyes_S.png");

    return { colorMap, normalMap, aoMap, specularMap };
  }

  private loadCatIntoScene(scene: THREE.Scene) {
    const threeInstance = THREE;
    OBJLoader(threeInstance);

    // @ts-ignore
    const loader = new threeInstance.OBJLoader();

    loader.load("./CatMac.obj", (object: THREE.Mesh) => {
      const { colorMap, normalMap, aoMap, specularMap } = this.loadTextures();

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

      this.setCharacter(object);

      object.scale.x = 2;
      object.scale.y = 2;
      object.scale.z = 2;

      this.changeCharacterPosition({ x: 7, y: 0, z: 7 });

      scene.add(object);
    });
  }

  private changeCharacterPosition({
    x,
    y,
    z
  }: {
    x?: number;
    y?: number;
    z?: number;
  }) {
    if (x) this.character.position.x = x;
    if (y) this.character.position.y = y;
    if (z) this.character.position.z = z;
  }

  private changeCharacteRotation({
    x,
    y,
    z
  }: {
    x?: number;
    y?: number;
    z?: number;
  }) {
    if (x) this.character.rotation.x = x;
    if (y) this.character.rotation.y = y;
    if (z) this.character.rotation.z = z;
  }

  public jumpLeft() {
    const currentX = this.character.position.x;
    this.changeCharacteRotation({ y: -90 });
    this.changeCharacterPosition({ x: currentX - config.BOX_CONFIG.SEPARATOR });
  }

  public jumpRight() {
    const currentX = this.character.position.x;
    this.changeCharacteRotation({ y: 90 });
    this.changeCharacterPosition({ x: currentX + config.BOX_CONFIG.SEPARATOR });
  }

  public jumpUp() {
    const currentZ = this.character.position.z;
    this.changeCharacterPosition({ z: currentZ - config.BOX_CONFIG.SEPARATOR });
  }

  public jumpDown() {
    const currentZ = this.character.position.z;
    this.changeCharacterPosition({ z: currentZ + config.BOX_CONFIG.SEPARATOR });
  }
}

export default Character;
