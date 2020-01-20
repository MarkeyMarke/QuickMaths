import React, {useState} from 'react';
import {View, Text, TextInput, Keyboard, Button, StyleSheet} from 'react-native';

import Background from '../components/Background';
import StandardButton from '../components/StandardButton';
import Colors from '../constants/Colors';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const EmailRecoveryScreen = props => {
    const [email, setEmail] = useState('');

    const onSend= () => {
        console.log(email);
    };

    return(
        <Background>
            <View style={styles.screen}>
                <View style={styles.messageContainer}>
                    <Text style={styles.message}>Please enter your account email</Text>
                </View>
                <View style={styles.inputFieldContainer}>
                    <TextInput
                        style={styles.inputField}
                        placeholder="Enter Email"
                        placeholderTextColor='white'   
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                    />
                </View>
                <StandardButton text="Send" onTap={onSend}/>
                <Button title="Remember password?" onPress={() => {
                    props.navigation.navigate('Login');
                }}/>
            </View>
        </Background>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    messageContainer:{
        marginBottom: 10,
    },
    message:{
        color: Colors.primaryColor,
        fontSize: 23
    },
    inputFieldContainer: {
        backgroundColor: 'rgba(0,0,0, 0.4)',
        borderRadius: 20,
        width: '75%',
        height: 50,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    inputField: {
        color: 'white',
        fontSize: 20
    },
});

export default EmailRecoveryScreen;