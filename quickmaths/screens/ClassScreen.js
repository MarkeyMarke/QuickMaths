import React, { useState } from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Ionicons} from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import {COURSES} from '../data/dummy-data';
import Background from '../components/Background';
import BackButton from '../constants/BackButton';
import TabButton from '../components/TabButton';
import ListItem from '../components/ListItem';
import SwipeableList from '../components/SwipeableList';
import {deleteAssignment} from '../store/actions/assignments';

const ClassScreen = props => {
    const [isAssignmentsActive, setIsAssignmentsActive] = useState(true);
    const [isSubmissionsActive, setIsSubmissionsActive] = useState(false);
    const [isRosterActive, setIsRosterActive] = useState(false);
    
    const courseAssignments = useSelector(state => state.assignments.assignments);

    const dispatch = useDispatch();

    const deleteAssignmentHandler = (item) => {
        dispatch(deleteAssignment(item.id));
    }

    const onSelectAssignmentTab = () => {
        setIsAssignmentsActive(true);
        setIsSubmissionsActive(false);
        setIsRosterActive(false);
    };

    const onSelectSubmissionsTab = () => {
        setIsSubmissionsActive(true);
        setIsAssignmentsActive(false);
        setIsRosterActive(false);
    };

    const onSelectRosterTab = () => {
        setIsRosterActive(true);
        setIsSubmissionsActive(false);
        setIsAssignmentsActive(false);
        
    };

    const renderAssignmentListItem = (itemData) => {
        return (
            <ListItem 
                topText={itemData.item.title} 
                middleText={"Due " + itemData.item.dueDate}
                bottomText={itemData.item.status + " " + itemData.item.currentDate}
                bottomTextStyle={{fontStyle:"italic"}}
                containerStyle={{width:'95%'}}
                onSelect={() => {console.log("pressed!")}}
            />
        );
    };

    return(
        <Background>
            <View style={styles.screen}>
                <View style={styles.tabContainer}>
                    <BackButton onTap={() => {props.navigation.pop()}}/>
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
                    isAssignmentsActive ? 
                    <SwipeableList 
                        data={courseAssignments} 
                        renderItem={renderAssignmentListItem} 
                        onAdd={() => {console.log("Added")}}
                        onDelete={deleteAssignmentHandler}
                    /> :
                    isSubmissionsActive ? null :
                    null
                }
            </View>
        </Background>
        
    );
};

ClassScreen.navigationOptions = (navigationData) =>  {
    const cId = navigationData.navigation.getParam('classId');
    
    const selectedClass = COURSES.find(c => c.id === cId);

    return {
        headerTitle: selectedClass.title
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
        marginTop: 30,
    },
});

export default ClassScreen;