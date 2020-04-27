import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  Light,
  Vector2,
  Raycaster,
} from "three";
import { useContext } from "react";
import OrbitControls from "three-orbitcontrols";
import StoreContext from "../../../store/context";
import config from "../../../config";
import * as dat from "dat.gui";

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
  let controls: any;
  const mouse = new Vector2();
  const raycaster = new Raycaster();
  const { gameStore } = useContext(StoreContext);

  const setRenderer = () => {
    renderer = new WebGLRenderer({ powerPreference: "high-performance" });

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

  const getCamera = () => {
    return camera;
  };

  const setScene = () => (scene = new Scene());

  const getScene = () => scene;

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
    mouse.y = -((event.clientY - rect.top) / window.innerHeight) * 2 + 1;
  };

  const raycasterAction = (eventType: string) => {
    raycaster.setFromCamera(mouse, camera);
    const boxGrid = gameStore.getBoxGridGroup();
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
    gameStore.getCharacter().digAnimation();
    gameStore.animateSpider();
    gameStore.animateCoin();

    if (sceneLight.position.x < 5) sceneLight.position.x += 0.001;

    renderer.render(scene, camera);
  };

  return {
    setAllScene,
    setCanvas,
    getScene,
    getRenderer,
    getCamera,
    addLightsToScene,
    addOrbitControls,
    setMousePosition,
    raycasterAction,
    render,
  };
};

export default useScene;
