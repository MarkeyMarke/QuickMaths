import React, { useState } from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Ionicons} from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {COURSES} from '../data/dummy-data';
import Background from '../components/Background';
import BackButton from '../constants/BackButton';
import TabButton from '../components/TabButton';
import ListItem from '../components/ListItem';
import AddListItemButton from '../components/AddListItemButton';

const ClassScreen = props => {
    const cId = props.navigation.getParam('classId');
    const [isAssignmentsActive, setIsAssignmentsActive] = useState(true);
    const [isSubmissionsActive, setIsSubmissionsActive] = useState(false);
    const [isRosterActive, setIsRosterActive] = useState(false);
    
    const courseAssignments = useSelector(state => state.assignments.assignments);

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

    const renderListItem = (itemData) => {
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

    const RenderAssignments = () => {
        return (
        <SwipeListView 
            keyExtractor={(item, index) => item.id}
            data={courseAssignments} 
            renderItem={renderListItem}
            renderHiddenItem={(data, rowMap) => (
            <View style={styles.backRow}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => {console.log("Delete")}}
                    >
                        <Ionicons name="ios-trash" size={75} color="white"/>
                    </TouchableOpacity>
                </View>
            </View>
                
            )}
            leftOpenValue={100}
            ListFooterComponent= {
                <AddListItemButton
                    text='Create Assignment'
                    containerStyle={{width:'95%'}}
                    onSelect={() => {
                        console.log('Added');
                    }}
                />
            }
        />
    )};

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
                    isAssignmentsActive ? <RenderAssignments/> :
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
    backRow:{
        flexDirection:'row',
        alignItems:'center',
        flex:1,
    },
    buttonContainer:{
        backgroundColor: 'red',
        width: 75,
        left: 20,
        justifyContent: 'center',
        marginTop: 20,
        borderRadius: 10
    },
    backButton:{
        alignItems: 'center',
        
    },
});

export default ClassScreen;