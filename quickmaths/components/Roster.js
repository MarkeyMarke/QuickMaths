import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {AntDesign} from '@expo/vector-icons';

import SwipeableList from '../components/SwipeableList';
import ListItem from '../components/ListItem';
import Colors from '../constants/Colors';

const Roster = props => {
    const [ selectedIndex, setSelectedIndex ] = useState(0);
    const students = useSelector(state => state.students.students);

    const renderStudentListItem = itemData => {
		return (
			<ListItem
				topText={itemData.item.name}
				middleText={itemData.item.id}
				bottomText={itemData.item.email}
				bottomTextStyle={{ fontStyle: 'italic' }}
				containerStyle={styles.listItemContainerStyle}
				onSelect={() => {
					console.log('pressed!');
				}}
				buttonContainerStyle={{ marginTop: 15, marginLeft: 15 }}
			/>
		);
	};

    const renderStudentRequestListItem = itemData => {
            return (
                <ListItem
                    topText={itemData.item.name}
                    middleText={itemData.item.id}
                    bottomText={itemData.item.email}
                    bottomTextStyle={{ fontStyle: 'italic' }}
                    containerStyle={styles.listItemContainerStyle}
                    onSelect={() => {
                        console.log('pressed!');
                    }}
                    icon={<AntDesign name='plus' size={50} color='white' />}
                    buttonContainerStyle={{ marginTop: 15, marginLeft: 15 }}
                />
            );
        };

    return(
        <View>
            <SegmentedControlTab 
                values={["Roster", "Requests"]}
                selectedIndex={selectedIndex}
                onTabPress={(index) => {setSelectedIndex(index)}}
                tabsContainerStyle={styles.segmentedTabsContainerStyle}
                tabStyle={styles.segmentedTabStyle}
                tabTextStyle={styles.segmentedTabTextStyle}
                borderRadius={0}
                activeTabStyle={styles.segmentedActiveTabStyle}
            />
            {selectedIndex === 0 ? ( 
                <SwipeableList
                    data={students} 
                    renderItem={renderStudentListItem} 
                    onAdd={() => {console.log("Added")}}
                    onDelete={() => {console.log("Deleted")}}
                    buttonContainerStyle={styles.deleteButtonContainer}
                />
            ) : (
                <SwipeableList
                    data={students} 
                    renderItem={renderStudentRequestListItem} 
                    onAdd={() => {console.log("Added")}}
                    onDelete={() => {console.log("Deleted")}}
                    buttonContainerStyle={styles.deleteButtonContainer}
                />
            )}
        </View>
    );

}

const styles = StyleSheet.create({
    deleteButtonContainer: {
		marginTop: 10
    },
    listItemContainerStyle: {
		width: '95%',
		marginTop: 10
    },
    segmentedTabsContainerStyle: {
		width: '95%',
		marginTop: 10
	},
	segmentedTabStyle: {
		backgroundColor: Colors.accentColor,
		borderColor: 'transparent'
	},
	segmentedTabTextStyle: {
		color: 'white'
	},
	segmentedActiveTabStyle: {
		backgroundColor: Colors.primaryColor
	}
});

export default Roster;