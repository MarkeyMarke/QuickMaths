import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Ionicons} from '@expo/vector-icons';

const AddListItemButton = props => {
    return (
        <View style={[styles.container, props.containerStyle]}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{props.text}</Text>
            </View>
            
            <TouchableOpacity onPress={props.onSelect}>
                <View style={styles.buttonContainer}> 
                    <Ionicons name="ios-add" size={75} color="white"/>
                </View>
            </TouchableOpacity >
            
        </View>
    );

};

const styles = StyleSheet.create({
    text: {
        fontSize: 22,
        color: 'white'
    },
    textContainer:{
        width: '75%',
        justifyContent: 'center',
        paddingLeft: 10
    },
    container: {
        alignSelf:'center',
        backgroundColor: 'black',
        opacity: 0.6,
        width: '85%',
        borderRadius: 10,
        marginTop: 20,
        height: 100,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 10,
        elevation: 3,
        padding: 10,
        flexDirection:'row'
    },
    buttonContainer: {
        width: '100%',
        marginLeft: 30
    }
});

export default AddListItemButton;