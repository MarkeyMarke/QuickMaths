import React, {useState} from 'react';
import {StyleSheet, View, TextInput, FlatList, Text, Platform, TouchableWithoutFeedback} from 'react-native';
import {useDispatch} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';

import Background from '../components/Background';
import EditIcon from '../constants/EditIcon';
import AddListItemButton from '../components/AddListItemButton';
import Question from '../models/Question';
import ListItem from '../components/ListItem';
import {EvilIcons} from '@expo/vector-icons';
import StandardButton from '../components/StandardButton';
import {addAssignment, editAssignment} from '../store/actions/assignments';
import { QUESTIONS } from '../data/dummy-data';

const AddAssignmentScreen = props => {
    const item = props.navigation.getParam('assignment');

    const [assignmentName, setAssignmentName] = item ? useState(item.title) : useState('');
    const [questions, setQuestions] = item ? useState(QUESTIONS) : useState([]);
    const [id, setID] = useState(questions.length +1);
    const [refresh, setRefresh] = useState(false);
    const [date, setDate] = item ? useState(item.dueDate) : useState(new Date());
    const [show, setShow] = useState(false);
    const [dateText, setDateText] = item ? useState(item.getDueDateText()) : useState(null);

    const dispatch = useDispatch();

    const addAssignmentHandler = () => {
        dispatch(addAssignment(assignmentName, date));
    };

    const editAssignmentHandler = () => {
        dispatch(editAssignment(item.id, assignmentName, date));
    };

    const renderQuestionListItem = (itemData) => {
        return (
            <ListItem 
                topText={itemData.item.question} 
                middleText={"Answer: " + itemData.item.answer}
                containerStyle={styles.listItemContainerStyle}
                onSelect={() => {
                    props.navigation.navigate({
                        routeName: 'Question',
                        params: {
                            edit: editQuestion,
                            refresh: doRefresh,
                            question: itemData.item
                        }
                    });
                }}
                icon = {<EvilIcons name="pencil" size={75} color='white'/>}
                buttonContainerStyle={{marginTop: 5, marginLeft: 10}}
            />
        );
    };

    const addQuestion = (question, answer) => {
        var i = id;
        var q = new Question(i.toString(), question, answer);
        var copy = questions;
        copy.push(q);
        setQuestions(copy);
        i++;
        setID(i);
    };

    const editQuestion = (id, question, answer) => {
        var i = questions.findIndex((item) => item.id === id);
        var newQuestions = questions;
        newQuestions[i].question = question;
        newQuestions[i].answer = answer;
        setQuestions(newQuestions);
    };

    const doRefresh = () => {
        setRefresh(!refresh);
    };
    
    return (
        show && Platform.OS ==="ios" ? 
        <View>
            <DateTimePicker
                value={date}
                onChange={(event, selectedDate) => {
                    if (selectedDate === undefined) {
                        setShow(false);
                    }
                    else{
                        setDate(selectedDate);
                    }
                }}
                style={{alignSelf:'auto'}}
            />
            <StandardButton
                text="Set Due Date"
                onTap={() => {
                    setShow(false);
                    setDateText((date.getMonth()+1).toString()+'/'+date.getDate().toString()+'/'+date.getFullYear().toString());
                }}
                containerStyle={{alignSelf:'center'}}
            />
        </View>
        :
        <Background>
            <View style={styles.screen}>
                {show && Platform.OS==="android" && 
                    <DateTimePicker
                        value={date}
                        onChange={(event, selectedDate) => {
                            if (selectedDate === undefined) {
                                setShow(false);
                            }
                            else{
                                setShow(false);
                                setDate(selectedDate);
                                setDateText((selectedDate.getMonth()+1).toString()+'/'+selectedDate.getDate().toString()+'/'+selectedDate.getFullYear().toString());
                            }
                        }}
                    />
                }
                <FlatList
                    keyExtractor={(item, index) => item.id}
                    data={questions} 
                    renderItem={renderQuestionListItem}
                    ListEmptyComponent={<View></View>}
                    ListHeaderComponent={
                        <View>
                            <View style={styles.inputFieldContainer}>
                                <TextInput
                                    style={styles.inputField}
                                    placeholder="Enter Assignment Name"
                                    placeholderTextColor='white'   
                                    onChangeText={(text) => setAssignmentName(text)}
                                    value={assignmentName}
                                />
                                <EditIcon/>
                            </View>
                            {dateText ? 
                                <TouchableWithoutFeedback onPress={() => {setShow(true);}}>
                                    <View style={styles.inputFieldContainer}>
                                        <Text style={styles.inputField}>{dateText}</Text>
                                        <EditIcon/>
                                    </View>
                                </TouchableWithoutFeedback>
                             : 
                                <TouchableWithoutFeedback onPress={() => {setShow(true);}}>
                                    <View style={styles.inputFieldContainer}>
                                        <Text style={styles.inputField}>Enter Due Date</Text>
                                        <EditIcon/>
                                    </View>
                                </TouchableWithoutFeedback>
                            }
                        </View>
                    }
                    ListFooterComponent= {
                        <View>
                            <AddListItemButton
                                text='Add Question'
                                containerStyle={styles.addButtonContainer}
                                onSelect={() => {
                                    props.navigation.navigate({
                                        routeName: 'Question',
                                        params: {
                                            add: addQuestion,
                                            refresh: doRefresh
                                        }
                                    });
                                }}
                            />
                            <StandardButton
                                text="Save"
                                containerStyle={styles.saveButtonContainer}
                                onTap={() => {
                                    if(questions.length == 0)
                                    {
                                        alert("Please add a Question first!");
                                        return;
                                    }
                                    if(item){
                                        editAssignmentHandler();
                                    } else {
                                        addAssignmentHandler();
                                    }
                                    props.navigation.state.params.refresh();
                                    props.navigation.pop();
                                }}
                            />
                        </View>
                    }
                    
                />
            </View>
        </Background>
    );
};

AddAssignmentScreen.navigationOptions = (navigationData) =>  {
    const course = navigationData.navigation.getParam('class');
    const selectedClassTitle = course.title;
    return {
        headerTitle: selectedClassTitle,
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    inputFieldContainer: {
        backgroundColor: 'rgba(0,0,0, 0.6)',
        width: '95%',
        height: 50,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 10,
        paddingLeft: 10,
        marginLeft: 10
    },
    inputField: {
        color: 'white',
        fontSize: 20
    },
    listItemContainerStyle: {
        width:'95%', 
        marginTop:10
    },
    addButtonContainer:{
        width:'95%',
        marginTop: 10
    },
    saveButtonContainer: {
        width: '95%',
        paddingLeft: 10,
        marginLeft: 5
    }
});

export default AddAssignmentScreen;