import React, {useState} from 'react';
import {StyleSheet, View, TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native';
import Background from '../components/Background';
import StandardButton from '../components/StandardButton';

const AddClassScreen = props => {
    const [courseName, setCourseName] = useState('');
    const [classYear, setClassYear] = useState('');

    return(
        <Background>
            <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
                <View style={styles.screen}>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder="Enter Course Name"
                            placeholderTextColor='white'   
                            onChangeText={(text) => setCourseName(text)}
                            value={courseName}
                        />
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder="Class of xxxx"
                            placeholderTextColor='white'
                            onChangeText={(text) => setClassYear(text)}
                            value={classYear}
                        />
                    </View>
                    <StandardButton
                        text="Save"
                        onTap={()=> {console.log("Saved!")}}
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
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    inputFieldContainer: {
        backgroundColor: 'rgba(0,0,0, 0.4)',
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

export default AddClassScreen;