import ChallengeStore from "./ChallengeStore";

describe("Challenge Store", () => {
  it("should set the game", () => {
    const challengeStore = new ChallengeStore();

    expect(challengeStore.initialNumber).toBeDefined();
    if (challengeStore.initialNumber >= 50) {
      expect(challengeStore.operation).toEqual("-");
      expect(challengeStore.numberToCalculate).toBeLessThan(
        challengeStore.initialNumber
      );
    } else {
      expect(challengeStore.operation).toEqual("+");
      expect(challengeStore.numberToCalculate).toBeLessThan(50);
    }
  });

  it("should set the right answer", () => {
    const {
      operation,
      rightAnswer,
      initialNumber,
      numberToCalculate,
    } = new ChallengeStore();

    if (operation === "+") {
      expect(rightAnswer).toEqual(initialNumber + numberToCalculate);
    } else {
      expect(rightAnswer).toEqual(initialNumber - numberToCalculate);
    }
  });

  it("should set user answer", () => {
    const challengeStore = new ChallengeStore();
    expect(challengeStore.userAnswer).toEqual(0);
    expect(challengeStore.isPristine).toBeTruthy();

    challengeStore.setUserAswer("20");

    expect(challengeStore.userAnswer).toEqual(20);
    expect(challengeStore.isPristine).toBeFalsy();
  });

  it("should reinitialize the challenge", () => {
    const challengeStore = new ChallengeStore();

    challengeStore.setUserAswer("20");

    expect(challengeStore.userAnswer).toEqual(20);
    expect(challengeStore.isPristine).toBeFalsy();

    challengeStore.reinitialize();

    expect(challengeStore.userAnswer).toEqual(0);
    expect(challengeStore.isPristine).toBeTruthy();
  });
});
