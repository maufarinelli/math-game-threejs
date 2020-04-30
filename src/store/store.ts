import ChallengeStore from "./ChallengeStore";
import GameStore from "./GameStore";

const challengeStore = new ChallengeStore();
const gameStore = new GameStore(challengeStore);

const store: any = {
  challengeStore,
  gameStore,
};

export default store;
