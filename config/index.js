import Expo from 'expo';

import development from './development';
import production from './production';

const env = __DEV__ ?
  development : production;

const config = {}

export default Object.assign(config, env);