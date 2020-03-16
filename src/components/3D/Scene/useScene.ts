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
  Intersection
} from "three";
import OrbitControls from "three-orbitcontrols";
import StoreContext from "../../../store/context";
import { useContext } from "react";
import config from "../../../config";
import Character from "../Character/Character";
import * as dat from "dat.gui";
import BoxGrid from "../Box/BoxGrid";
import Spider from "../Spider/Spider";

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
  COLOR
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
  let selectedItem: Intersection;
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

    camera.lookAt(new Vector3(-7, 2, -2));
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
    items.forEach(child => {
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
    boxGrid.children.forEach(box => {
      if (box.userData.hasSpider) {
        const position = {
          x: box.position.x,
          z: box.position.z
        };
        const spiderInstance = new Spider(scene, position);
        gameStore.setSpiders(spiderInstance);
      }
    });
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
  };

  // https://stackoverflow.com/questions/29518886/moved-coordinates-of-the-scene-when-dom-element-with-renderer-is-not-at-the-top
  const setMousePosition = (event: any) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / window.innerWidth) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / HEIGHT) * 2 + 1;
  };

  const onMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    event.preventDefault();

    setMousePosition(event);
    raycasterAction(event.type);
  };

  const onTouchStart = (event: any) => {
    event.preventDefault();
    let touch;

    if (event.targetTouches.length >= 1) touch = event.targetTouches.item(0);
    else touch = event.touches.item(0);

    setMousePosition(touch);
    raycasterAction(event.type);
  };

  const onDoubleClick = (event: any) => {
    event.preventDefault();
    setMousePosition(event);

    raycasterAction(event.type);
  };

  const raycasterAction = (eventType: string) => {
    raycaster.setFromCamera(mouse, camera);
    const intersection = raycaster.intersectObjects(boxGrid.children);

    if (intersection.length > 0) {
      gameStore.selectBoxAction(intersection[0], boxGrid.children);

      if (eventType !== "dblclick") {
        gameStore.dispatchCharacterJumpAction();
      } else {
        gameStore.dispatchCharacterDigAction();
      }
    }
  };

  const render = () => {
    requestAnimationFrame(render);

    raycaster.setFromCamera(mouse, camera);

    // controls.update();
    character.digAnimation();
    gameStore.animateSpider();

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
    addOrbitControls,
    onMouseDown,
    onTouchStart,
    onDoubleClick,
    render
  };
};

export default useScene;
