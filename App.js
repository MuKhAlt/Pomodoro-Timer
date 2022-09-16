import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import PomodoroTimer from './PomodoroTimer';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <PomodoroTimer />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
