import React, { Component } from 'react';
import {
  Text ,
  StatusBar,
  RefreshControl,

} from 'react-native';
import { inject, observer } from 'mobx-react/native';
import {
  Container,
  List,
  ListItem,
  ListView,

  View,
} from 'native-base';
import map from 'lodash/map';

@inject('lists') @observer
export default class Lists extends Component {
  state = {
    isFetching: false,
    data: [
      { name: 'test', id: 'bs' }
    ]
  }

  viewList(list) {
    this.props.navigation.navigate('ListDetail', list);
  }

  onRefresh() {
    this.setState({ isFetching: true });
    const { fetchLists } = this.props.lists;
    fetchLists().then( () => this.setState({ isFetching: false }) );
  }

  renderRow(list) {
    console.log('rendering row');
    return (
      <ListItem
        key={ list.id }
        onPress={ () => this.viewList(list) }
        title={ list.name }
      />
    );
  }

  render() {
    const { isFetching, data } = this.state;
    const { lists } = this.props.lists;
    // HACK list would not render without map the lists
    const dataArray = map(lists, list => list);

    return (
      <Container>
        <View>
          <List
            refreshControl={
              <RefreshControl
                refreshing={ isFetching }
                onRefresh={ this.onRefresh.bind(this) }
              />
            }
            dataArray={ dataArray }
            renderRow={ (list) =>
              <ListItem
                key={ list.id }
                onPress={ () => this.viewList(list) }
              >
                <Text>{ list.name }</Text>
              </ListItem>
            }
            />
        </View>
      </Container>
    );
  }
}
