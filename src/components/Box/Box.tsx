import { BoxGeometry, MeshPhongMaterial, Mesh } from "three";
import config from "../../config";

const Box = () => {
  const geometry = new BoxGeometry(
    config.BOX_CONFIG.WIDTH,
    config.BOX_CONFIG.HEIGHT,
    config.BOX_CONFIG.DEPTH
  );
  const material = new MeshPhongMaterial({
    color: config.BOX_CONFIG.COLOR
  });

  return new Mesh(geometry, material);
};

export default Box;
