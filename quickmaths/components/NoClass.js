import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Alert, Keyboard} from 'react-native';

import Background from './Background';
import StandardButton from './StandardButton';

const NoClass = props => {
    const [courseCode, setCourseCode] = useState('');
    const psuedoCourseCode = '123456';

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
                        if(psuedoCourseCode === courseCode){
                            props.setStatus();
                        }
                        else{
                            Alert.alert("Sorry", "That class code does not exist.", [{ text: "OK", onPress: () => {} }]);
                            setCourseCode('');
                        }
                    }}
                />
            </View>
            </TouchableWithoutFeedback>
        </Background>
    );
};

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

export default NoClass;