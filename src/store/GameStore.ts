import { Intersection, Group } from "three";
import Character from "../components/3D/Character/Character";
import ChallengeStore from "./ChallengeStore";
import config from "../config";

class GameStore {
  private selectedItem: Intersection | undefined;
  private character: Character | undefined;

  constructor(private challengeStore: ChallengeStore) {}

  private highlightSelectedBox(intersection: Intersection, boxes: Group[]) {
    boxes.forEach(child => {
      // @ts-ignore
      child.material.color.set(config.BOX_CONFIG.COLOR);
    });
    // @ts-ignore
    intersection.object.material.color.setHex(config.BOX_CONFIG.LIGHTER_COLOR);
  }

  private setSelectedBox(intersection: Intersection) {
    this.selectedItem = intersection;
  }

  public setCharacter(c: Character) {
    this.character = c;
  }

  public selectBoxAction(intersection: Intersection, boxes: Group[]) {
    this.highlightSelectedBox(intersection, boxes);
    this.setSelectedBox(intersection);
  }

  public dispatchCharacterJumpAction() {
    if (this.selectedItem) this.character?.jumpAction(this.selectedItem);
  }

  public dispatchCharacterDigAction() {
    if (this.selectedItem) this.character?.dig(this.selectedItem);

    this.challengeStore.setUserAswer(
      String(this.selectedItem?.object.userData.boxNumber)
    );
  }
}

export default GameStore;
