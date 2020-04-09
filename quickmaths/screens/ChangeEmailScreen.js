import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as usersAuthActions from '../store/actions/users';

import Background from '../components/Background';
import EditIcon from '../constants/EditIcon';
import StandardButton from '../components/StandardButton';

const ChangeEmailScreen = props => {
    const [ email, setEmail ] = useState('');
    const [ error, setError ] = useState();

	const dispatch = useDispatch();
	const idToken = useSelector(state => state.users.token);
    const emailProfile = useSelector(state => state.users.email);
    const nameProfile = useSelector(state => state.users.name);
    const idProfile = useSelector(state => state.users.id);
    
    //Function For An Allert
	useEffect(
		() => {
			if (error) {
				Alert.alert('An Error Occurred!', error, [ { text: 'Okay' } ]);
			}
		},
		[ error ]
    );

    //Function For Update Email
	const onUpdateEmail = async () => {
		setError(null);
		try {
            await dispatch(usersAuthActions.updateProfile('', nameProfile, '', idProfile, idToken, email, emailProfile));
            await dispatch(usersAuthActions.updateEmail(email, idToken));
            Alert.alert('Success', 'Email Changed. Verify New Email and Sign in', [ { text: 'Okay' } ]);
            props.navigation.navigate("Login");
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
							placeholder={emailProfile}
							placeholderTextColor='white'
							autoCapitalize='none'
							onChangeText={text => setEmail(text)}
							value={email}
						/>
						<EditIcon />
					</View>
					<StandardButton
						text='Save'
						onTap={() => {
							if (email != '') {
                                onUpdateEmail();
							}
						}}
						containerStyle={{ width: '85%' }}
					/>
				</View>
			</TouchableWithoutFeedback>
		</Background>
	);
}

ChangeEmailScreen.navigationOptions = navData => {
	return {
		headerTitle: 'Change Email',
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

export default ChangeEmailScreen;