import React from 'react';
import {View, StyleSheet} from 'react-native';

import AppTitle from '../constants/AppTitle';
import StandardButton from '../components/StandardButton';
import Background from '../components/Background';

const HomeScreen = props => {
    return(
        <Background >
            <View style={styles.screen}>
                <AppTitle/>
                <StandardButton text="Sign In" onTap={() => {
                    props.navigation.navigate('Login');
                }}/>
                <StandardButton text="Register" onTap={() => {
                    props.navigation.navigate('Register');
                }}/>
            </View>
        </Background>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default HomeScreen;