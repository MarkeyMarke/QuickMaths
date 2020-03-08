import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Background from './Background';
import StandardButton from './StandardButton';

const PendingClass = props => {
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

export default PendingClass;