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
  let selectedItem: any;
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
    camera.position.x = 0;
    camera.position.y = 7;
    camera.position.z = 20;

    camera.lookAt(new Vector3(0, 0, 0));
  };

  const setScene = () => (scene = new Scene());

  const setAllScene = () => {
    setRenderer();
    setCamera();
    setScene();
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

  const onMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    event.preventDefault();

    mouse.x = (event.clientX / WIDTH) * 2 - 1;
    mouse.y = -(event.clientY / HEIGHT) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersection = raycaster.intersectObjects(sceneGroups[0].children);

    if (intersection.length > 0) {
      sceneGroups[0].children.forEach(child => {
        // @ts-ignore
        child.material.color.set(config.BOX_CONFIG.COLOR);
      });
      // @ts-ignore
      intersection[0].object.material.color.set(
        config.BOX_CONFIG.LIGHTER_COLOR
      );

      setSelectedBox(intersection[0]);
      character.jumpLeft();
    }
  };

  const setSelectedBox = (intersection: Intersection) => {
    selectedItem = intersection;
    console.log("selectedItem : ", selectedItem);

    challengeStore.setUserAswer(String(selectedItem.object.userData.boxNumber));
  };

  const render = () => {
    requestAnimationFrame(render);

    raycaster.setFromCamera(mouse, camera);

    controls.update();

    if (sceneLight.position.x < 5) sceneLight.position.x += 0.001;

    renderer.render(scene, camera);
  };

  return {
    setAllScene,
    getRenderer,
    addLightsToScene,
    addItemsToScene,
    addGroupsToScene,
    addCharacterToScene,
    addOrbitControls,
    onMouseDown,
    render
  };
};

export default useScene;
