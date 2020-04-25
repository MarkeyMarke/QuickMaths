import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import * as usersAuthActions from '../store/actions/users';

import Background from '../components/Background';
import EditIcon from '../constants/EditIcon';
import StandardButton from '../components/StandardButton';

const ChangeAccountInfoScreen = props => {
	const [ name, setName ] = useState('');
	const [ userID, setUserID ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ error, setError ] = useState();
	const dispatch = useDispatch();
	const idToken = useSelector(state => state.users.token);
	const nameProfile = useSelector(state => state.users.name);
	const idProfile = useSelector(state => state.users.id);
	const emailProfile = useSelector(state => state.users.email);
	//Function For An Allert
	useEffect(
		() => {
			if (error) {
				Alert.alert('An Error Occurred!', error, [ { text: 'Okay' } ]);
			}
		},
		[ error ]
	);

	//Function For Update Profile
	const onUpdateProfile = async () => {
		setError(null);
		try {
			if ((name != '' || userID != '') && password != '') {
				await dispatch(
					usersAuthActions.updateProfile(name, nameProfile, userID, idProfile, idToken, '', emailProfile)
				);
				await dispatch(usersAuthActions.updatePassword(password, idToken));
				Alert.alert('Success', 'Profile and Password Changed. \n Please Sign In Again', [ { text: 'Okay' } ]);
				props.navigation.navigate('Login');
			} else if (password != '') {
				await dispatch(usersAuthActions.updatePassword(password, idToken));
				Alert.alert('Success', 'Password Changed. Please Sign In Again', [ { text: 'Okay' } ]);
				props.navigation.navigate('Login');
			} else {
				await dispatch(
					usersAuthActions.updateProfile(name, nameProfile, userID, idProfile, idToken, '', emailProfile)
				);
				Alert.alert('Success', 'Profile Changed.', [ { text: 'Okay' } ]);
				props.navigation.navigate('Login');
			}
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
					<View style={styles.inputFieldContainer}>
						<TextInput
							style={styles.inputField}
							placeholder={nameProfile}
							placeholderTextColor='white'
							autoCapitalize='none'
							onChangeText={text => setName(text)}
							value={name}
						/>
						<EditIcon />
					</View>
					<View style={styles.inputFieldContainer}>
						<TextInput
							style={styles.inputField}
							placeholder={idProfile}
							placeholderTextColor='white'
							autoCapitalize='none'
							onChangeText={text => setUserID(text)}
							value={userID}
						/>
						<EditIcon />
					</View>
					<View style={styles.inputFieldContainer}>
						<TextInput
							style={styles.inputField}
							placeholder='•••••••'
							placeholderTextColor='white'
							secureTextEntry
							autoCapitalize='none'
							onChangeText={text => setPassword(text)}
							value={password}
						/>
						<EditIcon />
					</View>
					<StandardButton
						text='Save'
						onTap={() => {
							onUpdateProfile();
						}}
						containerStyle={{ width: '85%' }}
					/>
				</View>
			</TouchableWithoutFeedback>
		</Background>
	);
};

ChangeAccountInfoScreen.navigationOptions = navData => {
	return {
		headerTitle: 'Change Account Information'
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	inputFieldContainer: {
		backgroundColor: 'rgba(0,0,0, 0.7)',
		width: '85%',
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		marginTop: 10,
		borderRadius: 10
	},
	inputField: {
		color: 'white',
		fontSize: 20
	}
});

export default ChangeAccountInfoScreen;
