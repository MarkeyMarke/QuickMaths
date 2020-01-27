import React, {useState} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Colors from '../constants/Colors';
import {MaterialCommunityIcons} from '@expo/vector-icons';

const AssignmentsTab = props => {
    const [active, setActive] = useState(false);

    const activeColor = {
        backgroundColor: active ? Colors.accentColor : Colors.primaryColor
    };

    return(
        <TouchableWithoutFeedback
            style={styles.button}  
            onPress={() => {
                console.log("Pressed");
                setActive(!active);
            }}
        >
            <View style={[styles.container, activeColor]}>
                <MaterialCommunityIcons name="clipboard-text-outline"/>
            </View>
               
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '25%'
    },
    button: {
        width: '25%'
    }
});

export default AssignmentsTab;
