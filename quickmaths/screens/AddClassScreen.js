import React, {useState} from 'react';
import {StyleSheet, View, TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {useDispatch} from 'react-redux';
import {Item, HeaderButtons} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

import Background from '../components/Background';
import StandardButton from '../components/StandardButton';
import {addCourse} from '../store/actions/courses';
import Colors from '../constants/Colors';
import EditIcon from '../constants/EditIcon';

const AddClassScreen = props => {
    const [courseName, setCourseName] = useState('');
    const [classYear, setClassYear] = useState('');

    const dispatch = useDispatch();
    
    const addCourseHandler = (courseName, classYear) => {
        dispatch(addCourse(courseName, classYear));
    };

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
                        <EditIcon/>
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder="Class of xxxx"
                            placeholderTextColor='white'
                            onChangeText={(text) => setClassYear(text)}
                            value={classYear}
                        />
                        <EditIcon/>
                    </View>
                    <StandardButton
                        text="Save"
                        onTap={()=> {
                            addCourseHandler(courseName, classYear);
                            props.navigation.replace('TeacherHomeScreen');
                        }}
                        containerStyle={{width:'85%'}}
                    />
                </View>
            </TouchableWithoutFeedback>
        </Background>
    );
};

AddClassScreen.navigationOptions = (navData) => {
    return{
        headerTitle: 'Courses',
        headerLeftContainerStyle: {
            backgroundColor: Platform.OS == "android" ? Colors.accentColor : ""
        },
        headerLeft: () => (
               <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item 
                        title="Menu" 
                        iconName="md-menu" 
                        onPress={() => {
                            navData.navigation.toggleDrawer();
                        }}
                    />
                </HeaderButtons>
        )
    };
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