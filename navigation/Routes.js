// NOTE::: might go this way in the future, for now just putting routes directly
// in RootNavigation
import ListsScreen from '../screens/ListsScreen';
import MeScreen from '../screens/MeScreen';
import { Icon } from 'native-base';

export default {
  Lists: {
    name: 'List Screen',
    screen: ListsScreen,
    description: 'Overview of all of a user\'s lists',
  },
  Me: {
    name: 'User\'s Profile Page',
    screen: MeScreen,
    description: 'Place where user can see and change their profile',
  },
};
