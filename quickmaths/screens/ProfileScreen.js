import React from 'react';
import { View, StyleSheet, Platform} from 'react-native';
import { Item, HeaderButtons } from 'react-navigation-header-buttons';

import Colors from '../constants/Colors';
import HeaderButton from '../components/HeaderButton';
import Background from '../components/Background';
import StandardButton from '../components/StandardButton';

const ProfileScreen = props => {
	return (
		<Background>
				<View style={styles.screen}>
					<StandardButton
						text='Change Email'
						onTap={() => {
							props.navigation.navigate('ChangeEmail');
						}}
						containerStyle={styles.buttons}
					/>
					<StandardButton 
						text='Change Account Information'
						onTap={() => {
							props.navigation.navigate('ChangeAccountInfo');
						}}
						containerStyle={styles.buttons}
					/>
				</View>
		</Background>
	);
};

ProfileScreen.navigationOptions = navData => {
	return {
		headerTitle: 'Profile',
		headerLeftContainerStyle: {
			backgroundColor: Platform.OS == "android" ? Colors.accentColor : ""
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
	buttons: {
		width: '85%', 
		borderRadius: 5 
	}
});

export default ProfileScreen;
