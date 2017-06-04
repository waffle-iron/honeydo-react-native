import Expo from 'expo';
import React from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'mobx-react/native';
import { StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
// going with material for now
import material from './native-base-theme/variables/material';

import styles from './styles/AppContainer';
import RootNavigation from './navigation/RootNavigation';
import LoginScreen from './screens/LoginScreen';
import stores from './stores';

const iOS = Platform.OS === 'ios';

// app nav wrapper. users can be logged in or out, in which case they see the login
// view
const AppNavigator = StackNavigator({
  Login: {
    name: 'Login',
    screen: LoginScreen,
    description: 'Login screen',
    navigationOptions: {
      header: null,
    }
  },
  RootNavigation: {
    name: 'RootNavigation',
    screen: RootNavigation,
    description: 'Main app (once user logs in)'
  },
  Index: {
    screen: LoginScreen,
  },
}, {
  initialRouteName: 'Index',
  headerMode: 'none',
  /*
   * Use modal on iOS because the card mode comes from the right,
   * which conflicts with the drawer example gesture
   */
  mode: iOS ? 'modal' : 'card',
});

class AppContainer extends React.Component {
  state = {
    appIsReady: false,
  };

  componentWillMount() {
    this._loadNativeBaseFonts();
    // this._loadAssetsAsync();
  }

  async _loadNativeBaseFonts() {
    try {
      await Expo.Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      });
    } catch (e) {
      console.warn(
        'There was an error caching assets (see: main.js), perhaps due to a ' +
        'network timeout, so we skipped caching. Reload the app to try again.'
      );
      console.log(e.message);
    } finally {
      this.setState({ appIsReady: true });
    }
  }

  // async _loadAssetsAsync() {
  //   try {
  //     await cacheAssetsAsync({
  //       // images: [
  //       //   require('./assets/images/logoGloo.png'),
  //       //   require('./assets/images/logoGloo@2x.png'),
  //       //   require('./assets/images/logoGloo@3x.png'),
  //       // ],
  //       fonts: [
  //         FontAwesome.font,
  //         { 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf') },
  //       ],
  //     });
  //   } catch (e) {
  //     console.warn(
  //       'There was an error caching assets (see: main.js), perhaps due to a ' +
  //         'network timeout, so we skipped caching. Reload the app to try again.'
  //     );
  //     console.log(e.message);
  //   } finally {
  //     this.setState({ appIsReady: true });
  //   }
  // }

  render() {
    if (this.state.appIsReady) {
      return (
        <Provider { ...stores }>
          <StyleProvider style={ getTheme(material) }>
            <AppNavigator style={ styles.container } />
          </StyleProvider>
        </Provider>
      );
    } else {
      return <Expo.AppLoading />;
    }
  }
}

Expo.registerRootComponent(AppContainer);
