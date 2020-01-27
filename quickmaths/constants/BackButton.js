import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const BackButton = () => {
    return(
        <TouchableOpacity onPress={() => {console.log("Pressed!")}}>
            <View style={styles.container}>
                <View>
                    <Ionicons name="ios-play" color="white" size={20} style={styles.icon}/>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Back</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0, 0.7)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 3,
        elevation: 3,
        width: 55
    },
    icon: {
        transform: [{rotateY: "180deg"}]
    },
    textContainer: {
        marginLeft: 2,
        marginBottom: 2
    },
    text: {
        color: "white",
        fontSize: 15
    }
});

export default BackButton;