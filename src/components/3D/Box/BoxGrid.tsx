import { Group } from "three";
import Box from "./Box";
import Text from "../Text/Text";

const BoxGrid = (amount: number, separationMultiplier: number) => {
  const group = new Group();

  for (let i = 0; i < amount; i++) {
    const obj = Box();
    const text = Text(String(i));
    // text.visible =
    obj.add(text);

    obj.position.x = i * separationMultiplier;
    obj.position.y = (obj.geometry as any).parameters.height / 2;
    group.add(obj);

    for (let j = 1; j < amount; j++) {
      const obj = Box();
      const text = Text(String(j * 10 + i));
      obj.add(text);
      obj.position.x = i * separationMultiplier;
      obj.position.y = (obj.geometry as any).parameters.height / 2;
      obj.position.z = j * separationMultiplier;
      group.add(obj);
    }
  }

  group.position.x = -(separationMultiplier * (amount - 1)) / 2;
  group.position.z = -(separationMultiplier * (amount - 1)) / 2;

  return group;
};

export default BoxGrid;
