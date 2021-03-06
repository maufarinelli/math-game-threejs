import { Group } from "three";
import Box from "./Box";
import Text from "../Text/Text";
import config from "../../../config";

class BoxGrid {
  private boxGrid: Group;

  constructor(amount: number, level: number, rightAnswer: number) {
    this.boxGrid = this.createBoxGrid(amount, level, rightAnswer);
  }

  public createBoxGrid(amount: number, level: number, rightAnswer: number) {
    const group = new Group();
    const obstaclesNumbersList = this.getObstaclesNumbers(level, rightAnswer);

    for (let i = 0; i < amount; i++) {
      const boxInstance = this.getBoxInstance(i, obstaclesNumbersList);
      group.add(boxInstance);

      for (let j = 1; j < amount; j++) {
        const boxInstance = this.getBoxInstance(
          i,
          obstaclesNumbersList,
          true,
          j
        );
        group.add(boxInstance);
      }
    }

    return group;
  }

  /**
   * Update BoxGrid. This function is needed to repositioning all obstacles in the boxGrid
   * @param level
   * @param rightAnswer
   */
  public updateBoxGrid(level: number, rightAnswer: number) {
    const obstaclesNumbersList = this.getObstaclesNumbers(level, rightAnswer);
    const holesNumbersList = obstaclesNumbersList.slice(12);
    const spiderNumbersList = obstaclesNumbersList.slice(0, 12);

    this.boxGrid.children.forEach((box) => {
      // @ts-ignore
      box.material.color.setHex(config.BOX_CONFIG.COLOR);

      if (holesNumbersList.includes(box.userData.boxNumber)) {
        box.userData.isHole = true;
        box.userData.hasSpider = false;
        // @ts-ignore
        box.material.color.setHex(config.BOX_CONFIG.HOLE_COLOR);
      } else if (spiderNumbersList.includes(box.userData.boxNumber)) {
        box.userData.hasSpider = true;
        box.userData.isHole = false;
      } else {
        box.userData.isHole = false;
        box.userData.hasSpider = false;
      }
    });
  }

  public getBoxGridGroup() {
    return this.boxGrid;
  }

  /**
   * Get obstacles numbers
   * @param level
   * @param rightAnswer
   * return {number[]} an array containing ramdom obstacles' numbers
   */
  public getObstaclesNumbers(level: number, rightAnswer: number) {
    const obstaclesQty = level * 12; // 12 obstacles per level
    const obstacleNumbersList: number[] = [];

    while (obstacleNumbersList.length < obstaclesQty) {
      const obstacleBoxNumber = Math.ceil(Math.random() * 99);
      if (
        obstacleBoxNumber !== rightAnswer &&
        !obstacleNumbersList.includes(obstacleBoxNumber)
      ) {
        obstacleNumbersList.push(obstacleBoxNumber);
      }
    }

    return obstacleNumbersList;
  }

  public getBoxInstance(
    rowPosition: number,
    obstaclesNumbersList: number[],
    isBoxInZ?: boolean,
    columnPosition?: number
  ) {
    const box = Box();
    const separator = -config.BOX_CONFIG.SEPARATOR;
    const boxNumber =
      isBoxInZ && columnPosition
        ? columnPosition * 10 + rowPosition
        : rowPosition;

    // The 12 firsts numbers become Spiders
    const spiderNumbersList = obstaclesNumbersList.slice(0, 12);
    const holesNumbersList = obstaclesNumbersList.slice(12);

    // Adding text to each Box
    const text = Text(String(boxNumber));
    box.add(text);
    box.userData.boxNumber = boxNumber;

    if (holesNumbersList.includes(boxNumber)) {
      box.userData.isHole = true;
      // @ts-ignore
      box.material.color.setHex(config.BOX_CONFIG.HOLE_COLOR);
    } else if (spiderNumbersList.includes(boxNumber)) {
      box.userData.hasSpider = true;
    }

    // positioning
    box.position.y = (box.geometry as any).parameters.height / 2;
    box.position.x =
      !isBoxInZ && rowPosition === 0 ? rowPosition : rowPosition * separator;
    if (isBoxInZ && columnPosition) {
      box.position.z = columnPosition * separator;
    }

    return box;
  }
}

export default BoxGrid;
