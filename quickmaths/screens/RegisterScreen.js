import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {useDispatch} from 'react-redux';

import Background from '../components/Background';
import AppTitle from '../constants/AppTitle';
import StandardButton from '../components/StandardButton';
import Checkbox from '../components/Checkbox';
import {signInAsStudent, signInAsTeacher} from '../store/actions/users';

const RegisterScreen = props => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [courseCode, setCourseCode] = useState('');
    const [password, setPassword] = useState('');
    const [selected, setSelected] = useState(false);

    const dispatch = useDispatch();

    const signInAsStudentHandler = () => {
        dispatch(signInAsStudent());
    };

    const signInAsTeacherHandler = () => {
        dispatch(signInAsTeacher());
    };

    const onRegister = () => {
        console.log(email);
        console.log(name);
        console.log(courseCode);
        console.log(password);
        if(selected){
            signInAsTeacherHandler();
        }
        else{
            signInAsStudentHandler();
        }
        props.navigation.navigate(selected ? 'TeacherHomeScreen' : 'StudentHomeScreen');
    }

    const onSelect = () => {
        setSelected(!selected);
    }

    return(
        <Background>
            <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
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
                            placeholder="Enter Full Name"
                            placeholderTextColor='white'   
                            onChangeText={(text) => setName(text)}
                            value={email}
                        />
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder="Enter Course Code"
                            placeholderTextColor='white'   
                            onChangeText={(text) => setCourseCode(text)}
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
                    <StandardButton text="Register" onTap={onRegister}/>
                    <Button title="Already registered?" onPress={() => {
                        props.navigation.navigate('Login');
                    }}/>
                    <Checkbox onSelect={onSelect} selected={selected}/>
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
    titleContainer:{
        paddingBottom: 5
    },
    inputFieldContainer: {
        backgroundColor: 'rgba(0,0,0, 0.4)',
        borderRadius: 20,
        width: '75%',
        height: 50,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 10
    },
    inputField: {
        color: 'white',
        fontSize: 20
    },
});

export default RegisterScreen;