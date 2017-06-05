import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  List,
  ListItem,
} from 'native-base';


@inject('lists') @observer
export default class Lists extends Component {
  viewList(list) {
    this.props.navigation.navigate('ListDetail', list);
  }

  render() {
    const { lists } = this.props.lists;

    console.log('first list', lists[0]);

    return (
      <Container>
        <Header>
          <Body>
            <Title>Lists</Title>
          </Body>
        </Header>
        <Content>
          <List>
            {
              lists.map((list, i) => {
                return(
                  <ListItem key={ i } onPress={ () => this.viewList(list) }>
                    <Text>{ list.name }</Text>
                  </ListItem>
                )
              })
            }
          </List>
        </Content>
      </Container>
    );
  }
}
