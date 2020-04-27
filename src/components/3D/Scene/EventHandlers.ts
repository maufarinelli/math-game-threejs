import { WebGLRenderer, PerspectiveCamera } from "three";

export default class EventHandlers {
  private camera: PerspectiveCamera;
  private renderer: WebGLRenderer;
  private setMousePosition: (event: any) => void;
  private raycasterAction: (eventType: string) => void;

  constructor(
    camera: PerspectiveCamera,
    renderer: WebGLRenderer,
    setMousePosition: (event: any) => void,
    raycasterAction: (eventType: string) => void
  ) {
    this.camera = camera;
    this.renderer = renderer;
    this.setMousePosition = setMousePosition;
    this.raycasterAction = raycasterAction;
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  onMouseDown(event: any) {
    event.preventDefault();

    this.setMousePosition(event);
    this.raycasterAction(event.type);
  }

  onLongTouch: any;
  onTouchStart(event: any) {
    event.preventDefault();
    let touch: any;

    if (event.targetTouches.length >= 1) touch = event.targetTouches.item(0);
    else touch = event.touches.item(0);

    this.onLongTouch = setTimeout(() => {
      this.setMousePosition(touch);
      this.raycasterAction("longtouch");
    }, 750);

    this.setMousePosition(touch);
    this.raycasterAction(event.type);
  }

  onTouchEnd(event: any) {
    event.preventDefault();
    clearTimeout(this.onLongTouch);
  }

  onDoubleClick(event: any) {
    event.preventDefault();
    this.setMousePosition(event);

    this.raycasterAction(event.type);
  }
}
