import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';

import Background from '../components/Background';
import AppTitle from '../constants/AppTitle';
import StandardButton from '../components/StandardButton';
import { useDispatch } from 'react-redux';
import * as usersAuthActions from '../store/actions/users';

const LoginScreen = props => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ error, setError ] = useState();
	const dispatch = useDispatch();
	//Function For An Allert
	useEffect(
		() => {
			if (error) {
				Alert.alert('An Error Occurred!', error, [ { text: 'Okay' } ]);
			}
		},
		[ error ]
	);
	//Function For Login
	const onLogin = async () => {
		setError(null);
		try {
			await dispatch(usersAuthActions.signIn(email, password));
			const getUserIdentification = await fetch('https://quickmaths-bc73a.firebaseio.com/users.json');
			const resData = await getUserIdentification.json();
			var isTeacher = true;
			for (const key in resData) {
				if (resData[key].email == email) {
					isTeacher = resData[key].teacher;
				}
			}
			if (isTeacher)
				//Teacher Home Page
				props.navigation.navigate('TeacherHomeScreen');
			else
				//Student Home Page
				props.navigation.navigate('StudentHomeScreen');
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<Background>
			<TouchableWithoutFeedback
				onPress={() => {
					Keyboard.dismiss();
				}}
			>
				<View style={styles.screen}>
					<View style={styles.titleContainer}>
						<AppTitle />
					</View>
					<View style={styles.inputFieldContainer}>
						<TextInput
							style={styles.inputField}
							placeholder='Enter Email'
							placeholderTextColor='white'
							autoCapitalize='none'
							onChangeText={text => setEmail(text)}
							value={email}
						/>
					</View>
					<View style={styles.inputFieldContainer}>
						<TextInput
							style={styles.inputField}
							placeholder='Enter Password'
							placeholderTextColor='white'
							autoCapitalize='none'
							secureTextEntry
							onChangeText={text => setPassword(text)}
							value={password}
						/>
					</View>

					<StandardButton text='Login' onTap={onLogin} />
					<Button
						title='Forgot Password?'
						onPress={() => {
							props.navigation.navigate('EmailRecovery');
						}}
					/>
					<Button
						title='Not Registered?'
						onPress={() => {
							props.navigation.navigate('Register');
						}}
					/>
				</View>
			</TouchableWithoutFeedback>
		</Background>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	titleContainer: {
		paddingBottom: 20
	},
	inputFieldContainer: {
		backgroundColor: 'rgba(0,0,0, 0.4)',
		borderRadius: 20,
		width: '75%',
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		marginTop: 10
	},
	inputField: {
		color: 'white',
		fontSize: 20
	}
});

export default LoginScreen;
