import { observable, action, computed } from 'mobx';

class Contacts {
  @observable users = [];
};

export default new Contacts();
