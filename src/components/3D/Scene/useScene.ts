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
  let controls: any;
  const mouse = new Vector2();
  const raycaster = new Raycaster();
  let selectedItem: any;

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

  const addExternalItemsToScene = (
    externalItems: Array<(scene: Scene) => void>
  ) => {
    externalItems.forEach(externalItem => {
      externalItem(scene);
    });
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
      // @ts-ignore
      // intersection[0].object.material.color.setHex(0xffffff);
      setSelectedBox(intersection[0]);
    }
  };

  const setSelectedBox = (intersection: Intersection) => {
    selectedItem = intersection;
    // console.log("selectedItem : ", selectedItem);
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
    addExternalItemsToScene,
    addOrbitControls,
    onMouseDown,
    render
  };
};

export default useScene;
