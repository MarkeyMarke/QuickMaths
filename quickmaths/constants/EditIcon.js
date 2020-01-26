import React from 'react';
import {View, StyleSheet} from 'react-native';
import {EvilIcons} from '@expo/vector-icons';

const EditIcon = props => {
    return(
        <View style={[styles.iconContainer, props.container]}>
            <EvilIcons name="pencil" size={50} color='white'/>
        </View>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        position: 'absolute',
        right: 0
    }
});

export default EditIcon;