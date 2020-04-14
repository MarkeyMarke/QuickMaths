import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import { EvilIcons} from '@expo/vector-icons';

import SwipeableList from './SwipeableList';
import AddListItemButton from './AddListItemButton';
import ListItem from './ListItem';



const AssignmentList = props => {
    const [refresh, setRefresh] = useState(false);

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

    return(
        <SwipeableList 
            data={props.courseAssignments} 
            renderItem={renderAssignmentListItem} 
            onDelete={props.deleteAssignmentHandler}
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