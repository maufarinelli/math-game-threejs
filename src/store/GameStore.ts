import { Intersection, Group } from "three";
import Character from "../components/3D/Character/Character";
import ChallengeStore from "./ChallengeStore";
import config from "../config";
import { action, observable, computed, runInAction } from "mobx";
import store from "./store";

class GameStore {
  private selectedItem: Intersection | undefined;
  private character: Character | undefined;

  @observable
  public _score: number;

  @observable
  public _level: number;

  @observable
  public _phase: number;

  @observable
  public _showForm: boolean;

  @observable
  public _isLevelCompleted: boolean;

  constructor(private challengeStore: ChallengeStore) {
    this._score = 0;
    this._level = 1;
    this._phase = 1;
    this._showForm = false;
    this._isLevelCompleted = false;
  }

  private highlightSelectedBox(intersection: Intersection, boxes: Group[]) {
    boxes.forEach(child => {
      // @ts-ignore
      child.material.color.set(config.BOX_CONFIG.COLOR);
    });
    // @ts-ignore
    intersection.object.material.color.setHex(config.BOX_CONFIG.LIGHTER_COLOR);
  }

  @action
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

    this.setScore(this.challengeStore.isRightAnswer);
  }

  // Score
  @action
  public setScore(isRighAnswer: boolean) {
    isRighAnswer ? this._score++ : this._score--;

    if (this._phase < 5) {
      this._phase++;
    } else {
      this._isLevelCompleted = true;
      this._phase = 1;
      this._level++;
    }

    setTimeout(() => {
      runInAction(() => {
        this._showForm = true;
      });
    }, 500);
  }

  @computed
  public get score() {
    return this._score;
  }

  @computed
  public get level() {
    return this._level;
  }

  @computed
  public get phase() {
    return this._phase;
  }

  @computed
  public get showForm() {
    return this._showForm;
  }

  @computed
  public get isLevelCompleted() {
    return this._isLevelCompleted;
  }

  @action
  public handleNextClick() {
    this._showForm = false;
    this.challengeStore.reinitialize();
    this.character?.changeCharacterPosition({ x: 0, y: 0, z: 0 });
  }
}

export default GameStore;
