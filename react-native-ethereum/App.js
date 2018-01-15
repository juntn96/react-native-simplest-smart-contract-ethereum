import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Home from './src/components/Home'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Home/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30
  },
});
