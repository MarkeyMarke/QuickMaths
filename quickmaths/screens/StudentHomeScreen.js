import React, { useState, useEffect } from "react";
import {View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";

import Colors from "../constants/Colors";
import { Item, HeaderButtons } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import Background from "../components/Background";
import { STUDENT_ASSIGNMENTS, STUDENT_FETCH } from "../data/dummy-data";
import ListItem from "../components/ListItem";
import { Ionicons } from "@expo/vector-icons";
import NoClass from "../components/NoClass";
import PendingClass from "../components/PendingClass";

const StudentHomeScreen = props => {
    const status = {
        NONE: 'none',
        PENDING: 'pending',
        ACCEPTED: 'accepted'
    };
    
    const [fetch, setFetch] = useState(STUDENT_FETCH);
    const [currentStatus, setCurrentStatus] = useState(null);
    const [assignments, setAssignments] = useState(null);
    
    // Will set the active component here depending on what is returned from fetch
    const fetchData = async () => {
      if(fetch.status === status.NONE){
        setCurrentStatus(status.NONE);
      }
      else if(fetch.status === status.PENDING){
        setCurrentStatus(status.PENDING);
      }
      else{
        setAssignments(fetch.assignments);
        setCurrentStatus(status.ACCEPTED);
      }
    };
      
    useEffect(() => {
        fetchData();
    }, []);

    const renderListItem = itemData => {
        return (
          <ListItem
            topText={itemData.item.title}
            middleText={itemData.item.getDueDateText()}
            bottomText={itemData.item.getProgressText()}
            onSelect={() => {
              props.navigation.navigate("Assignment", {
                progress: itemData.item.progress,
                title: itemData.item.title
              });
            }}
            icon={<Ionicons name="ios-play" size={75} color="white" />}
          />
        );
    };

    let renderComponent;

	switch (currentStatus){
		case status.NONE:
			renderComponent = 
			<NoClass/>
			break;
		case status.PENDING:
			renderComponent = 
			<PendingClass/>
			break;
		case status.ACCEPTED:
      renderComponent = 
      <FlatList
          keyExtractor={(item, index) => item.id}
          data={assignments}
          ListEmptyComponent={
            <View>
              <Text>No Assignments yet!</Text>
            </View>
          }
          renderItem={renderListItem}
      />
      break;
    default:
      renderComponent =
      <ActivityIndicator/>
	};

  return (
    <Background>
      {renderComponent}
    </Background>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

StudentHomeScreen.navigationOptions = navData => {
  return {
    headerTitle: "Assignments",
    headerLeftContainerStyle: {
      backgroundColor: Colors.accentColor
    },
    gestureEnabled: false,
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="md-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};

export default StudentHomeScreen;
