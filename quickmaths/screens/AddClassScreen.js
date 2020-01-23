import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import Background from '../components/Background';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

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

export default AddClassScreen;