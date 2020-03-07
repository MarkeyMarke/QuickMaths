import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import * as usersAuthActions from '../store/actions/users';

import Colors from '../constants/Colors';
import HeaderButton from '../components/HeaderButton';
import Background from '../components/Background';
import EditIcon from '../constants/EditIcon';
import StandardButton from '../components/StandardButton';

const ProfileScreen = props => {
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ userID, setUserID ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ error, setError ] = useState();
	const dispatch = useDispatch();
	const idToken = useSelector(state => state.users.token);
	const nameProfile = useSelector(state => state.users.name);
	const emailProfile = useSelector(state => state.users.email);
	const idProfile = useSelector(state => state.users.id);
	const isTeacher = useSelector(state => state.users.isTeacher);
	//Function For An Allert
	useEffect(
		() => {
			if (error) {
				Alert.alert('An Error Occurred!', error, [ { text: 'Okay' } ]);
			}
		},
		[ error ]
	);

	const homePageHandler = () => {
		if (isTeacher)
			//Teacher Home Page
			props.navigation.navigate('TeacherHomeScreen');
		else
			//Student Home Page
			props.navigation.navigate('StudentHomeScreen');
	};

	//Function For Update Email
	const onUpdateEmail = async () => {
		setError(null);
		try {
			await dispatch(usersAuthActions.updateEmail(email, idToken));
			Alert.alert('Success', 'Email Changed', [ { text: 'Okay' } ]);
		} catch (err) {
			setError(err.message);
		}
	};
	//Function For Update Password
	const onUpdatePassword = async () => {
		setError(null);
		try {
			await dispatch(usersAuthActions.updatePassword(password, idToken));
			Alert.alert('Success', 'Password Changed', [ { text: 'Okay' } ]);
		} catch (err) {
			setError(err.message);
		}
	};
	//Function For Update Profile
	const onUpdateProfile = async () => {
		setError(null);
		try {
			await dispatch(usersAuthActions.updateProfile(name, nameProfile, userID, idProfile, idToken));
			Alert.alert('Success', 'Profile Changed', [ { text: 'Okay' } ]);
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
							placeholder={emailProfile}
							placeholderTextColor='white'
							autoCapitalize='none'
							onChangeText={text => setEmail(text)}
							value={email}
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
							homePageHandler();
							if (email != '') {
								onUpdateEmail();
							} else if (password != '') {
								onUpdatePassword();
							} else {
								onUpdateProfile();
							}
							//addCourseHandler(courseName, classYear);
						}}
						containerStyle={{ width: '85%' }}
					/>
				</View>
			</TouchableWithoutFeedback>
		</Background>
	);
};

ProfileScreen.navigationOptions = navData => {
	return {
		headerTitle: 'Profile',
		headerLeftContainerStyle: {
			backgroundColor: Colors.accentColor
		},
		headerLeft: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title='Menu'
					iconName='md-menu'
					onPress={() => {
						navData.navigation.toggleDrawer();
					}}
				/>
			</HeaderButtons>
		)
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
	},
	tabContainer: {
		flexDirection: 'row',
		right: 130,
		marginTop: 20
	}
});

export default ProfileScreen;
