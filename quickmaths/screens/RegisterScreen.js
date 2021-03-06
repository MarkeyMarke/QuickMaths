import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { useDispatch } from 'react-redux';

import Background from '../components/Background';
import AppTitle from '../constants/AppTitle';
import StandardButton from '../components/StandardButton';
import Checkbox from '../components/Checkbox';
import LinkButton from '../components/LinkButton';
import { signInAsStudent, signInAsTeacher } from '../store/actions/users';
import * as usersAuthActions from '../store/actions/users';

const RegisterScreen = props => {
	const [ email, setEmail ] = useState('');
	const [ fullName, setFullName ] = useState('');
	const [ userID, setUserID ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ selected, setSelected ] = useState(false);
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
	//Function For Sign Up User
	const signUpHandler = async () => {
		setError(null);
		try {
			await dispatch(usersAuthActions.signUp(email, fullName, userID, password, selected));
			setEmail('');
			setFullName('');
			setUserID('');
			setPassword('');
			setSelected(false);
			Alert.alert('Success', 'Verify Your Email', [ { text: 'Okay' } ]);
		} catch (err) {
			setError(err.message);
		}
	};
	//Function For Checkbox
	const onSelect = () => {
		setSelected(!selected);
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
							placeholder='Enter Full Name'
							placeholderTextColor='white'
							autoCapitalize='none'
							onChangeText={text => setFullName(text)}
							value={fullName}
						/>
					</View>
					<View style={styles.inputFieldContainer}>
						<TextInput
							style={styles.inputField}
							placeholder='Enter ID'
							placeholderTextColor='white'
							autoCapitalize='none'
							onChangeText={text => setUserID(text)}
							value={userID}
						/>
					</View>
					<View style={styles.inputFieldContainer}>
						<TextInput
							style={styles.inputField}
							placeholder='Enter Password'
							placeholderTextColor='white'
							secureTextEntry
							onChangeText={text => setPassword(text)}
							value={password}
						/>
					</View>
					<StandardButton text='Register' onTap={signUpHandler} />
					<LinkButton
						text='Already registered?'
						onTap={() => {
							props.navigation.navigate('Login');
						}}
					/>
					<Checkbox onSelect={onSelect} selected={selected} />
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
		paddingBottom: 5
	},
	inputFieldContainer: {
		backgroundColor: 'rgba(0,0,0, 0.4)',
		borderRadius: 20,
		width: '75%',
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		marginBottom: 10
	},
	inputField: {
		color: 'white',
		fontSize: 20
	}
});

export default RegisterScreen;
