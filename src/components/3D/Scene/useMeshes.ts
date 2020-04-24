import { Mesh, Scene, Group } from "three";
import { useContext } from "react";
import StoreContext from "../../../store/context";
import BoxGrid from "../Box/BoxGrid";
import Spider from "../Spider/Spider";
import Coin from "../Coin/Coin";

const useMeshes = (scene: Scene) => {
  const { challengeStore, gameStore } = useContext(StoreContext);

  const addPlaneToScene = (plane: Mesh) => {
    scene.add(plane);
  };

  const addBoxGridToScene = () => {
    const boxGrid = new BoxGrid(
      10,
      gameStore.level,
      challengeStore.rightAnswer
    );
    const boxGridGroup = boxGrid.getBoxGridGroup();
    scene.add(boxGridGroup);

    gameStore.setBoxGrid(boxGrid);
  };

  const addSpidersToScene = () => {
    const boxGrid: Group = gameStore.getBoxGridGroup();

    boxGrid.children.forEach((box) => {
      if (box.userData.hasSpider) {
        const position = {
          x: box.position.x,
          z: box.position.z,
        };
        const spiderInstance = new Spider(scene, position);
        gameStore.setSpiders(spiderInstance);
      }
    });
  };

  const addCoinToScene = () => {
    const coinInstance = new Coin(scene);
    gameStore.setCoin(coinInstance);
  };

  const addCharacterToScene = (Character: any) => {
    let character = gameStore.getCharacter();

    if (!character) {
      character = new Character(scene);
      gameStore.setCharacter(character);
    }
  };

  return {
    addPlaneToScene,
    addBoxGridToScene,
    addSpidersToScene,
    addCoinToScene,
    addCharacterToScene,
  };
};

export default useMeshes;
