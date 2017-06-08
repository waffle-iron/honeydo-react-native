import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { inject, observer } from 'mobx-react/native';
import {
  Container,
  Content,
  List,
  ListItem,
} from 'native-base';

// @inject('lists') @observer
class ListDetail extends Component {
  componentWillMount() {
    console.log('our beloved props', this.props);
  }

  toggleChecked(id) {
    console.log('we want to mark this as completed', id);
  }

  render() {
    const { items } = this.props.navigation.state.params;

    return (
      <Container>
        <Content>
          <List>
            {
              items.map((item, i) => {
                const { id } = item;
                return (
                  <ListItem key={ i } onPress={ () => this.toggleChecked(id) }>
                    <Text>{ item.text }</Text>
                  </ListItem>
                );
              })
            }
          </List>
        </Content>
      </Container>
    );
  }
}

export default ListDetail;
