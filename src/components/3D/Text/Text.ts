import config from "../../../config";
import helveticaRegular from "../../../../node_modules/three/examples/fonts/helvetiker_regular.typeface.json";
import { FontLoader, TextBufferGeometry, MeshBasicMaterial, Mesh } from "three";

const Text = (text: string) => {
  const loader = new FontLoader();
  const font = loader.parse(helveticaRegular);

  const geometry = new TextBufferGeometry(text, {
    font,
    size: config.TEXT_CONFIG.SIZE,
    height: config.TEXT_CONFIG.HEIGHT,
  });
  const material = new MeshBasicMaterial({
    color: config.TEXT_CONFIG.COLOR,
  });

  const mesh = new Mesh(geometry, material);
  mesh.position.y = 0.02;
  mesh.position.z = 0.4;
  mesh.rotation.x = -Math.PI / 2 - 12;

  return mesh;
};

export default Text;
