import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import { STUDENT_REMAINING } from '../data/dummy-data';
import TabButton from './TabButton';
import ListItem from './ListItem';
import Colors from '../constants/Colors';
import Loading from '../constants/Loading';

const Submissions = props => {
    const [ isStudentRemainingActive, setIsStudentRemainingActive ] = useState(false);
	const [ studentsRemaining, setStudentsRemaining ] = useState(null);
	
	const fetchData = async () => {
		setStudentsRemaining(STUDENT_REMAINING);
	};

	useEffect(() => {
		fetchData();
	  }, []
	);	  

    const renderSubmissionListItem = itemData => {
		return (
			<View>
				<ListItem
					topText={itemData.item.title}
					middleText={'Due ' + itemData.item.getDueDateText()}
					bottomText={itemData.item.submissions + ' submissions missing'}
					bottomTextStyle={{ fontStyle: 'italic' }}
					containerStyle={{ width: '97.5%', marginTop: 10 }}
					onSelect={() => {
						setIsStudentRemainingActive(true);
					}}
					icon={<Ionicons name='ios-play' size={75} color='white' />}
				/>
			</View>
		);
	};

	const renderStudentRemainingList = itemData => {
		var str2 = 'Incompleted';
		if (itemData.item.assignment === str2) {
			return (
				<ListItem
					topText={itemData.item.name}
					middleText={itemData.item.studentid}
					bottomText={itemData.item.assignment}
					bottomTextStyle={{ fontStyle: 'italic' }}
					containerStyle={{ width: '95.5%', marginTop: 10 }}
					icon={<Ionicons name='md-close-circle' size={70} color='white' />}
				/>
			);
		} else {
			return (
				<ListItem
					topText={itemData.item.name}
					middleText={itemData.item.studentid}
					bottomText={itemData.item.assignment}
					bottomTextStyle={{ fontStyle: 'italic' }}
					containerStyle={{ width: '95.5%', marginTop: 10 }}
					icon={<Ionicons name='md-checkmark-circle' size={70} color='white' />}
				/>
			);
		}
	};

	if(!studentsRemaining){
		return <Loading/>
	}
	
    return (
        <View>
        {isStudentRemainingActive ? (
        <View>
            <View style={styles.simpleBackLabel}>
                <TabButton active={isStudentRemainingActive} onTap={() => {
                    setIsStudentRemainingActive(false);
                }}>
                <Ionicons name='ios-play' size={35} style={styles.icon} />
                </TabButton>
                <Text style={styles.simpleAdditionText}>Simple Addition HW</Text>
            </View>
            <FlatList
                keyExtractor={(item, index) => item.id}
                data={studentsRemaining}
                renderItem={renderStudentRemainingList}
            />
        </View>
        ) : (
        <FlatList
            keyExtractor={(item, index) => item.id}
            data={props.courseAssignments}
            renderItem={renderSubmissionListItem}
        />
        )}
        </View>
    );
}

const styles = StyleSheet.create({
    icon: {
		transform: [ { rotateY: '180deg' } ],
		color: 'white',
		marginLeft: 3,
		marginTop: 3,
		marginBottom: 3
	},
	simpleBackLabel: {
		width: '95%',
		height: '5%',
		marginLeft: 10,
		marginTop: 10,
		borderColor: 'transparent',
		backgroundColor: Colors.primaryColor,
		flexDirection: 'row'
	},
	simpleAdditionText: {
		color: 'white',
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: 45,
		marginTop: 10,
		fontSize: 15,
		fontWeight: 'bold'
	}
});

export default Submissions;