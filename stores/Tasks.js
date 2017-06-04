import { observable, action, computed } from 'mobx';

class Tasks {
  @observable tasks = [];
};

export default new Tasks();
