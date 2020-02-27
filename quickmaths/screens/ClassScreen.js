import React, { useState } from 'react';
import { View, StyleSheet} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons} from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Background from '../components/Background';
import BackButton from '../constants/BackButton';
import TabButton from '../components/TabButton';
import { deleteAssignment } from '../store/actions/assignments';
import Colors from '../constants/Colors';
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import EvilIconsHeaderButton from '../components/EvilIconsHeaderButton';
import AssignmentList from '../components/AssignmentList';
import Roster from '../components/Roster';
import Submissions from '../components/Submissions';

const ClassScreen = props => {
	const [ isAssignmentsActive, setIsAssignmentsActive ] = useState(true);
	const [ isSubmissionsActive, setIsSubmissionsActive ] = useState(false);
	const [ isRosterActive, setIsRosterActive ] = useState(false);
	const [ isStudentRemainingActive, setIsStudentRemainingActive ] = useState(false);
	
  const [refresh, setRefresh] = useState(false);

	const courseAssignments = useSelector(state => state.assignments.assignments);
	const dispatch = useDispatch();

	const deleteAssignmentHandler = item => {
		dispatch(deleteAssignment(item.id));
	};

	const components = {
		ASSIGNMENTS: 'assignments',
		SUBMISSIONS: 'submissions',
		ROSTER: 	 'roster',
		STUDENT_REMAINING: 'student_remaining'
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
						<AssignmentList
							courseAssignments={courseAssignments}
							deleteAssignmentHandler={deleteAssignmentHandler}
							doRefresh={doRefresh}
							navigation={props.navigation}
						/>
                    ) : isSubmissionsActive ? (
                      <Submissions
						onSelectSubmissionsTab={onSelectSubmissionsTab}
						courseAssignments={courseAssignments}
						isSubmissionsActive={isSubmissionsActive}
					  />
                    ) : (
                    <Roster/>
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
