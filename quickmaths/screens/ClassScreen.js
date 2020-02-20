import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons, EvilIcons, AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import { STUDENT_REMAINING } from '../data/dummy-data';
import Background from '../components/Background';
import BackButton from '../constants/BackButton';
import TabButton from '../components/TabButton';
import ListItem from '../components/ListItem';
import SwipeableList from '../components/SwipeableList';
import { deleteAssignment } from '../store/actions/assignments';
import Colors from '../constants/Colors';
import AddListItemButton from '../components/AddListItemButton';
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import EvilIconsHeaderButton from '../components/EvilIconsHeaderButton';

const ClassScreen = props => {
	const [ isAssignmentsActive, setIsAssignmentsActive ] = useState(true);
	const [ isSubmissionsActive, setIsSubmissionsActive ] = useState(false);
	const [ isRosterActive, setIsRosterActive ] = useState(false);
	const [ isStudentRemainingActive, setIsStudentRemainingActive ] = useState(false);
	const [ selectedIndex, setSelectedIndex ] = useState(0);
  const [refresh, setRefresh] = useState(false);

	const courseAssignments = useSelector(state => state.assignments.assignments);
	const students = useSelector(state => state.students.students);
	const [ studentsRemaining, setStudentsRemaining ] = useState(STUDENT_REMAINING);
	const dispatch = useDispatch();

	const deleteAssignmentHandler = item => {
		dispatch(deleteAssignment(item.id));
	};

	const onSelectAssignmentTab = () => {
		setIsAssignmentsActive(true);
		setIsSubmissionsActive(false);
		setIsRosterActive(false);
		setIsStudentRemainingActive(false);
	};

	const onSelectSubmissionsTab = () => {
		setIsSubmissionsActive(true);
		setIsAssignmentsActive(false);
		setIsRosterActive(false);
		setIsStudentRemainingActive(false);
	};

	const onSelectRosterTab = () => {
		setIsRosterActive(true);
		setIsSubmissionsActive(false);
		setIsAssignmentsActive(false);
		setIsStudentRemainingActive(false);
	};

    const doRefresh = () => {
        setRefresh(!refresh);
    }

    const renderAssignmentListItem = (itemData) => {
        return (
            <ListItem 
                topText={itemData.item.title} 
                middleText={"Due " + itemData.item.getDueDateText()}
                bottomText={itemData.item.status + " " + itemData.item.currentDate}
                bottomTextStyle={{fontStyle:"italic"}}
                containerStyle={styles.listItemContainerStyle}
                onSelect={() => {
                    props.navigation.navigate({
                        routeName: 'AddAssignment',
                        params: {
                            assignment: itemData.item,
                            refresh: doRefresh,
                            class: props.navigation.getParam('class')
                        }
                    });
                }}
                icon = {<EvilIcons name="pencil" size={75} color='white'/>}
                buttonContainerStyle={{marginTop: 5, marginLeft: 10}}
            />
        );
    };

	const renderSubmissionListItem = itemData => {
		return (
			<View>
				<ListItem
					topText={itemData.item.title}
					middleText={'Due ' + itemData.item.dueDate}
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
				icon={<AntDesign name='plus' size={50} color='white' />}
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
        <Background>
            <View style={styles.screen}>
                <View style={styles.tabContainer}>
                    <BackButton onTap={() => {
                        props.navigation.state.params.refresh();
                        props.navigation.pop();
                        }}/>
                    <TabButton active={isAssignmentsActive} onTap={onSelectAssignmentTab}>
                        <MaterialCommunityIcons name="clipboard-text-outline" size={30} color="white"/>
                    </TabButton>
                    <TabButton active={isSubmissionsActive} onTap={onSelectSubmissionsTab}>
                        <Ionicons name="md-checkmark-circle" size={30} color="white"/>
                    </TabButton>
                    <TabButton active={isRosterActive} onTap={onSelectRosterTab}>
                        <Ionicons name="ios-people" size={30} color="white"/>
                    </TabButton>
                </View>
                {
                    isAssignmentsActive ? (
                    <SwipeableList 
                        data={courseAssignments} 
                        renderItem={renderAssignmentListItem} 
                        onDelete={deleteAssignmentHandler}
                        buttonContainerStyle={styles.deleteButtonContainer}
                        listFooterComponent= {
                            <AddListItemButton
                                text='Create Assignment'
                                containerStyle={styles.addButtonContainer}
                                onSelect={() => {
                                    props.navigation.navigate({
                                        routeName: 'AddAssignment',
                                        params: {
                                            refresh: doRefresh,
                                            class: props.navigation.getParam('class')
                                        }
                                    });
                                }}
                            />
                        }
                    />
                    ) : isSubmissionsActive ? (
                      <View>
                        {isStudentRemainingActive ? (
                          <View>
                            <View style={styles.simpleBackLabel}>
                              <TabButton active={isSubmissionsActive} onTap={onSelectSubmissionsTab}>
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
                            data={courseAssignments}
                            renderItem={renderSubmissionListItem}
                          />
                        )}
                      </View>
                    ) : (
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
                )}
            </View>
        </Background>
        
    );
};

ClassScreen.navigationOptions = navigationData => {
	const course = navigationData.navigation.getParam('class');
	const selectedClassTitle = course.title;
	return {
		headerTitle: selectedClassTitle,
		headerLeftContainerStyle: {
			backgroundColor: Colors.accentColor
		},
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={EvilIconsHeaderButton}>
				<Item
					title='Edit'
					iconName='pencil'
					onPress={() => {
						navigationData.navigation.navigate({
							routeName: 'EditClass',
							params: {
								class: course
							}
						});
					}}
				/>
			</HeaderButtons>
		),
		headerLeft: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title='Menu'
					iconName='md-menu'
					onPress={() => {
						navigationData.navigation.toggleDrawer();
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
	tabContainer: {
		flexDirection: 'row',
		marginTop: 30
	},
	listItemContainerStyle: {
		width: '95%',
		marginTop: 10
	},
	deleteButtonContainer: {
		marginTop: 10
	},
	addButtonContainer: {
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
	},
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

export default ClassScreen;
