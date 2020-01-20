import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

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

export default StudentHomeScreen;