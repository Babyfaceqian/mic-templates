import { observable } from 'mobx';

class mainState {
  // 被观察者
  @observable name;
  constructor() {
    this.name = '浮云先生'
  }
}
const main = new mainState();
export default main;
