import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
const CourseListItem = props => {
    return (
        <View style={{...styles.container, ...styles.listItem}}>
            <View style={styles.textContainer}>
                <Text style={[styles.text, styles.title]}>{props.title}</Text>
                <Text style={[styles.text, styles.classYear]}>{props.classYear}</Text>
                <Text style={[styles.text, styles.courseCode]}>{props.courseCode}</Text>
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
        height: 100,
        marginTop: 20,
        backgroundColor: 'rgba(0,0,0, 0.8)',
        width: '75%',
        flex: 1,
    },
    text: {
        color: 'white'
    },
    title: {
        fontSize: 22,
        fontWeight:'bold'
    },
    classYear: {
        fontSize: 20
    },
    courseCode:{
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

export default CourseListItem;
