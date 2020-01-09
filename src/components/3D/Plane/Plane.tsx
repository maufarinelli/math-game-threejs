import { PlaneGeometry, MeshPhongMaterial, DoubleSide, Mesh } from "three";
import config from "../../../config";

const Plane = (): Mesh => {
  const geometry = new PlaneGeometry(
    config.PLANE_CONFIG.WIDTH,
    config.PLANE_CONFIG.HEIGHT
  );
  const material = new MeshPhongMaterial({
    color: config.PLANE_CONFIG.COLOR,
    side: DoubleSide
  });

  const plane = new Mesh(geometry, material);
  plane.receiveShadow = true;
  plane.rotation.x = Math.PI / 2;

  return plane;
};

export default Plane;
