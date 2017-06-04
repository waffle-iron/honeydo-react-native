import { observable, action, computed } from 'mobx';

class Lists {
  @observable lists = [];
};

export default new Lists();
