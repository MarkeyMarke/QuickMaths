import React, {useState} from 'react';
import {View, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native';

import Background from '../components/Background';
import EditIcon from '../constants/EditIcon';
import StandardButton from '../components/StandardButton';

const ProfileScreen = props => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [studentID, setStudentID] = useState('');
    const [password, setPassword] = useState('');

    return(
        <Background>
            <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
                <View style={styles.screen}>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder="Enter Name"
                            placeholderTextColor='white'   
                            onChangeText={(text) => setName(text)}
                            value={name}
                        />
                        <EditIcon/>
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder="Enter Email"
                            placeholderTextColor='white'   
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                        />
                        <EditIcon/>
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder="Enter Student ID"
                            placeholderTextColor='white'   
                            onChangeText={(text) => setStudentID(text)}
                            value={studentID}
                        />
                        <EditIcon/>
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder="Enter Password"
                            placeholderTextColor='white'   
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                        />
                        <EditIcon/>
                    </View>
                    <StandardButton
                        text="Save"
                        onTap={()=> {
                            console.log("Save");
                            //addCourseHandler(courseName, classYear);
                            //props.navigation.replace('TeacherHomeScreen');
                        }}
                        containerStyle={{width:'85%'}}
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
    inputFieldContainer: {
        backgroundColor: 'rgba(0,0,0, 0.7)',
        width: '85%',
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

export default ProfileScreen;