import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Keyboard, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native';

import Background from '../components/Background';
import StandardButton from '../components/StandardButton';
import Colors from '../constants/Colors';
import LinkButton from '../components/LinkButton';

import { useDispatch } from 'react-redux';
import * as usersAuthActions from '../store/actions/users';

const EmailRecoveryScreen = props => {
	const [ email, setEmail ] = useState('');
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
	//Function To Send Recovery Password
	const onSend = async () => {
		setError(null);
		try {
			await dispatch(usersAuthActions.forgetPassword(email));
			setEmail('');
			Alert.alert('Link Has Been Sent', 'Check Your Email', [ { text: 'Okay' } ]);
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
					<View style={styles.messageContainer}>
						<Text style={styles.message}>Enter Your Account Email:</Text>
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
					<StandardButton text='Send' onTap={onSend} />
					<LinkButton
						text='Remember password?'
						onTap={() => {
							props.navigation.navigate('Login');
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
	messageContainer: {
		marginBottom: 10
	},
	message: {
		color: Colors.primaryColor,
		fontSize: 23
	},
	inputFieldContainer: {
		backgroundColor: 'rgba(0,0,0, 0.4)',
		borderRadius: 20,
		width: '75%',
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	inputField: {
		color: 'white',
		fontSize: 20
	}
});

export default EmailRecoveryScreen;
