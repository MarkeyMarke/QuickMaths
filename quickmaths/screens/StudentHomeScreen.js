import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

import Colors from '../constants/Colors';
import {Item, HeaderButtons} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import Background from '../components/Background';
import { STUDENT_ASSIGNMENTS } from '../data/dummy-data';
import ListItem from '../components/ListItem';

const StudentHomeScreen = props => {
    const [assignments, setAssignments] = useState(STUDENT_ASSIGNMENTS);

    const renderListItem = (itemData) => {
        return (
            <ListItem 
                topText={itemData.item.title} 
                middleText={itemData.item.dueDate}
                bottomText={itemData.item.status}
                onSelect={() => {
                    console.log("I got clicked!");
                }}
            />
        );
    };

    return(
        <Background>
            <FlatList
                keyExtractor={(item, index) => item.id}
                data={assignments} 
                renderItem={renderListItem}
            />
        </Background>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

StudentHomeScreen.navigationOptions = (navData) => {
    return{
        headerTitle: 'Assignments',
        headerLeftContainerStyle: {
            backgroundColor: Colors.accentColor,
        },
        headerLeft: () => (
               <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item 
                        title="Menu" 
                        iconName="md-menu" 
                        onPress={() => {
                            navData.navigation.toggleDrawer();
                        }}
                    />
                </HeaderButtons>
        )
    };
};

export default StudentHomeScreen;