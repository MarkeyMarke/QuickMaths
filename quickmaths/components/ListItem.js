import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
const ListItem = props => {
    return (
        <View style={{...styles.container, ...styles.listItem}}>
            <View style={styles.textContainer}>
                <Text style={[styles.text, styles.topText]}>{props.topText}</Text>
                <Text style={[styles.text, styles.middleText]}>{props.middleText}</Text>
                <Text style={[styles.text, styles.bottomText]}>{props.bottomText}</Text>
            </View>
            
            <TouchableOpacity onPress={props.onSelect}>
                <View style={styles.buttonContainer}> 
                    <Ionicons name="ios-play" size={75} color="white"/>
                </View>
            </TouchableOpacity >
            
        </View>
    );
};

const styles = StyleSheet.create({
    listItem: {
        height: 110,
        marginTop: 20,
        backgroundColor: 'rgba(0,0,0, 0.8)',
        width: '85%',
        flex: 1,
    },
    text: {
        color: 'white'
    },
    topText: {
        fontSize: 22,
        fontWeight:'bold'
    },
    middleText: {
        fontSize: 20
    },
    bottomText:{
        fontSize: 18
    },
    textContainer:{
        width: '75%'
    },
    container: {
        flex: 1,
        alignSelf: 'center',
        borderRadius: 10,
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

export default ListItem;
