import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {COURSES} from '../data/dummy-data';

const ClassScreen = props => {
    const cId = props.navigation.getParam('classId');
    
    const selectedClass = COURSES.find(c => c.id === cId);

    return(
        <View style={styles.screen}>
            <Text>The Class Screen!</Text>
            <Text>{selectedClass.title}</Text>
        </View>
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
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ClassScreen;