import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import QuickMathsNavigator from './navigation/QuickMathsNavigator';
import usersReducer from './store/reducers/users';
import coursesReducer from './store/reducers/courses';
import assignmentsReducer from './store/reducers/assignments';
import studentReducer from './store/reducers/students';

enableScreens();

const rootReducer = combineReducers({
	users: usersReducer,
	courses: coursesReducer,
	assignments: assignmentsReducer,
	students: studentReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
	return (
		<Provider store={store}>
			<QuickMathsNavigator />
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
