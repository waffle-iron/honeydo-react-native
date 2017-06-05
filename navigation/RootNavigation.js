import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import { Icon } from 'native-base';

import ListsStack from '../navigation/ListsStack';
import MeScreen from '../screens/MeScreen';

const RootNavigation = TabNavigator({
  Lists: {
    name: 'Lists',
    screen: ListsStack,
    navigationOptions: {
      title: 'Lists',
      tabBarLabel: 'Lists',
      tabBarIcon: ({ tintColor }) => <Icon name="ios-list" style={ { color: tintColor} } />,
    },
  },
  Me: {
    name: 'Me',
    screen: MeScreen,
    navigationOptions: {
      title: 'Me',
      tabBarLabel: 'Me',
      tabBarIcon: ({ tintColor }) => <Icon name="ios-person" style={ { color: tintColor } } />,
    },
  },
}, {
  initialRouteName: 'Lists',
  // headerMode: 'screen',
});

export default RootNavigation;
