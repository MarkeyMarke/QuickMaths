import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import QuickMathsNavigator from './navigation/QuickMathsNavigator';
import {enableScreens} from 'react-native-screens';

enableScreens();

export default function App() {
  return (
    <QuickMathsNavigator/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
