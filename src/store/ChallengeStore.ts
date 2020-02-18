import { action, computed, observable } from "mobx";

type TOperation = "+" | "-";

const operationsList: TOperation[] = ["+", "-"];

class ChallengeStore {
  @observable
  public userAnswer: number = 0;

  @observable
  public isPristine: boolean = true;

  @observable
  public _initialNumber: number = 0;

  @observable
  public _operation: string = "";

  @observable
  public _numberToCalculate: number = 0;

  constructor() {
    this.setInitialNumber();
    this.setOperation();
    this.setNumberToCalculate();
  }

  public setInitialNumber() {
    this._initialNumber = Math.floor(Math.random() * 100);
  }

  public setOperation() {
    if (this._initialNumber >= 50) {
      return (this._operation = operationsList[1]);
    }

    this._operation = operationsList[0];
  }

  public setNumberToCalculate() {
    if (this._initialNumber >= 50) {
      this._numberToCalculate = Math.floor(
        Math.random() * (this._initialNumber - 1)
      );
    } else {
      this._numberToCalculate = Math.floor(Math.random() * 50);
    }
  }

  @computed
  public get initialNumber() {
    return this._initialNumber;
  }

  @computed
  public get operation() {
    return this._operation;
  }

  @computed
  public get numberToCalculate() {
    return this._numberToCalculate;
  }

  public add(a: number, b: number) {
    return a + b;
  }

  public substract(a: number, b: number) {
    return a - b;
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
  public setUserAswer(answer: string) {
    this.isPristine = false;
    this.userAnswer = parseInt(answer, 10);
  }

  @action
  public reinitialize() {
    this.userAnswer = 0;
    this.isPristine = true;
    this.setInitialNumber();
    this.setOperation();
    this.setNumberToCalculate();
  }
}

export default ChallengeStore;
