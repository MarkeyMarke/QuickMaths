import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import { EvilIcons} from '@expo/vector-icons';

import SwipeableList from './SwipeableList';
import AddListItemButton from './AddListItemButton';
import ListItem from './ListItem';
import { httpTemplate } from "../constants/HttpTemplate";
import Assignment from "../models/Assignment";
import Loading from '../constants/Loading';

const AssignmentList = props => {
    const [courseAssignments, setCourseAssignments] = useState(null); 
    const [refresh, setRefresh] = useState(false);
    const course = props.navigation.getParam("class");

    useEffect(() => {
        fetchData();
    }, [refresh]);

    const deleteAssignmentHandler = async(item) => {
        //TODO: https:///quickmaths-9472.nodechef.com/deleteassignment
        try {
        const response = await fetch(
            `https://quickmaths-9472.nodechef.com/deleteassignment`,
            {
            body: JSON.stringify({
                id: item.id
            }), 
            ...httpTemplate
            }
        );
        const responseJSON = await response.json();
        if (responseJSON.failed) console.log("Couldn't delete Assignment.");
        else {
            console.log("Deleted Assignment!");
            console.log(responseJSON);
        }
        } catch (err) {
        console.log("Delete Assignment fetch has failed.");
        }
        //dispatch(deleteAssignment(item.id));
    };

    const fetchData = async () => {
        //TODO: https://quickmaths-9472.nodechef.com/viewclass NOTE: Make a new model for this specific assignment format
        try {
        const response = await fetch(
            `https://quickmaths-9472.nodechef.com/viewclass`,
            {
            body: JSON.stringify({
                class_id: course.id
            }), 
            ...httpTemplate
            }
        );
        const responseJSON = await response.json();
        if (responseJSON.failed) console.log("Couldn't find Assignments.");
        else {
            console.log("Retrieved Assignments!");
            console.log(responseJSON);
            var convertedAssignments = [];
            responseJSON.forEach(item => {
            convertedAssignments.push(new Assignment(item.id.toString(), item.name, item.due_date, item.pub_date, 0));
            });
            setCourseAssignments(convertedAssignments);
        }
        } catch (err) {
        console.log("Assignment info fetch has failed.");
        }
    };

    const doRefresh = () => {
        setRefresh(!refresh);
    }

    const renderAssignmentListItem = (itemData) => {
        return (
            <ListItem 
                topText={itemData.item.title} 
                middleText={"Due " + itemData.item.getDateText(itemData.item.dueDate)}
                bottomText={"Published " + itemData.item.getDateText(itemData.item.publishDate)}
                bottomTextStyle={{fontStyle:"italic"}}
                containerStyle={styles.listItemContainerStyle}
                onSelect={() => {
                    props.navigation.navigate({
                        routeName: 'AddAssignment',
                        params: {
                            assignment: itemData.item,
                            refresh: doRefresh,
                            class: props.navigation.getParam('class')
                        }
                    });
                }}
                icon = {<EvilIcons name="pencil" size={75} color='white'/>}
                buttonContainerStyle={{marginTop: 5, marginLeft: 10}}
            />
        );
    };

    if(!courseAssignments){
        return <Loading/>
    }

    return(
        <SwipeableList 
            data={courseAssignments} 
            renderItem={renderAssignmentListItem} 
            onDelete={deleteAssignmentHandler}
            buttonContainerStyle={styles.deleteButtonContainer}
            listFooterComponent= {
                <AddListItemButton
                    text='Create Assignment'
                    containerStyle={styles.addButtonContainer}
                    onSelect={() => {
                        props.navigation.navigate({
                            routeName: 'AddAssignment',
                            params: {
                                refresh: doRefresh,
                                class: props.navigation.getParam('class')
                            }
                        });
                    }}
                />
            }
        />
    );
};

const styles = StyleSheet.create({
    listItemContainerStyle: {
		width: '95%',
		marginTop: 10
	},
    deleteButtonContainer: {
		marginTop: 10
	},
	addButtonContainer: {
		width: '95%',
		marginTop: 10
	}
});

export default AssignmentList;