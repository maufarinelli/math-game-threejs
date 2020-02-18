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

  @observable
  public _isLevelNotCompletedSuccessfully: boolean;

  @observable
  public _isGameCompleted: boolean;

  constructor(private challengeStore: ChallengeStore) {
    this._score = sessionStorage.getItem("game-score")
      ? Number(sessionStorage.getItem("game-score"))
      : 0;
    this._level = sessionStorage.getItem("game-level")
      ? Number(sessionStorage.getItem("game-level"))
      : 1;
    this._phase = sessionStorage.getItem("game-phase")
      ? Number(sessionStorage.getItem("game-phase"))
      : 1;
    this._showForm = false;
    this._isLevelCompleted = false;
    this._isLevelNotCompletedSuccessfully = false;
    this._isGameCompleted = false;
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

  private setSessionStorage() {
    sessionStorage.setItem("game-score", String(this._score));
    sessionStorage.setItem("game-phase", String(this._phase));
    sessionStorage.setItem("game-level", String(this._level));
  }

  // Score
  @action
  public setScore(isRighAnswer: boolean) {
    if (isRighAnswer) this._score++;

    if (this._phase < 5) {
      this._phase++;
      this._isLevelCompleted = false;
      this._isLevelNotCompletedSuccessfully = false;
    } else if (
      (this._level === 1 && this._score >= 3) ||
      (this._level === 2 && this._score >= 4)
    ) {
      this._isLevelCompleted = true;
      this._isLevelNotCompletedSuccessfully = false;
      this._score = 0;
      this._phase = 1;
      this._level++;
    } else if (
      (this._level === 1 && this._score < 3) ||
      (this._level === 2 && this._score < 4)
    ) {
      this._isLevelCompleted = true;
      this._isLevelNotCompletedSuccessfully = true;
      this._score = 0;
      this._phase = 1;
    } else if (this._level === 3 && this._score >= 5) {
      this._isGameCompleted = true;
    }

    this.setSessionStorage();

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

  @computed
  public get isLevelNotCompletedSuccessfully() {
    return this._isLevelNotCompletedSuccessfully;
  }

  @computed
  public get isGameCompleted() {
    return this._isGameCompleted;
  }

  @action
  public handleNextClick() {
    this._showForm = false;
    this.challengeStore.reinitialize();
    this.character?.changeCharacterPosition({ x: 0, y: 0, z: 0 });
  }

  @action
  public handleRestartClick() {
    this._showForm = false;
    this._isLevelCompleted = false;
    this._isLevelNotCompletedSuccessfully = false;
    this._isGameCompleted = false;

    this._score = 0;
    this._level = 1;
    this._phase = 1;
    this.challengeStore.reinitialize();
    this.character?.changeCharacterPosition({ x: 0, y: 0, z: 0 });

    sessionStorage.setItem("game-score", String(0));
    sessionStorage.setItem("game-phase", String(1));
    sessionStorage.setItem("game-level", String(1));
  }
}

export default GameStore;
