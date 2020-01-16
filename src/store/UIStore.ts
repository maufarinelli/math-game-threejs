import { action, computed, observable } from "mobx";

class UIStore {
  @observable
  public showText: boolean = true;

  @computed
  public get textVisibity() {
    return this.showText;
  }

  @action
  toggleTextVisibility() {
    this.showText = !this.showText;
  }
}

export default UIStore;
