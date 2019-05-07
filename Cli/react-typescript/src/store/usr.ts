import { observable } from 'mobx';

class Store {
  @observable public usrname = 'muziqi';
}

export default new Store();
