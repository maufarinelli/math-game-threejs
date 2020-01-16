import { action, computed, observable } from "mobx";

type TOperation = "+" | "-";

const operationsList: TOperation[] = ["+", "-"];

class ChallengeStore {
  @observable
  public userAnswer: number = 0;

  @observable
  public isPristine: boolean = true;

  @computed
  public get initialNumber() {
    return Math.floor(Math.random() * 100);
  }

  @computed
  public get operation() {
    if (this.initialNumber >= 50) {
      return operationsList[1];
    }

    return operationsList[0];
  }

  @computed
  public get numberToCalculate() {
    if (this.initialNumber >= 50) {
      return Math.floor(Math.random() * (this.initialNumber - 1));
    } else {
      return Math.floor(Math.random() * (this.initialNumber - 1)) + 50;
    }
  }

  public add(a: number, b: number) {
    return a + b;
  }

  public substract(a: number, b: number) {
    return a + b;
  }

  @computed
  public get rightAnswer() {
    if (this.operation === "+") {
      return this.add(this.initialNumber, this.numberToCalculate);
    } else {
      return this.substract(this.initialNumber, this.numberToCalculate);
    }
  }

  @computed
  public get isRightAnswer() {
    return this.userAnswer === this.rightAnswer;
  }

  @action
  setUserAswer(answer: string) {
    this.isPristine = false;
    this.userAnswer = parseInt(answer, 10);
  }
}

export default ChallengeStore;
