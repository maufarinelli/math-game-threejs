import { Group } from "three";
import Box from "./Box";
import Text from "../Text/Text";
import config from "../../../config";
import { useContext } from "react";
import StoreContext from "../../../store/context";

const getHolesObstaclesNumbers = (level: number, rightAnswer: number) => {
  const obstaclesQty = level * 5;
  const obstacleNumbersList = [];

  let i = 0;
  while (i < obstaclesQty) {
    const obstacleBoxNumber = Math.floor(Math.random() * 100);
    if (obstacleBoxNumber !== rightAnswer) {
      obstacleNumbersList.push(obstacleBoxNumber);
    }
    i++;
  }

  return obstacleNumbersList;
};

const getBoxInstance = (
  rowPosition: number,
  holesNumbersList: number[],
  isBoxInZ?: boolean,
  columnPosition?: number
) => {
  const box = Box();
  const separator = -config.BOX_CONFIG.SEPARATOR;
  const boxNumber =
    isBoxInZ && columnPosition
      ? columnPosition * 10 + rowPosition
      : rowPosition;
  const text = Text(String(boxNumber));

  box.add(text);
  box.userData.boxNumber = boxNumber;

  if (holesNumbersList.includes(boxNumber)) {
    box.userData.isHole = true;
    // @ts-ignore
    box.material.color.setHex(config.BOX_CONFIG.HOLE_COLOR);
    // @ts-ignore
    text.material.color.setHex(config.BOX_CONFIG.HOLE_TEXT_COLOR);
  }

  // positioning
  box.position.y = (box.geometry as any).parameters.height / 2;
  box.position.x =
    !isBoxInZ && rowPosition === 0 ? rowPosition : rowPosition * separator;
  if (isBoxInZ && columnPosition) {
    box.position.z = columnPosition * separator;
  }

  return box;
};

const BoxGrid = (amount: number) => {
  const { gameStore, challengeStore } = useContext(StoreContext);
  const group = new Group();
  const holesNumbersList = getHolesObstaclesNumbers(
    gameStore.level,
    challengeStore.rightAnswer
  );

  for (let i = 0; i < amount; i++) {
    const boxInstance = getBoxInstance(i, holesNumbersList);
    group.add(boxInstance);

    for (let j = 1; j < amount; j++) {
      const boxInstance = getBoxInstance(i, holesNumbersList, true, j);
      group.add(boxInstance);
    }
  }

  return group;
};

export default BoxGrid;
