import { action, computed, observable, observe, runInAction } from "mobx";

type TOperation = "+" | "-";

const operationsList = ["+", "-"];

class ChallengeStore {
  @observable
  public userAnswer: number = 0;

  @computed
  public get initialNumber() {
    return Math.floor(Math.random() * 100);
  }

  @computed
  public get numberToCalculate() {
    return Math.floor(Math.random() * 100);
  }

  @computed
  public get operation() {
    const index = Math.floor(Math.random() * 2);

    return operationsList[index];
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
}
