import React, {useState} from 'react';
import {View, ImageBackground, StyleSheet} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';

import {COURSES} from '../data/dummy-data';
import CourseListItem from '../components/CourseListItem';
import {Item, HeaderButtons} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import AddListItemButton from '../components/AddListItemButton';

const TeacherHomeScreen = props => {

    const [courses, setCourses] = useState(COURSES);

    const renderListItem = (itemData) => {
        return (
            <CourseListItem 
                title={itemData.item.title} 
                classYear={itemData.item.classYear}
                courseCode={itemData.item.courseCode}
                onSelect={() => {
                    props.navigation.navigate({
                        routeName: 'Class',
                        params: {
                            classId: itemData.item.id
                        }
                    });
                }}
            />
        );
    };

    return(
        <ImageBackground 
                source={{uri: 'https://www.trainingzone.co.uk/sites/default/files/styles/inline_banner/public/elenaleonova-books.jpg?itok=IKaBmw_i'}}
                style={styles.backgroundImage}
                blurRadius={3}
                resizeMode="cover"
        >
            <View>
                <SwipeListView 
                    keyExtractor={(item, index) => item.id}
                    data={courses} 
                    renderItem={renderListItem}
                    renderHiddenItem={(data, rowMap) => (
                    <View style={styles.backRow}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.backButton}
                                onPress={() => {
                                    let c = courses.filter(
                                        (course) => {
                                            return course.id !== data.item.id
                                        }
                                    );
                                    setCourses(c); 
                                }}
                            >
                                <Ionicons name="ios-trash" size={75} color="white"/>
                            </TouchableOpacity>
                        </View>
                    </View>
                        
                    )}
                    leftOpenValue={100}
                />
                <AddListItemButton
                    text='Create class'
                    onSelect={() => {
                        console.log('Added item');
                    }}
                />
            </View>
        </ImageBackground>
    );
};

TeacherHomeScreen.navigationOptions = (navData) => {
    return{
        headerTitle: 'Courses',
        headerLeftContainerStyle: {
            backgroundColor: Colors.accentColor,
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
    backRow:{
        flexDirection:'row',
        alignItems:'center',
        flex:1,
    },
    buttonContainer:{
        backgroundColor: 'red',
        width: 75,
        left: 60,
        justifyContent: 'center',
        marginTop: 20,
        borderRadius: 10
    },
    backButton:{
        alignItems: 'center',
        
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
    }
});

export default TeacherHomeScreen;