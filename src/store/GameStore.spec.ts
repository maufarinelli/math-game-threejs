import GameStore from "./GameStore";
import ChallengeStore from "./ChallengeStore";
import { Scene, Group } from "three";
import Character from "../components/3D/Character/Character";
import {
  allowedIntersection,
  notAllowedIntersection,
  intersectionWithHole,
} from "../../mocks/intersection";
import {
  box1,
  boxHole,
  boxWithSpider1,
  boxWithSpider2,
  boxWithSpider3,
} from "../../mocks/boxes";
import Coin from "../components/3D/Coin/Coin";
import BoxGrid from "../components/3D/Box/BoxGrid";
import Spider from "../components/3D/Spider/Spider";

describe("Game Store", () => {
  const challengeStore = new ChallengeStore();
  const scene = new Scene();
  const character = new Character(scene);

  afterEach(() => {
    window.sessionStorage.removeItem("game-score");
    window.sessionStorage.removeItem("game-level");
    window.sessionStorage.removeItem("game-phase");
  });

  it("should start new game when there is no game data saved in the sessionStorage", () => {
    const gameStore = new GameStore(challengeStore);

    expect(gameStore.score).toBe(0);
    expect(gameStore.level).toBe(1);
    expect(gameStore.phase).toBe(1);

    expect(gameStore.startingNewGame).toBeTruthy();
    expect(gameStore.showForm).toBeTruthy();

    expect(gameStore.isLevelCompleted).toBeFalsy();
    expect(gameStore.isLevelNotCompletedSuccessfully).toBeFalsy();
    expect(gameStore.isGameCompleted).toBeFalsy();
  });

  it("should continue the game when there is game data saved in the sessionStorage", () => {
    window.sessionStorage.setItem("game-score", "3");
    window.sessionStorage.setItem("game-level", "2");
    window.sessionStorage.setItem("game-phase", "4");

    const gameStore = new GameStore(challengeStore);

    expect(gameStore.score).toBe(3);
    expect(gameStore.level).toBe(2);
    expect(gameStore.phase).toBe(4);

    expect(gameStore.startingNewGame).toBeFalsy();
    expect(gameStore.showForm).toBeFalsy();

    expect(gameStore.isLevelCompleted).toBeFalsy();
    expect(gameStore.isLevelNotCompletedSuccessfully).toBeFalsy();
    expect(gameStore.isGameCompleted).toBeFalsy();
  });

  it("should check if move is allowed", () => {
    const gameStore = new GameStore(challengeStore);
    gameStore.setCharacter(character);

    const isAllowed = gameStore.isMoveAllowed(allowedIntersection as any);

    expect(isAllowed).toBeTruthy();
  });

  it("should check if move is not allowed", () => {
    const gameStore = new GameStore(challengeStore);
    gameStore.setCharacter(character);

    const isAllowed = gameStore.isMoveAllowed(notAllowedIntersection as any);

    expect(isAllowed).toBeFalsy();
  });

  it("should select box clicked", () => {
    const gameStore = new GameStore(challengeStore);
    const group = new Group();
    group.add(box1);
    group.add(boxHole);

    const spyIntersection = jest.spyOn(
      // @ts-ignore
      allowedIntersection.object.material.color,
      "setHex"
    );
    // @ts-ignore
    const spyBox1 = jest.spyOn(box1.material.color, "set");

    gameStore.selectBoxAction(allowedIntersection as any, group.children);

    expect(spyIntersection).toHaveBeenCalledWith("0xA5CA8E");
    expect(spyBox1).toHaveBeenCalledWith(0x6aa843);
    expect(gameStore.selectedItem).toEqual(allowedIntersection);
  });

  it("should selec box click which is an obstacle", () => {
    const gameStore = new GameStore(challengeStore);
    gameStore.setScore(true);
    const group = new Group();
    group.add(box1);
    group.add(boxHole);

    const spyDispatch = jest.spyOn(
      gameStore,
      "dispatchCharacterWrongMoveAction"
    );

    gameStore.selectBoxAction(intersectionWithHole as any, group.children);

    expect(gameStore.selectedItem).toEqual(intersectionWithHole);

    expect(gameStore.score).toBe(2);
    expect(spyDispatch).toHaveBeenCalled();
  });

  it("should dispatch character dig action", () => {
    const gameStore = new GameStore(challengeStore);
    const group = new Group();
    group.add(box1);
    group.add(boxHole);

    const spySetAnswer = jest.spyOn(challengeStore, "setUserAswer");
    const spySetScore = jest.spyOn(gameStore, "setScore");
    const clickedBoxNumber = allowedIntersection.object.userData.boxNumber;

    gameStore.selectBoxAction(allowedIntersection as any, group.children);
    gameStore.dispatchCharacterDigAction();

    expect(spySetAnswer).toHaveBeenCalledWith(String(clickedBoxNumber));
    expect(spySetScore).toHaveBeenCalledWith(challengeStore.isRightAnswer);
  });

  it("should set score when user give the right answer", () => {
    const gameStore = new GameStore(challengeStore);
    const coinInstance = new Coin(scene);
    gameStore.setCoin(coinInstance);
    gameStore.setCharacter(character);

    expect(gameStore.score).toBe(0);
    expect(gameStore.phase).toBe(1);

    const spyCoinAnimate = jest.spyOn(gameStore.coin as Coin, "animate");
    gameStore.setScore(true);

    expect(gameStore.score).toBe(3);
    expect(gameStore.phase).toBe(2);
    expect(spyCoinAnimate).toHaveBeenCalledWith({ x: 0, z: 0 });

    expect(window.sessionStorage.getItem("game-score")).toBe("3");
    expect(window.sessionStorage.getItem("game-phase")).toBe("2");
  });

  it("should set next level when user give the right answer", () => {
    const gameStore = new GameStore(challengeStore);
    const coinInstance = new Coin(scene);
    gameStore.setCoin(coinInstance);
    gameStore.setCharacter(character);

    gameStore.setScore(true);
    gameStore.setScore(true);
    gameStore.setScore(true);
    gameStore.setScore(true);
    gameStore.setScore(true);

    expect(gameStore.score).toBe(0);
    expect(gameStore.phase).toBe(1);
    expect(gameStore.level).toBe(2);

    expect(window.sessionStorage.getItem("game-score")).toBe("0");
    expect(window.sessionStorage.getItem("game-phase")).toBe("1");
    expect(window.sessionStorage.getItem("game-level")).toBe("2");
  });

  it("should restart same level when user give the right answer", () => {
    const gameStore = new GameStore(challengeStore);
    const coinInstance = new Coin(scene);
    gameStore.setCoin(coinInstance);
    gameStore.setCharacter(character);

    gameStore.setScore(true);
    gameStore.setScore(false);
    gameStore.setScore(false);
    gameStore.setScore(false);
    gameStore.setScore(true);

    expect(gameStore.score).toBe(0);
    expect(gameStore.phase).toBe(1);
    expect(gameStore.level).toBe(1);

    expect(window.sessionStorage.getItem("game-score")).toBe("0");
    expect(window.sessionStorage.getItem("game-phase")).toBe("1");
    expect(window.sessionStorage.getItem("game-level")).toBe("1");
  });

  it("should set end of the game when user give the right answer", () => {
    window.sessionStorage.setItem("game-score", "13");
    window.sessionStorage.setItem("game-level", "3");
    window.sessionStorage.setItem("game-phase", "5");

    const gameStore = new GameStore(challengeStore);
    const coinInstance = new Coin(scene);
    gameStore.setCoin(coinInstance);
    gameStore.setCharacter(character);

    expect(gameStore.isGameCompleted).toBeFalsy();

    gameStore.setScore(true);

    expect(gameStore.isGameCompleted).toBeTruthy();
  });

  it("should update the spider's position", () => {
    const gameStore = new GameStore(challengeStore);
    const boxGrid = new BoxGrid(
      10,
      gameStore.level,
      challengeStore.rightAnswer
    );
    gameStore.setBoxGrid(boxGrid);

    const boxesWithSpiders1 = boxGrid
      .getBoxGridGroup()
      .children.filter((box) => {
        const spiderInstance = new Spider(scene, box.position);
        gameStore.setSpiders(spiderInstance);

        return box.userData.hasSpider;
      })
      .map((box) => box.userData);

    boxGrid.updateBoxGrid(1, 50);
    gameStore.updateSpidersPosition();

    const boxesWithSpiders2 = boxGrid
      .getBoxGridGroup()
      .children.filter((box) => {
        return box.userData.hasSpider;
      })
      .map((box) => box.userData);

    expect(boxesWithSpiders1).not.toEqual(boxesWithSpiders2);
  });

  it("should start game", () => {
    const gameStore = new GameStore(challengeStore);
    expect(gameStore.showForm).toBeTruthy();
    expect(gameStore.startingNewGame).toBeTruthy();

    gameStore.handleStartClick();

    expect(gameStore.showForm).toBeFalsy();
    expect(gameStore.startingNewGame).toBeFalsy();
  });

  it("should go to next phase", () => {
    const gameStore = new GameStore(challengeStore);
    gameStore.setCharacter(character);
    const boxGrid = new BoxGrid(
      10,
      gameStore.level,
      challengeStore.rightAnswer
    );
    gameStore.setBoxGrid(boxGrid);
    boxGrid.getBoxGridGroup().children.forEach((box) => {
      const spiderInstance = new Spider(scene, box.position);
      gameStore.setSpiders(spiderInstance);
    });

    const spyReinitialize = jest.spyOn(challengeStore, "reinitialize");
    const spyCharacter = jest.spyOn(character, "changeCharacterPosition");
    const spyBoxGrid = jest.spyOn(boxGrid, "updateBoxGrid");
    const spySpidersPosition = jest.spyOn(gameStore, "updateSpidersPosition");

    gameStore.setScore(true);
    expect(gameStore.showForm).toBeTruthy();

    gameStore.handleNextClick();

    expect(gameStore.showForm).toBeFalsy();
    expect(spyReinitialize).toHaveBeenCalled();
    expect(spyCharacter).toHaveBeenCalledWith({ x: 0, y: 0, z: 0 });
    expect(spyBoxGrid).toHaveBeenCalled();
    expect(spySpidersPosition).toHaveBeenCalled();
  });

  it("should restart game", () => {
    const gameStore = new GameStore(challengeStore);
    gameStore.setCharacter(character);
    const boxGrid = new BoxGrid(
      10,
      gameStore.level,
      challengeStore.rightAnswer
    );
    gameStore.setBoxGrid(boxGrid);
    boxGrid.getBoxGridGroup().children.forEach((box) => {
      const spiderInstance = new Spider(scene, box.position);
      gameStore.setSpiders(spiderInstance);
    });

    const spyReinitialize = jest.spyOn(challengeStore, "reinitialize");
    const spyCharacter = jest.spyOn(character, "changeCharacterPosition");
    const spyBoxGrid = jest.spyOn(boxGrid, "updateBoxGrid");
    const spySpidersPosition = jest.spyOn(gameStore, "updateSpidersPosition");

    gameStore.setScore(true);
    gameStore.setScore(true);
    expect(gameStore.showForm).toBeTruthy();

    gameStore.handleRestartClick();

    expect(gameStore.isLevelCompleted).toBeFalsy();
    expect(gameStore.isLevelNotCompletedSuccessfully).toBeFalsy();
    expect(gameStore.isGameCompleted).toBeFalsy();

    expect(gameStore.score).toBe(0);
    expect(gameStore.level).toBe(1);
    expect(gameStore.phase).toBe(1);

    expect(gameStore.showForm).toBeFalsy();
    expect(spyReinitialize).toHaveBeenCalled();
    expect(spyCharacter).toHaveBeenCalledWith({ x: 0, y: 0, z: 0 });
    expect(spyBoxGrid).toHaveBeenCalled();
    expect(spySpidersPosition).toHaveBeenCalled();

    expect(window.sessionStorage.getItem("game-score")).toBe("0");
    expect(window.sessionStorage.getItem("game-level")).toBe("1");
    expect(window.sessionStorage.getItem("game-phase")).toBe("1");
  });
});
