import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const LinkButton = props => {
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
        width: '50%',
    },
    text:{
        color: '#0384fc',
        fontSize: 18
      },
    button:{
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        marginTop: 18
    }
});

export default LinkButton;