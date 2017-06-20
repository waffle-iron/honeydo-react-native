import React, { Component } from 'react';
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
  Text
} from 'native-base';
const { height, width } = Dimensions.get('window');

@inject(['auth']) @observer
export default class LoginScreen extends Component {

  state = {
    username: '',
    password: ''
  }

  componentWillMount() {
    // if user is logged in, push them into app
    if(this.props.auth.isLoggedIn) {
      this.props.navigator.navigate('RootNavigation');
    }
  }
  // mobx lifecyle hook
  componentWillReact() {
    if(this.props.auth.isLoggedIn) {
      this.props.navigator.navigate('RootNavigation');
    }
  }

  // focusNextField(nextField) {
  //   this.refs[nextField].focus();
  // };

  // submit() {
  //   this.props.auth.createUser({
  //     ...this.state,
  //   });
  // }

  navigate() {
    this.props.navigation.navigate('RootNavigation');
  }

  render() {
    return (
      <Container>
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
            <Item floatingLabel style={ { marginBottom: 16 } }>
              <Label style={ { color: 'rgb(138, 138, 138)' } }>email</Label>
              <Input
                onChangeText={ username => this.setState({ username }) }
                value={ this.state.username } />
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
              onPress={ () => this.navigate()}
            >
              <Text>Sign In</Text>
            </Button>
            <Button
              full
              transparent
              primary
              onPress={ () => console.log('Forgot Password') }
            >
              <Text>Forgot Password?</Text>
            </Button>
            <View style={ { position: 'absolute', bottom: 0, right: 0, left: 0, alignItems: 'center', justifyContent: 'center' } }>
              <Button
                primary
                transparent
                full
                onPress={ () => console.log('create account')}
                >
                  <Text>Need to Create An Account?</Text>
                </Button>
            </View>
        </Content>
      </Container>
    );
  }
}
