import React from 'react';
import {View, Text, Button, ImageBackground, StyleSheet} from 'react-native';

import Background from '../components/Background';

const HomeScreen = props => {
    return(
        <Background >
            <View style={styles.screen}>
                <Text>The Home Screen!</Text>
                <Button title="Sign In" onPress={() => {
                    props.navigation.navigate('Login');
                }}/>
                <Button title="Register" onPress={() => {
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