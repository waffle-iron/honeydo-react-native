import { observable, action, computed } from 'mobx';
import config from '../config';
import Notifications from './Notifications';
import { setStoredAuthState, removeStoredAuthState, ID_TOKEN, PROFILE } from '../utils/auth';

class Auth {
  @observable isAuthenticated = false;
  @observable profile = {
    id: null,
    username: null,
    email: null,
    image_url: null,
  };

  @action async register(user) {
    try {
      const res = await fetch(`${config.honeyDoAPI}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user }),
      }).then(r => r.json()).catch(e => e);

      console.log('register response', res)

      const { token, data } = res;
      const authenticatedUser = data[0];
      await setStoredAuthState({
        idToken: token,
        profile: authenticatedUser,
      });

      this.user = {
        ...authenticatedUser,
      }
      this.isAuthenticated = true;

      return null;
    } catch(e) {
      console.log('Err - Register', e);
      return e;
    }
  }

  @action async login(user) {
    try {
      const res = await fetch(`${config.honeyDoAPI}/login`, {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user }),
      }).then(r => r.json());

      const { message, data } = res;
      await setStoredAuthState({
        idToken: token,
        profile: data.user,
      });

      this.profile = {
        ...data.user,
      };
      this.isAuthenticated = true;

      return null;
    } catch(e) {
      console.log('ERR - Login', e);
      return;
    }
  }
};

export default new Auth();
