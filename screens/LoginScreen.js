import React, { Component } from 'react';
import config from '../config';
import {
  Platform,
  View,
  Dimensions,
  Image,
} from 'react-native';
import { inject, observer } from 'mobx-react/native';
import { NavigationActions } from 'react-navigation';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  FooterTab,
  Footer,
  Icon,
  Text,
  Toast,
} from 'native-base';
import FullPageSpinner from '../components/FullPageSpinner';

const { height, width } = Dimensions.get('window');

@inject('auth') @inject('notifications') @observer
export default class LoginScreen extends Component {

  state = {
    username: '',
    password: '',
    email: '',
    isRegistering: false,
    isFetching: false,
  }

  // LEFT OFF HERE: figure out why navigating to the root nav is not working on successful login
  componentWillMount() {
    // if user is logged in, push them into app
    if (this.props.auth.isAuthenticated) {
      console.log('Object.keys(this.props)', Object.keys(this.props));
      console.log('we should be going to lists')
      
      this.props.navigation.navigate('rootNavigation');
    }
  }
  // mobx lifecyle hook
  componentWillReact() {
    if (this.props.auth.isAuthenticated) {
      console.log('Object.keys(this.props)', Object.keys(this.props));
      console.log('we should be going to lists')
      
      this.props.navigation.navigate('rootNavigation');
    }
  }

  async _submit() {
    const { username, email, password, isRegistering } = this.state;
    const { register, login } = this.props.auth;
    // show spinner
    this.setState({ isFetching: true });
    
    let error;
    const action = isRegistering ? register : login;
    const user = {
      username,
      password,
      email,
    };

    let err;
    if (isRegistering) {
      console.log('sending to register', user);
      err = await this.props.auth.register(user);
    } else {
      console.log('login', user)
      err = await this.props.auth.login(user);
    }

    // hide spinner
    this.setState({ isFetching: false });

    if (err) {
      return;
    } else {
      console.log('we should be going to the list screen')
      this.props.navigation.navigate('rootNavigation');
    }
  }

  componentWillReact() {
    const { message } = this.props.notifications;
    if (!!message) {
      const { text, duration, type } = message;
      Toast.show({
        text,
        duration,
        type,
      });
    }
  }

  navigate() {
    this.props.navigation.navigate('RootNavigation');
  }

  render() {
    const { isRegistering, isFetching } = this.state;

    return (
      <Container>
        <FullPageSpinner visible={ isFetching } />
        <Content padder contentContainerStyle={ { alignItems: 'center', justifyContent: 'center', flex: 1 } }>
          {/* <View>
              <Image
                style={ {
                  flex: 1,
                  width: (width - 204),
                  height: 200,
                  resizeMode: 'contain',
                } }
                source={ require('../assets/images/logoGloo.png') }
              />
            </View> */}
            {
              isRegistering &&
              <Item floatingLabel style={ { marginBottom: 16 } }>
                <Label style={ { color: 'rgb(138, 138, 138)' } }>email</Label>
                <Input
                  onChangeText={ email => this.setState({ email }) }
                  value={ this.state.email }
                  autoCorrect={ false }
                  autoCapitalize={ 'none' }
                />
              </Item>
            }
            <Item floatingLabel style={ { marginBottom: 16 } }>
              <Label style={ { color: 'rgb(138, 138, 138)' } }>username</Label>
              <Input
                onChangeText={ username => this.setState({ username }) }
                value={ this.state.username }
                autoCorrect={ false }
                autoCapitalize={ 'none' }
              />
            </Item>
            <Item floatingLabel style={ { marginBottom: 36 } }>
              <Label style={ { color: 'rgb(138, 138, 138)'} }>password</Label>
              <Input
                secureTextEntry={ true }
                onChangeText={ password => this.setState({ password }) }
                value={ this.state.password } />
            </Item>
            <Button
              primary
              full
              onPress={ () => this._submit() }
            >
              <Text>{ isRegistering ? 'Create Account' : 'Sign In' }</Text>
            </Button>
            {
              !isRegistering &&
              <Button
                full
                transparent
                primary
                onPress={ () => console.log('Forgot Password') }
                >
                <Text>Forgot Password?</Text>
              </Button>
            }
            <View style={ { position: 'absolute', bottom: 0, right: 0, left: 0, alignItems: 'center', justifyContent: 'center' } }>
              <Button
                primary
                transparent
                full
                onPress={ () => this.setState({ isRegistering: !isRegistering }) }
                >
                  <Text>{ isRegistering ? 'Sign in' : 'Need to Create An Account?' }</Text>
                </Button>
            </View>
        </Content>
      </Container>
    );
  }
}
