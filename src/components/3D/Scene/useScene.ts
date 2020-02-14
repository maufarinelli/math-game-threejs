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
  let sceneGroups: Group[] = [];
  let character: Character;
  let controls: any;
  const mouse = new Vector2();
  const raycaster = new Raycaster();
  let selectedItem: Intersection;
  let previousSelectedItem: Intersection;
  const { challengeStore } = useContext(StoreContext);

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
    setRenderer();
    setCamera();
    setScene();
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

  const addGroupsToScene = (groups: Group[]) => {
    groups.forEach(group => {
      sceneGroups.push(group);
      scene.add(group);
    });
  };

  const addCharacterToScene = (Character: any) => {
    character = new Character(scene);
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

    raycasterAction();
  };

  const onTouchStart = (event: any) => {
    event.preventDefault();
    let touch;

    if (event.targetTouches.length >= 1) touch = event.targetTouches.item(0);
    else touch = event.touches.item(0);

    setMousePosition(touch);
    raycasterAction();
  };

  const onDoubleClick = (event: any) => {
    event.preventDefault();
    setMousePosition(event);

    raycaster.setFromCamera(mouse, camera);
    const intersection = raycaster.intersectObjects(sceneGroups[0].children);

    if (intersection.length > 0) {
      selectBoxAction(intersection[0]);
      dispatchCharacterDigAction();
    }
  };

  const raycasterAction = () => {
    raycaster.setFromCamera(mouse, camera);
    const intersection = raycaster.intersectObjects(sceneGroups[0].children);

    console.log("intersection : ", intersection);

    if (intersection.length > 0) {
      selectBoxAction(intersection[0]);
      dispatchCharacterJumpAction();
    }
  };

  const selectBoxAction = (intersection: Intersection) => {
    highlightSelectedBox(intersection);

    if (selectedItem) setPreviousSelectedItem();
    setSelectedBox(intersection);
  };

  const dispatchCharacterJumpAction = () => {
    character.jumpAction(selectedItem);
  };

  const dispatchCharacterDigAction = () => {
    character.dig(selectedItem);
    challengeStore.setUserAswer(String(selectedItem.object.userData.boxNumber));
  };

  const highlightSelectedBox = (intersection: Intersection) => {
    sceneGroups[0].children.forEach(child => {
      // @ts-ignore
      child.material.color.set(config.BOX_CONFIG.COLOR);
    });
    // @ts-ignore
    intersection.object.material.color.setHex(config.BOX_CONFIG.LIGHTER_COLOR);
  };

  const setPreviousSelectedItem = () => {
    previousSelectedItem = { ...selectedItem };
  };

  const setSelectedBox = (intersection: Intersection) => {
    selectedItem = intersection;
  };

  const render = () => {
    requestAnimationFrame(render);

    raycaster.setFromCamera(mouse, camera);

    // controls.update();
    character.digAnimation();

    if (sceneLight.position.x < 5) sceneLight.position.x += 0.001;

    renderer.render(scene, camera);
  };

  return {
    setAllScene,
    setCanvas,
    getRenderer,
    addLightsToScene,
    addItemsToScene,
    addGroupsToScene,
    addCharacterToScene,
    addOrbitControls,
    onMouseDown,
    onTouchStart,
    onDoubleClick,
    render
  };
};

export default useScene;
