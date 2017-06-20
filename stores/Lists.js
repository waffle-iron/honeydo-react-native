import { observable, action, computed } from 'mobx';
import _ from 'lodash';
import Fakerator from 'fakerator';

const { lorem, internet, date, names, misc } = Fakerator();

const testListsObj = {};
const testLists = [];
let i = 0;
while (i < 20) {
  const list = {
    id: misc.uuid(),
    name: lorem.word(),
    items: [],
    users: [],
  };
  let j = 0;
  while (j < 5) {
    const username = internet.userName();
    const item = {
      id: misc.uuid(),
      text: lorem.sentence(),
      username,
      created_at: date.recent(),
      isCompleted: false,
    };
    const user = {
      username,
      firstName: names.firstName(),
      lastName: names.lastName(),
      email: internet.email(),
    };
    list.items.push(item);
    list.users.push(user);
    j++
  }
  testLists.push(list);
  i++
}

class Lists {
  @observable lists = testLists;
  @observable listsObj = testListsObj;

  @action async fetchLists() {
    await setTimeout( () => this.lists, 3000)
  }

  @action toggleCompleted(listId, itemId) {
    const listIndex = _.findIndex(this.lists, list => _.isEqual(list.id, listId));
    console.log('listIndex', listIndex);
    console.log('this.lists.keys', Object.keys(this.lists[listIndex]));
    const itemIndex = _.findIndex(this.lists[listIndex].items, task => _.isEqual(task.id, itemId));
    console.log('itemIndex', itemIndex);
    this.lists[listIndex].items[itemIndex].isCompleted = !this.lists[listIndex].items[itemIndex].isCompleted
  }
};

export default new Lists();
