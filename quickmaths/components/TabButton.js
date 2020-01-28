import React, {useState} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Colors from '../constants/Colors';

const TabButton = props => {

    const activeColor = {
        backgroundColor: props.active ? Colors.accentColor : Colors.primaryColor
    };

    return(
        <TouchableWithoutFeedback
            onPress={props.onTap}
        >
            <View style={[styles.container, activeColor]}>
               {props.children}
            </View>
               
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '20%',
        marginRight: 5,
        borderRadius: 15
    },
});

export default TabButton;
