import * as OBJLoader from "three-obj-loader";
import * as THREE from "three";
import config from "../../../config";
import { Intersection } from "three";

export interface ICharacter {
  character: THREE.Mesh;
}

export interface IPosition {
  x: number;
  z: number;
}

class Character {
  public character: THREE.Mesh = new THREE.Mesh();

  public isDigging: boolean = false;
  public isDiggingDownFinished: boolean = false;
  public isDiggingUpFinished: boolean = false;

  constructor(scene: THREE.Scene) {
    this.loadIntoScene(scene);
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

  private loadIntoScene(scene: THREE.Scene) {
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

      this.changeCharacterPosition({ x: 0, y: 0, z: 0 });

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
    if (x || x === 0) this.character.position.x = x;
    if (y || y === 0) this.character.position.y = y;
    if (z || z === 0) this.character.position.z = z;
  }

  public getPosition(): IPosition {
    const { x, z } = this.character.position;

    return { x, z };
  }

  public changeCharacteRotation({
    x,
    y,
    z
  }: {
    x?: number;
    y?: number;
    z?: number;
  }) {
    if (x || x === 0) this.character.rotation.x = x;
    if (y || y === 0) this.character.rotation.y = y;
    if (z || z === 0) this.character.rotation.z = z;
  }

  public jumpLeft() {
    const currentX = this.character.position.x;
    this.changeCharacteRotation({ y: -Math.PI / 2 });
    this.changeCharacterPosition({ x: currentX - config.BOX_CONFIG.SEPARATOR });
  }

  public jumpRight() {
    const currentX = this.character.position.x;
    this.changeCharacteRotation({ y: Math.PI / 2 });
    this.changeCharacterPosition({ x: currentX + config.BOX_CONFIG.SEPARATOR });
  }

  public jumpUp() {
    const currentZ = this.character.position.z;
    this.changeCharacteRotation({ y: Math.PI });
    this.changeCharacterPosition({ z: currentZ - config.BOX_CONFIG.SEPARATOR });
  }

  public jumpDown() {
    const currentZ = this.character.position.z;
    this.changeCharacteRotation({ y: 0 });
    this.changeCharacterPosition({ z: currentZ + config.BOX_CONFIG.SEPARATOR });
  }

  public dig(currentSelectedItem: Intersection) {
    const selectedPosX = currentSelectedItem.object.position.x;
    const selectedPosZ = currentSelectedItem.object.position.z;
    const characterPosX = this.character.position.x;
    const characterPosZ = this.character.position.z;

    if (selectedPosX === characterPosX && selectedPosZ === characterPosZ) {
      this.changeCharacteRotation({ y: 0 });
      this.isDigging = true;
      this.isDiggingDownFinished = false;
      this.isDiggingUpFinished = false;
    }
  }

  public digAnimation() {
    if (this.isDigging) {
      if (!this.isDiggingDownFinished) {
        this.digAnimationDown();
      } else {
        this.digAnimationUp();

        if (this.isDiggingUpFinished) {
          this.isDigging = false;
        }
      }
    }
  }

  public digAnimationDown() {
    this.character.rotation.x += 0.05;

    if (this.character.rotation.x >= 0.5) {
      this.isDiggingDownFinished = true;
    }
  }

  public digAnimationUp() {
    this.character.rotation.x -= 0.05;

    if (this.character.rotation.x <= 0) {
      this.isDiggingUpFinished = true;
    }
  }

  public isMoveAllowed(currentSelectedItem: Intersection) {
    const selectedPosX = currentSelectedItem.object.position.x;
    const selectedPosZ = currentSelectedItem.object.position.z;
    const characterPosX = this.character.position.x;
    const characterPosZ = this.character.position.z;

    return (
      (selectedPosX - characterPosX === -config.BOX_CONFIG.SEPARATOR ||
        selectedPosX - characterPosX === config.BOX_CONFIG.SEPARATOR ||
        selectedPosX - characterPosX === 0) &&
      (selectedPosZ - characterPosZ === -config.BOX_CONFIG.SEPARATOR ||
        selectedPosZ - characterPosZ === config.BOX_CONFIG.SEPARATOR ||
        selectedPosZ - characterPosZ === 0)
    );
  }

  public jumpAction(currentSelectedItem: Intersection) {
    const selectedPosX = currentSelectedItem.object.position.x;
    const selectedPosZ = currentSelectedItem.object.position.z;
    const characterPosX = this.character.position.x;
    const characterPosZ = this.character.position.z;

    if (!this.isMoveAllowed(currentSelectedItem)) return;

    if (characterPosX > selectedPosX) {
      this.jumpLeft();
    } else if (characterPosX < selectedPosX) {
      this.jumpRight();
    }

    if (characterPosZ > selectedPosZ) {
      this.jumpUp();
    } else if (characterPosZ < selectedPosZ) {
      this.jumpDown();
    }
  }

  public wrongMoveAction() {
    let milisecondsToStop = 0;

    const wrongMoveAnimationCallback = () => {
      const x =
        milisecondsToStop % 2 === 0
          ? Math.random() * 0.5
          : Math.random() * -0.5;
      const z =
        milisecondsToStop % 2 === 0
          ? Math.random() * 0.5
          : Math.random() * -0.5;

      this.character.rotation.x = x;
      this.character.rotation.z = z;

      milisecondsToStop++;
      if (milisecondsToStop >= 10) {
        cancelAnimationFrame(wrongMoveAnimation);
        this.character.rotation.x = 0;
        this.character.rotation.z = 0;
      } else {
        wrongMoveAnimation = requestAnimationFrame(wrongMoveAnimationCallback);
      }
    };

    let wrongMoveAnimation = requestAnimationFrame(wrongMoveAnimationCallback);
  }
}

export default Character;
