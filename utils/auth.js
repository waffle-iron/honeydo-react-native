
import { AsyncStorage } from 'react-native';

export const If = ({ cond, children }) => cond ? children : null;

export const ID_TOKEN = 'id_token';
export const PROFILE = 'profile';

export const setStoredAuthState = async function({ idToken, profile }) {
  return Promise.all([
    await AsyncStorage.setItem(ID_TOKEN, idToken),
    await AsyncStorage.setItem(PROFILE, JSON.stringify(profile)),
  ]);
};

export const removeStoredAuthState = async function() {
  return Promise.all([
    await AsyncStorage.removeItem(ID_TOKEN),
    await AsyncStorage.removeItem(PROFILE),
  ]);
};