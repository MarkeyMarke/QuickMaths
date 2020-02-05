import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard} from 'react-native';

import Background from '../components/Background';
import StandardButton from '../components/StandardButton';

const NoClassScreen = () => {
    const [courseCode, setCourseCode] = useState('');

    return (
        <Background>
            <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
            <View style={styles.screen}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Looks like you're not in a class yet.</Text>
                </View>
                <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder="Enter class code"
                            placeholderTextColor='white'   
                            onChangeText={(text) => setCourseCode(text)}
                            value={courseCode}
                        />
                </View>
                <StandardButton
                    text="Join"
                    onTap={()=> {
                        console.log('Join');
                        //props.navigation.replace('TeacherHomeScreen');
                    }}
                />
            </View>
            </TouchableWithoutFeedback>
        </Background>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        color: 'white'
    },
    inputFieldContainer: {
        backgroundColor: 'rgba(0,0,0, 0.4)',
        width: '75%',
        height: 50,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 10,
        borderRadius: 20
    },
    inputField: {
        color: 'white',
        fontSize: 20
    }
});

export default NoClassScreen;