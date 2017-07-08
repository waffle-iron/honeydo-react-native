import { observable, action, computed } from 'mobx';

class Notifications {
  @observable message = null;

  @action resetStore() {
    this.message = null;
  }

  @action setMessage(body, type) {
    this.message = {
      body,
      type,
    };
  }
};

export default new Notifications();