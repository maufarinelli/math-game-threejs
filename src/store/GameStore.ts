import { Intersection, Group, Object3D } from "three";
import Character from "../components/3D/Character/Character";
import ChallengeStore from "./ChallengeStore";
import config from "../config";
import { action, observable, computed, runInAction } from "mobx";
import BoxGrid from "../components/3D/Box/BoxGrid";
import Spider from "../components/3D/Spider/Spider";
import Coin from "../components/3D/Coin/Coin";

class GameStore {
  public selectedItem: Intersection | undefined;
  private character: Character | undefined;
  private boxGrid: BoxGrid | undefined;
  private spiders: Spider[] = [];
  public coin: Coin | undefined;

  @observable
  private _score: number;

  @observable
  private _level: number;

  @observable
  private _phase: number;

  @observable
  private _showForm: boolean;

  @observable
  private _isLevelCompleted: boolean;

  @observable
  private _isLevelNotCompletedSuccessfully: boolean;

  @observable
  private _isGameCompleted: boolean;

  public startingNewGame: boolean;

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

    this.startingNewGame = this._level === 1 && this._phase === 1;
    this._showForm = this.startingNewGame;

    this._isLevelCompleted = false;
    this._isLevelNotCompletedSuccessfully = false;
    this._isGameCompleted = false;
  }

  private highlightSelectedBox(intersection: Intersection, boxes: Object3D[]) {
    boxes.forEach((child) => {
      if (!child.userData.isHole) {
        // @ts-ignore
        child.material.color.set(config.BOX_CONFIG.COLOR);
      }
    });
    if (!intersection.object.userData.isHole) {
      // @ts-ignore
      intersection.object.material.color.setHex(
        config.BOX_CONFIG.LIGHTER_COLOR
      );
    }
  }

  @action
  private setSelectedBox(intersection: Intersection) {
    this.selectedItem = intersection;
  }

  public setCharacter(c: Character) {
    this.character = c;
  }

  public getCharacter() {
    return this.character;
  }

  public setBoxGrid(b: BoxGrid) {
    this.boxGrid = b;
  }

  public getBoxGrid() {
    return this.boxGrid;
  }

  public getBoxGridGroup(): Group {
    return this.boxGrid?.getBoxGridGroup() as Group;
  }

  public setSpiders(spider: Spider) {
    this.spiders.push(spider);
  }

  public animateSpider() {
    this.spiders.forEach((spider) => spider.spiderAnimation());
  }

  public setCoin(coin: Coin) {
    this.coin = coin;
  }

  public animateCoin() {
    this.coin?.coinAnimation();
  }

  public isMoveAllowed(currentSelectedItem: Intersection) {
    const selectedPosX = currentSelectedItem.object.position.x;
    const selectedPosZ = currentSelectedItem.object.position.z;
    if (!this.character) return false;

    const { x, z } = this.character.getPosition();
    return (
      (selectedPosX - x === -config.BOX_CONFIG.SEPARATOR ||
        selectedPosX - x === config.BOX_CONFIG.SEPARATOR ||
        selectedPosX - x === 0) &&
      (selectedPosZ - z === -config.BOX_CONFIG.SEPARATOR ||
        selectedPosZ - z === config.BOX_CONFIG.SEPARATOR ||
        selectedPosZ - z === 0)
    );
  }

  public selectBoxAction(intersection: Intersection, boxes: Object3D[]) {
    this.highlightSelectedBox(intersection, boxes);
    this.setSelectedBox(intersection);
    if (
      intersection.object.userData.isHole ||
      intersection.object.userData.hasSpider
    ) {
      this.setScoreDown();
      this.dispatchCharacterWrongMoveAction();
    }
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

  public dispatchCharacterWrongMoveAction() {
    this.character?.wrongMoveAction();
  }

  private setSessionStorage() {
    sessionStorage.setItem("game-score", String(this._score));
    sessionStorage.setItem("game-phase", String(this._phase));
    sessionStorage.setItem("game-level", String(this._level));
  }

  public hasScoreToGoNextLevel() {
    return (
      (this._level === 1 && this._score >= 7) ||
      (this._level === 2 && this._score >= 10)
    );
  }

  public hasNoScoreToGoNextLevel() {
    return (
      (this._level === 1 && this._score < 7) ||
      (this._level === 2 && this._score < 10) ||
      (this._level === 3 && this._score < 13)
    );
  }

  public hasScoreToFinishGame() {
    return this._level === 3 && this._score >= 13;
  }

  @action
  public setNextPhase() {
    this._phase++;
    this._isLevelCompleted = false;
    this._isLevelNotCompletedSuccessfully = false;
  }

  @action
  public setNextLevel() {
    this._isLevelCompleted = true;
    this._isLevelNotCompletedSuccessfully = false;
    this._score = 0;
    this._phase = 1;
    this._level++;
  }

  @action
  public setRestartSameLevel() {
    this._isLevelCompleted = true;
    this._isLevelNotCompletedSuccessfully = true;
    this._score = 0;
    this._phase = 1;
  }

  // Score
  @action
  public setScore(isRighAnswer: boolean) {
    if (isRighAnswer) {
      this._score = this._score + 3;
      const position = this.character?.getPosition();
      if (position) this.coin?.animate(position);
    }

    if (this._phase < 5) {
      this.setNextPhase();
    } else if (this.hasScoreToGoNextLevel()) {
      this.setNextLevel();
    } else if (this.hasNoScoreToGoNextLevel()) {
      this.setRestartSameLevel();
    } else if (this.hasScoreToFinishGame()) {
      this._isGameCompleted = true;
    }

    this.setSessionStorage();

    setTimeout(() => {
      runInAction(() => {
        this._showForm = true;
      });
    }, 1000);
  }

  @action
  public setScoreDown() {
    this._score--;
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

  public updateSpidersPosition() {
    const boxGrid = this.getBoxGridGroup()?.children;
    const boxWithSpiders = boxGrid?.filter((box) => box.userData.hasSpider);

    boxWithSpiders?.forEach((box, index) => {
      this.spiders[index].changeSpiderPosition(box.position);
    });
  }

  @action
  public handleStartClick() {
    this._showForm = false;
    this.startingNewGame = false;
  }

  @action
  public handleNextClick() {
    this._showForm = false;
    this.challengeStore.reinitialize();
    this.character?.changeCharacterPosition({ x: 0, y: 0, z: 0 });
    this.boxGrid?.updateBoxGrid(this.level, this.challengeStore.rightAnswer);
    this.updateSpidersPosition();
  }

  @action
  public handleRestartClick() {
    this._isLevelCompleted = false;
    this._isLevelNotCompletedSuccessfully = false;
    this._isGameCompleted = false;

    this._score = 0;
    this._level = 1;
    this._phase = 1;
    this.handleNextClick();

    sessionStorage.setItem("game-score", String(0));
    sessionStorage.setItem("game-phase", String(1));
    sessionStorage.setItem("game-level", String(1));
  }
}

export default GameStore;
