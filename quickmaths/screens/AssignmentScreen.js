import React from 'react';
import {StyleSheet, View, Button} from 'react-native';

const AssignmentScreen = props => {
    return(
        <View style={styles.screen}>
            <Button onPress={
                console.log('Pressed!')
            }/>
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