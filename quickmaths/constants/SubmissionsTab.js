import React, {useState} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Colors from '../constants/Colors';
import {Ionicons} from '@expo/vector-icons';

const SubmissionsTab = props => {
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
                <Ionicons name="md-checkmark-circle"/>
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

export default SubmissionsTab;
