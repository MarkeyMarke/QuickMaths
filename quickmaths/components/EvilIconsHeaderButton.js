import React from 'react';
import {HeaderButton} from 'react-navigation-header-buttons';
import {EvilIcons} from '@expo/vector-icons';

const EvilIconHeaderButton = props => {
    return (
        <HeaderButton 
            {...props} 
            IconComponent={EvilIcons} 
            iconSize={50} 
            color='white'
        />
    );
};

export default EvilIconHeaderButton;