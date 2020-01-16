import { useContext } from "react";
import { Group } from "three";
import Box from "./Box";
import Text from "../Text/Text";
import StoreContext from "../../../store/context";
import { autorun } from "mobx";

const BoxGrid = (amount: number, separationMultiplier: number) => {
  const { uiStore } = useContext(StoreContext);
  const group = new Group();

  for (let i = 0; i < amount; i++) {
    const obj = Box();

    const text = Text(String(i));
    autorun(() => {
      text.visible = uiStore.textVisibity;
    });

    obj.add(text);
    obj.userData.boxNumber = i;

    obj.position.x = i * separationMultiplier;
    obj.position.y = (obj.geometry as any).parameters.height / 2;
    group.add(obj);

    for (let j = 1; j < amount; j++) {
      const obj = Box();

      const text = Text(String(j * 10 + i));
      autorun(() => {
        text.visible = uiStore.textVisibity;
      });

      obj.add(text);
      obj.userData.boxNumber = j * 10 + i;

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
