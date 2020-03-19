import React, { useState, useCallback } from 'react';
import {View, Text, StyleSheet, SafeAreaView, RefreshControl, ScrollView} from 'react-native';

import Background from './Background';
import StandardButton from './StandardButton';

const PendingClass = props => {
    const [refreshing, setRefreshing] = useState(false);

    //Will call this function when user pulls down the screen to refresh 
    //TODO: set up fetch request in the function, and add a conditional check to determine
    //      if the component should change if the student has been accepted or not.
    const onRefresh = useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => {
            setRefreshing(false);
            props.setStatus();
        });

    },[refreshing]);

    return (
        <Background>
            <SafeAreaView style={styles.screen}>
                <ScrollView 
                    contentContainerStyle={styles.container} 
                    refreshControl={
                        <RefreshControl 
                            refreshing={refreshing} 
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>You're trying to join _.</Text>
                        <Text style={styles.text}>Please ask your teacher to let you in!</Text>
                    </View>
                    <StandardButton
                        text="Cancel"
                        onTap={()=> {
                            //TODO: Set up fetch request to cancel joining of class
                            props.onCancel();
                        }}
                    />
                    </ScrollView>
            </SafeAreaView>
        </Background>
    );
};

//will remove once fetch request is set up
function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    container:{
        flexGrow:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        color: 'white'
    },
});

export default PendingClass;