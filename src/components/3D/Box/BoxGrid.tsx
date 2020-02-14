import { Group } from "three";
import Box from "./Box";
import Text from "../Text/Text";
import config from "../../../config";

const BoxGrid = (amount: number) => {
  const group = new Group();
  const separator = -config.BOX_CONFIG.SEPARATOR;

  for (let i = 0; i < amount; i++) {
    const obj = Box();

    const text = Text(String(i));

    obj.add(text);
    obj.userData.boxNumber = i;

    obj.position.x = i === 0 ? i : i * separator;
    obj.position.y = (obj.geometry as any).parameters.height / 2;
    group.add(obj);

    for (let j = 1; j < amount; j++) {
      const obj = Box();

      const text = Text(String(j * 10 + i));

      obj.add(text);
      obj.userData.boxNumber = j * 10 + i;

      obj.position.x = i * separator;
      obj.position.y = (obj.geometry as any).parameters.height / 2;
      obj.position.z = j * separator;
      group.add(obj);
    }
  }

  // group.position.x = -(separator * (amount - 1)) / 2;
  // group.position.z = -(separator * (amount - 1)) / 2;

  return group;
};

export default BoxGrid;
