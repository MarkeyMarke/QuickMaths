import React from 'react';
import {View, StyleSheet} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Ionicons} from '@expo/vector-icons';

import AddListItemButton from '../components/AddListItemButton';

const SwipeableList = props => {
    return (
        <SwipeListView 
            keyExtractor={(item, index) => item.id}
            data={props.data} 
            renderItem={props.renderItem}
            renderHiddenItem={(data, rowMap) => (
            <View style={[styles.backRow, props.backRowStyle]}>
                <View style={[styles.buttonContainer, props.buttonContainerStyle]}>
                    <TouchableOpacity
                        style={[styles.backButton, props.backButtonStyle]}
                        onPress={props.onDelete(data)}
                    >
                        <Ionicons name="ios-trash" size={75} color="white"/>
                    </TouchableOpacity>
                </View>
            </View>
                
            )}
            leftOpenValue={100}
            ListFooterComponent= {
                <AddListItemButton
                    text='Create Assignment'
                    containerStyle={[styles.addButtonContainer, props.addButtonContainerStyle]}
                    onSelect={props.onAdd}
                />
            }
        />
    )
}

const styles = StyleSheet.create({
    backRow:{
        flexDirection:'row',
        alignItems:'center',
        flex:1,
    },
    buttonContainer:{
        backgroundColor: 'red',
        width: 75,
        left: 20,
        justifyContent: 'center',
        marginTop: 20,
        borderRadius: 10
    },
    backButton:{
        alignItems: 'center',
    },
    addButtonContainer:{
        width:'95%'
    }
});

export default SwipeableList; 