import React from 'react';
import {View, StyleSheet} from 'react-native';
import Colors from './Colors';
import { ActivityIndicator } from 'react-native';

const Loading = () => {
    return(
        <View style={styles.container}>
            <ActivityIndicator color={Colors.accentColor} size="large"/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default Loading;