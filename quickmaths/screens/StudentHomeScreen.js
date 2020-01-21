import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Colors from '../constants/Colors';
import {Item, HeaderButtons} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

const StudentHomeScreen = props => {
    return(
        <View style={styles.screen}>
            <Text>The Student Home Screen!</Text>
        </View>
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