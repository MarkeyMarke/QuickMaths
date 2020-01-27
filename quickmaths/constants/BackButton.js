import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const BackButton = props => {
    return(
        <TouchableOpacity onPress={props.onTap}>
            <View style={styles.container}>
                <View>
                    <Ionicons name="ios-play" color="white" size={30} style={styles.icon}/>
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
        width: 75,
        marginRight: 5
    },
    icon: {
        transform: [{rotateY: "180deg"}]
    },
    textContainer: {
        marginLeft: 5,
        marginBottom: 2
    },
    text: {
        color: "white",
        fontSize: 20
    }
});

export default BackButton;