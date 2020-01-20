import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';

const Background = props => {
    return(
        <ImageBackground 
                    source={{uri: 'https://www.trainingzone.co.uk/sites/default/files/styles/inline_banner/public/elenaleonova-books.jpg?itok=IKaBmw_i'}}
                    style={styles.backgroundImage}
                    blurRadius={3}
                    resizeMode="cover"
        >
            {props.children}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: '100%',
    }
});

export default Background;