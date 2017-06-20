import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { inject, observer } from 'mobx-react/native';
import {
  Container,
  Content,
  List,
  ListItem,
} from 'native-base';

@inject('lists') @observer
class ListDetail extends Component {
  componentWillMount() {
    console.log('our beloved props', this.props);
  }

  render() {
    const listId = this.props.navigation.state.params.id;
    const { items } = this.props.navigation.state.params;
    const { toggleCompleted } = this.props.lists;

    return (
      <Container>
        <Content>
          <List>
            {
              items.map((item, i) => {
                const { id, isCompleted } = item;
                return (
                  <ListItem
                    key={ i }
                    onPress={ () => toggleCompleted.bind(this.props.lists)(listId, id) }
                    >
                    <Text style={ [ isCompleted && style.isCompleted ] }>{ item.text }</Text>
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

const style = StyleSheet.create({
  isCompleted: {
    color: '#999',
    fontStyle: 'italic',
  }
})

export default ListDetail;
