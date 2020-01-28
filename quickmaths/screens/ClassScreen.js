import React, { useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import {COURSES} from '../data/dummy-data';
import Background from '../components/Background';
import BackButton from '../constants/BackButton';
import TabButton from '../components/TabButton';

const ClassScreen = props => {
    const cId = props.navigation.getParam('classId');
    const [isAssignmentsActive, setIsAssignmentsActive] = useState(false);
    const [isSubmissionsActive, setIsSubmissionsActive] = useState(false);
    const [isRosterActive, setIsRosterActive] = useState(false);
    
    const selectedClass = COURSES.find(c => c.id === cId);

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
                <Text>The Class Screen!</Text>
                <Text>{selectedClass.title}</Text>
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
    }
});

export default ClassScreen;