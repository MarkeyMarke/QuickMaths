import React, {useState, useEffect} from 'react';
import {View, ImageBackground, StyleSheet, Platform} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useSelector, useDispatch} from 'react-redux';

import {COURSES} from '../data/dummy-data';
import ListItem from '../components/ListItem';
import {Item, HeaderButtons} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import AddListItemButton from '../components/AddListItemButton';
import {deleteCourse, setCourse} from '../store/actions/courses';
import Loading from '../constants/Loading';

const TeacherHomeScreen = props => {
    const [refresh, setRefresh] = useState(false);
    
    const courses = useSelector(state => state.courses.courses);
    
    const dispatch = useDispatch();

    const deleteCourseHandler = (id) => {
        dispatch(deleteCourse(id));
    };
    
    const fetchData = async() => {
        dispatch(setCourse(COURSES));
    };

    useEffect(() => {
        fetchData();
    },[]);

    const renderListItem = (itemData) => {
        return (
            <ListItem 
                topText={itemData.item.title} 
                middleText={"Class of " + itemData.item.classYear}
                bottomText={itemData.item.courseCode}
                onSelect={() => {
                    props.navigation.navigate({
                        routeName: 'Class',
                        params: {
                            class: itemData.item,
                            refresh: doRefresh
                        }
                    });
                }}
                icon = {
                    <Ionicons name="ios-play" size={75} color="white"/>
                }
            />
        );
    };

    const doRefresh = () => {
        setRefresh(!refresh);
    }

    return(
        <ImageBackground 
                source={{uri: 'https://www.trainingzone.co.uk/sites/default/files/styles/inline_banner/public/elenaleonova-books.jpg?itok=IKaBmw_i'}}
                style={styles.backgroundImage}
                blurRadius={3}
                resizeMode="cover"
        >
            {!courses ? 
            <Loading/>
            :
            <SwipeListView 
                keyExtractor={(item, index) => item.id}
                data={courses} 
                renderItem={renderListItem}
                renderHiddenItem={(data, rowMap) => (
                <View style={styles.backRow}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => deleteCourseHandler(data.item.id)}
                        >
                            <Ionicons name="ios-trash" size={75} color="white"/>
                        </TouchableOpacity>
                    </View>
                </View>
                    
                )}
                leftOpenValue={100}
                ListFooterComponent= {
                    <AddListItemButton
                        text='Create class'
                        onSelect={() => {
                            props.navigation.replace('AddClass');
                        }}
                    />
                }
            />
            }
        </ImageBackground>
    );
};

TeacherHomeScreen.navigationOptions = (navData) => {
    return{
        headerTitle: 'Courses',
        headerLeftContainerStyle: {
            backgroundColor: Platform.OS == "android" ? Colors.accentColor : "",
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
        left: 45,
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