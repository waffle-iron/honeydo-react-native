import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import {
  Container,
  Icon,
} from 'native-base';
import { inject, observer } from 'mobx-react/native';

import ListsStack from '../navigation/ListsStack';
import MeScreen from '../screens/MeScreen';

const Navigator = TabNavigator({
  Lists: {
    name: 'Lists',
    screen: ListsStack,
    navigationOptions: {
      title: 'Lists',
      tabBarLabel: 'Lists',
      tabBarIcon: ({ tintColor }) => <Icon name="ios-list" style={ { color: tintColor } } />,
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
  tabBarOptions: {
    initialRouteName: 'Lists',
    lazy: true,
    animationEnabled: true,
    activeTintColor: '#F26419',
  }
});

@inject('auth') @observer
export default class RootNavigation extends Component {
  componentWillReact() {
    console.log('this.props.auth.isAuthenticated', this.props.auth.isAuthenticated);
    
    if (!this.props.auth.isAuthenticated) this.props.navigation.navigate('login');
  }

  render() {
    // HACK for mobx to force this to fire
    const { isAuthenticated } = this.props.auth;
    console.log('isAuthenticated', isAuthenticated);
    
    <Container>
      <Navigator />
    </Container>
  }
};
