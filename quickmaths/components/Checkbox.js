import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';

const Checkbox = props => {
	return (
		<View style={styles.container}>
			<View style={styles.buttonContainer}>
				<TouchableWithoutFeedback onPress={props.onSelect}>
					<Ionicons
						name={props.selected ? 'ios-checkbox-outline' : 'ios-square-outline'}
						size={30}
						color='black'
					/>
				</TouchableWithoutFeedback>
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.text}>I Am A Teacher</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10
	},
	textContainer: {
		marginLeft: 15
	},
	text: {
		color: 'white'
	}
});

export default Checkbox;
