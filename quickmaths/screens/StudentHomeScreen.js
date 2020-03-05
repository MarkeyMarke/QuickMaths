import React, { useState } from "react";
import {StyleSheet, FlatList } from "react-native";

import Colors from "../constants/Colors";
import { Item, HeaderButtons } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import Background from "../components/Background";
import { STUDENT_ASSIGNMENTS } from "../data/dummy-data";
import ListItem from "../components/ListItem";
import { Ionicons } from "@expo/vector-icons";
import NoClass from "../components/NoClass";
import PendingClass from "../components/PendingClass";

const StudentHomeScreen = props => {
  const [assignments, setAssignments] = useState(STUDENT_ASSIGNMENTS);
  const components = {
		NONE: 'none',
		PENDING: 'pending',
        ACCEPTED: 'accepted'
    };
    
    const [activeComponent, setActiveComponent] = useState(components.ACCEPTED);

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

	switch (activeComponent){
		case components.NONE:
			renderComponent = 
			<NoClass/>
			break;
		case components.PENDING:
			renderComponent = 
			<PendingClass/>
			break;
		case components.ACCEPTED:
            renderComponent = 
            <FlatList
                keyExtractor={(item, index) => item.id}
                data={assignments}
                renderItem={renderListItem}
            />
			break;
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
