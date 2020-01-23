import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {enableScreens} from 'react-native-screens';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

import QuickMathsNavigator from './navigation/QuickMathsNavigator';
import usersReducer from './store/reducers/users';
import coursesReducer from './store/reducers/courses';

enableScreens();

const rootReducer = combineReducers({
  users: usersReducer,
  courses: coursesReducer
});

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <QuickMathsNavigator/>
    </Provider>
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
