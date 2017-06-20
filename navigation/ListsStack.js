import React from 'react';
import { StackNavigator } from 'react-navigation';

import ListsScreen from '../screens/ListsScreen';
import ListDetail from '../screens/ListDetail';

const ListsStack = StackNavigator({
  Lists: {
    name: 'Lists',
    screen: ListsScreen,
    navigationOptions: {
      title: 'Lists',
      // prevent header from being pulled down to show login view
      gesturesEnabled: false,
    },
  },
  ListDetail: {
    name: 'ListDetail',
    screen: ListDetail,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name}`,
      // makes the back button orange and the title almost black
      headerTintColor: '#F26419',
      headerTitleStyle: {
        color: null,
      },
    }),
  },
});

export default ListsStack;
