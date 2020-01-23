import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Colors from '../constants/Colors';

const StandardButton = props => {
    return (
        <View style={[styles.container, props.containerStyle]}>
            <TouchableOpacity style={[styles.button, props.buttonStyle]} onPress={props.onTap}>
                <Text style={[styles.text, props.textStyle]}> {props.text}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        width: '75%',
    },
    text:{
        color: 'white',
        fontSize: 25
      },
    button:{
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 20,
        marginTop: 15
    }
});

export default StandardButton;