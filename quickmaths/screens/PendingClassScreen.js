import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Item, HeaderButtons} from 'react-navigation-header-buttons';

import Colors from '../constants/Colors';
import HeaderButton from '../components/HeaderButton';
import Background from '../components/Background';
import StandardButton from '../components/StandardButton';

const PendingClassScreen = props => {
    return (
        <Background>
            <View style={styles.screen}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>You're trying to join _.</Text>
                    <Text style={styles.text}>Please ask your teacher to let you in!</Text>
                </View>
                <StandardButton
                    text="Cancel"
                    onTap={()=> {
                        console.log('Cancel');
                        props.navigation.replace('StudentHomeScreen');
                    }}
                />
            </View>
        </Background>
    );
}

PendingClassScreen.navigationOptions = (navData) => {
    return{
        headerTitle: 'Find a class',
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

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        color: 'white'
    },
});

export default PendingClassScreen;