import React from 'react';
import {Text, StyleSheet} from 'react-native';

import Colors from './Colors';

const AppTitle = () => {
    return(
        <Text style={styles.appTitle}>QuickMaths</Text>
    );
    
};

const styles = StyleSheet.create({
    appTitle:{
        color: Colors.primaryColor,
        fontSize: 50,
    },
});

export default AppTitle;