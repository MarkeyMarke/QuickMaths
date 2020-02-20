import React from 'react';
import {StyleSheet, View, Button} from 'react-native';

const AssignmentScreen = props => {
    return(
        <View style={styles.screen}>
            <Button title="Back" onPress={() => {props.navigation.pop()}}/>
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

export default AssignmentScreen;