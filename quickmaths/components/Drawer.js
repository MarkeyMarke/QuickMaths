import React from 'react';
import {View, Text, StyleSheet, ScrollView, Button} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { DrawerItems } from 'react-navigation-drawer';

import Colors from '../constants/Colors';
import StandardButton from './StandardButton';

const CustomDrawer = props => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <DrawerItems 
      {...props} 
      getLabel = {(scene) => props.getLabel(scene) !== null ? (
          <View style={styles.button}>
            <Text style={styles.label}>{props.getLabel(scene)}</Text>
          </View>
      ) :
      null
    }
      />
    
    <StandardButton 
      text="Sign Out"
      onTap={() => {props.navigation.navigate('Home');}}
      buttonStyle={styles.button}
      containerStyle={styles.container}
    />
    </SafeAreaView>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  label:{
    color: 'white',
    fontSize: 25
  },
  button:{
    backgroundColor: Colors.primaryColor,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 40,
    marginTop: 10
  }

});

export default CustomDrawer;