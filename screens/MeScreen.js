import React from 'react';
import {
  View,
  Text,
} from 'react-native';

const Me = (props) => {
  console.log('props in me', props);

  return (
    <View>
      <Text>Me view</Text>
    </View>
  );
};

export default Me;
