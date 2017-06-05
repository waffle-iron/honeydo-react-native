import { observable, action, computed } from 'mobx';
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
};

export default new Lists();
