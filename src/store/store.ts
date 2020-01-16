import ChallengeStore from "./ChallengeStore";
import UIStore from "./UIStore";
import CharacterStore from "./CharacterStore";

const store = {
  challengeStore: new ChallengeStore(),
  uiStore: new UIStore(),
  characterStore: new CharacterStore()
};

export default store;
