import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  Light,
  Mesh,
  Vector3,
  Group,
  Vector2,
  Raycaster,
} from "three";
import OrbitControls from "three-orbitcontrols";
import StoreContext from "../../../store/context";
import { useContext } from "react";
import config from "../../../config";
import Character from "../Character/Character";
import * as dat from "dat.gui";
import BoxGrid from "../Box/BoxGrid";
import Spider from "../Spider/Spider";
import Coin from "../Coin/Coin";

interface ISceneConfig {
  WIDTH: number;
  HEIGHT: number;
  VIEW_ANGLE: number;
  ASPECT: number;
  NEAR: number;
  FAR: number;
  COLOR: string;
}

const useScene = ({
  WIDTH,
  HEIGHT,
  VIEW_ANGLE,
  ASPECT,
  NEAR,
  FAR,
  COLOR,
}: ISceneConfig) => {
  let canvas: any;
  let renderer: WebGLRenderer;
  let camera: PerspectiveCamera;
  let scene: Scene;
  let sceneLight: Light;
  let itemsOfScene: Mesh[] = [];
  let boxGrid: Group;
  let character: Character;
  let controls: any;
  const mouse = new Vector2();
  const raycaster = new Raycaster();
  const { challengeStore, gameStore } = useContext(StoreContext);

  const setRenderer = () => {
    renderer = new WebGLRenderer();

    // Start the renderer.
    renderer.setSize(WIDTH, HEIGHT);

    // renderer.shadowMap.enabled = true;
    renderer.setClearColor(COLOR);
  };

  const getRenderer = () => renderer;

  const setCamera = () => {
    camera = new PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.x = config.CAMERA_CONFIG.x;
    camera.position.y = config.CAMERA_CONFIG.y;
    camera.position.z = config.CAMERA_CONFIG.z;

    camera.lookAt(config.CAMERA_LOOK_AT);
  };

  const setScene = () => (scene = new Scene());

  const setAllScene = () => {
    if (!renderer) {
      setRenderer();
      setCamera();
      setScene();
    }
  };

  const setCanvas = (container: React.RefObject<HTMLDivElement>) => {
    canvas = container.current?.children[0];
  };

  // for debugging purposes
  const addGui = (camera: any) => {
    const gui = new dat.GUI();

    const updateCamera = () => {
      camera.updateProjectionMatrix();
    };

    gui.add(camera.position, "x", -20, 20).onChange(updateCamera);
    gui.add(camera.position, "y", 0, 20).onChange(updateCamera);
    gui.add(camera.position, "z", -20, 20).onChange(updateCamera);
  };

  const addLightsToScene = (light: Light) => {
    // add to the scene
    sceneLight = light;
    scene.add(sceneLight);
  };

  const addItemsToScene = (items: Mesh[]) => {
    items.forEach((child) => {
      itemsOfScene.push(child);
      scene.add(child);
    });
  };

  const addBoxGridToScene = () => {
    const boxGridInstance = new BoxGrid(
      10,
      gameStore.level,
      challengeStore.rightAnswer
    );
    boxGrid = boxGridInstance.getBoxGrid();
    scene.add(boxGrid);

    gameStore.setBoxGrid(boxGridInstance);
  };

  const addSpidersToScene = () => {
    boxGrid.children.forEach((box) => {
      if (box.userData.hasSpider) {
        const position = {
          x: box.position.x,
          z: box.position.z,
        };
        const spiderInstance = new Spider(scene, position);
        gameStore.setSpiders(spiderInstance);
      }
    });
  };

  const addCoinToScene = () => {
    const coinInstance = new Coin(scene);
    gameStore.setCoin(coinInstance);
  };

  const addCharacterToScene = (Character: any) => {
    character = gameStore.getCharacter();

    if (!character) {
      character = new Character(scene);
      gameStore.setCharacter(character);
    }
  };

  const addOrbitControls = () => {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.maxAzimuthAngle = 0;
    // controls.maxAzimuthAngle = Math.PI / 2 / 2;
    controls.minAzimuthAngle = 0;
    // controls.minAzimuthAngle = -(Math.PI / 2) / 2;
    // controls.enableRotate = false;
    controls.maxPolarAngle = Math.PI / 2;
    controls.target = config.CAMERA_LOOK_AT;
    controls.minZoom = 0;
    controls.maxDistance = 20;
    controls.saveState();

    // @ts-ignore
    window.controls = controls;
  };

  // https://stackoverflow.com/questions/29518886/moved-coordinates-of-the-scene-when-dom-element-with-renderer-is-not-at-the-top
  const setMousePosition = (event: any) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / window.innerWidth) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / HEIGHT) * 2 + 1;
  };

  const onMouseDown = (event: any) => {
    event.preventDefault();

    setMousePosition(event);
    raycasterAction(event.type);
  };

  let onLongTouch: any;
  const onTouchStart = (event: any) => {
    event.preventDefault();
    let touch: any;

    if (event.targetTouches.length >= 1) touch = event.targetTouches.item(0);
    else touch = event.touches.item(0);

    onLongTouch = setTimeout(() => {
      setMousePosition(touch);
      raycasterAction("longtouch");
    }, 750);

    setMousePosition(touch);
    raycasterAction(event.type);
  };

  const onTouchEnd = (event: any) => {
    event.preventDefault();
    clearTimeout(onLongTouch);
  };

  const onDoubleClick = (event: any) => {
    event.preventDefault();
    setMousePosition(event);

    raycasterAction(event.type);
  };

  const raycasterAction = (eventType: string) => {
    raycaster.setFromCamera(mouse, camera);
    const intersection = raycaster.intersectObjects(boxGrid.children);

    if (intersection.length > 0 && gameStore.isMoveAllowed(intersection[0])) {
      gameStore.selectBoxAction(intersection[0], boxGrid.children);

      if (eventType !== "dblclick" && eventType !== "longtouch") {
        gameStore.dispatchCharacterJumpAction();
      } else {
        gameStore.dispatchCharacterDigAction();
        setTimeout(() => {
          controls.reset();
        }, 1000);
      }
    }
  };

  const render = () => {
    requestAnimationFrame(render);

    raycaster.setFromCamera(mouse, camera);

    controls.update();
    character.digAnimation();
    gameStore.animateSpider();
    gameStore.animateCoin();

    if (sceneLight.position.x < 5) sceneLight.position.x += 0.001;

    renderer.render(scene, camera);
  };

  return {
    setAllScene,
    setCanvas,
    getRenderer,
    addLightsToScene,
    addItemsToScene,
    addBoxGridToScene,
    addCharacterToScene,
    addSpidersToScene,
    addCoinToScene,
    addOrbitControls,
    onMouseDown,
    onTouchStart,
    onTouchEnd,
    onDoubleClick,
    render,
  };
};

export default useScene;
