import { TextGeometry, MeshPhongMaterial, Mesh, FontLoader } from "three";
// import config from "../../../config";
import helveticaRegular from "../../../../node_modules/three/examples/fonts/helvetiker_regular.typeface.json";

const Text = (text: string) => {
  const loader = new FontLoader();

  console.log("helveticaRegular : ", helveticaRegular);

  const font = loader.parse(helveticaRegular);

  const geometry = new TextGeometry(text, {
    font,
    size: 0.4,
    height: 0.1
  });
  const material = new MeshPhongMaterial({
    color: "rgb(0, 0, 0)"
  });

  const mesh = new Mesh(geometry, material);

  mesh.position.y = 0.2;
  mesh.position.z = 0.4;
  mesh.rotation.x = -Math.PI / 2;

  return mesh;
};

export default Text;
