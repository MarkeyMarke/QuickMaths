import React, { useState } from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';

import Background from '../components/Background';
import AppTitle from '../constants/AppTitle';
import StandardButton from '../components/StandardButton';

const LoginScreen = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = () => {
        console.log(email);
        console.log(password);
        props.navigation.navigate('TeacherHomeScreen');
    };

    return(
        <Background>
            <View style={styles.screen}>
                <View style={styles.titleContainer}>
                    <AppTitle/>
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
                <View style={styles.inputFieldContainer}>
                    <TextInput
                        style={styles.inputField}
                        placeholder="Enter Password"
                        placeholderTextColor='white'
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                    />
                </View>
                
                <StandardButton text="Login" onTap={onLogin}
                />
                <Button title="Forgot Password?" onPress={() => {
                    props.navigation.navigate('EmailRecovery');
                }}/>
                <Button title="Not Registered?" onPress={() => {
                    props.navigation.navigate('Register');
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
    titleContainer:{
        paddingBottom: 20
    },
    inputFieldContainer: {
        backgroundColor: 'rgba(0,0,0, 0.4)',
        borderRadius: 20,
        width: '75%',
        height: 50,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 10
    },
    inputField: {
        color: 'white',
        fontSize: 20
    }
});

export default LoginScreen;