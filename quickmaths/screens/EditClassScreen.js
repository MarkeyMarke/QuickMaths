import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {Item, HeaderButtons} from 'react-navigation-header-buttons';
import {useDispatch} from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import Background from '../components/Background';
import StandardButton from '../components/StandardButton';
import Colors from '../constants/Colors';
import EditIcon from '../constants/EditIcon';
import {editCourse} from '../store/actions/courses';

const EditClassScreen = props => {
    const course= props.navigation.getParam('class');

    const [courseName, setCourseName] = useState(course.title);
    const [classYear, setClassYear] = useState(course.classYear);

    const dispatch = useDispatch();

    const editCourseHandler = (id, courseName, classYear) => {
        dispatch(editCourse(id, courseName, classYear));
    };

    return(
        <Background>
            <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
                <View style={styles.screen}>
                    <View style={styles.inputFieldContainer}>
                        <Text style={styles.inputField}>{course.courseCode}</Text>
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={course.title}
                            placeholderTextColor='white'   
                            onChangeText={(text) => setCourseName(text)}
                            value={courseName}
                        />
                        <EditIcon/>
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={course.classYear}
                            placeholderTextColor='white'
                            onChangeText={(text) => setClassYear(text)}
                            value={classYear}
                        />
                        <EditIcon/>
                    </View>
                    <StandardButton
                        text="Save"
                        onTap={()=> {
                            editCourseHandler(course.id, courseName, classYear);
                            props.navigation.pop();
                        }}
                        containerStyle={{width:'85%'}}
                    />
                </View>
            </TouchableWithoutFeedback>
        </Background>
    );
};

EditClassScreen.navigationOptions = (navData) => {
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
        ),
        gestureEnabled: false,
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    inputFieldContainer: {
        backgroundColor: 'rgba(0,0,0, 0.6)',
        width: '85%',
        height: 50,
        flexDirection: "row",
        alignItems: 'center',
        marginTop: 10,
        paddingLeft: 15
    },
    inputField: {
        color: 'white',
        fontSize: 20
    },
});

export default EditClassScreen;