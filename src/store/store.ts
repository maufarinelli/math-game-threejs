import ChallengeStore from "./ChallengeStore";
import GameStore from "./GameStore";

const store: any = {
  challengeStore: new ChallengeStore()
};
store.gameStore = new GameStore(store.challengeStore);

export default store;
