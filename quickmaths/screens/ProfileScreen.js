import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import { Item, HeaderButtons } from 'react-navigation-header-buttons';

import Colors from '../constants/Colors';
import HeaderButton from '../components/HeaderButton';
import Background from '../components/Background';
import EditIcon from '../constants/EditIcon';
import StandardButton from '../components/StandardButton';

const ProfileScreen = props => {
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ studentID, setStudentID ] = useState('');
	const [ password, setPassword ] = useState('');
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
							placeholder='Enter Name'
							placeholderTextColor='white'
							onChangeText={text => setName(text)}
							value={name}
						/>
						<EditIcon />
					</View>
					<View style={styles.inputFieldContainer}>
						<TextInput
							style={styles.inputField}
							placeholder='Enter Email'
							placeholderTextColor='white'
							onChangeText={text => setEmail(text)}
							value={email}
						/>
						<EditIcon />
					</View>
					<View style={styles.inputFieldContainer}>
						<TextInput
							style={styles.inputField}
							placeholder='Enter Student ID'
							placeholderTextColor='white'
							onChangeText={text => setStudentID(text)}
							value={studentID}
						/>
						<EditIcon />
					</View>
					<View style={styles.inputFieldContainer}>
						<TextInput
							style={styles.inputField}
							placeholder='Enter Password'
							placeholderTextColor='white'
							onChangeText={text => setPassword(text)}
							value={password}
						/>
						<EditIcon />
					</View>
					<StandardButton
						text='Save'
						onTap={() => {
							console.log('Save');
							//addCourseHandler(courseName, classYear);
							//props.navigation.replace('TeacherHomeScreen');
						}}
						containerStyle={{ width: '85%' }}
					/>
				</View>
			</TouchableWithoutFeedback>
		</Background>
	);
};

ProfileScreen.navigationOptions = navData => {
	//const course = navData.navigation.getParam('Profile');
	//const selectedClassTitle = course.title;
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
