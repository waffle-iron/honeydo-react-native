import { observable, action, computed } from 'mobx';

class Auth {
  @observable isLoggedIn = false;
  @observable profile = {
    username: 'test_user',
    name: 'Test User',
    image_url: null,
  };
};

export default new Auth();
