import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Background from "../components/Background";
import BackButton from "../constants/BackButton";
import TabButton from "../components/TabButton";
import Colors from "../constants/Colors";
import { Item, HeaderButtons } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import EvilIconsHeaderButton from "../components/EvilIconsHeaderButton";
import AssignmentList from "../components/AssignmentList";
import Roster from "../components/Roster";
import Submissions from "../components/Submissions";

const ClassScreen = (props) => {
  const components = {
    ASSIGNMENTS: "assignments",
    SUBMISSIONS: "submissions",
    ROSTER: "roster",
  };

  const [course, updateCourse] = useState(props.navigation.getParam("class"));

  const [activeComponent, setActiveComponent] = useState(
    components.ASSIGNMENTS
  );
  
  //Updates the course state with the new updatedCourse, only if the updateCourse changes
  const updateCourseHandler = useCallback((updatedCourse) => {
    updateCourse(updatedCourse);
  }, [updateCourse]);
  
  /**
   * sets/updates a param courseInfo with the course state whenever the course state changes
   * and in order to use the course state in the header.
   */
  useEffect(() => {
    props.navigation.setParams({courseInfo: course});
  }, [course]);

  /**
   * sets a param updateCourse with the updateCourseHandler reference 
   * whenever the memonized function changes. This is done to prevent 
   * an infinte loop and in order to access the function in the header. 
   */
  useEffect(() => {
    props.navigation.setParams({updateCourse: updateCourseHandler});
  }, [updateCourseHandler]);

  let renderComponent;

  switch (activeComponent) {
    case components.ASSIGNMENTS:
      renderComponent = (
        <AssignmentList navigation={props.navigation}/>
      );
      break;
    case components.SUBMISSIONS:
      renderComponent = <Submissions/>;
      break;
    case components.ROSTER:
      renderComponent = <Roster />;
      break;
  }

  return (
    <Background>
      <View style={styles.screen}>
        <View style={styles.tabContainer}>
          <BackButton
            onTap={() => {
              props.navigation.state.params.refresh();
              props.navigation.pop();
            }}
          />
          <TabButton
            active={activeComponent === components.ASSIGNMENTS}
            onTap={() => setActiveComponent(components.ASSIGNMENTS)}
          >
            <MaterialCommunityIcons
              name="clipboard-text-outline"
              size={30}
              color="white"
            />
          </TabButton>
          <TabButton
            active={activeComponent === components.SUBMISSIONS}
            onTap={() => setActiveComponent(components.SUBMISSIONS)}
          >
            <Ionicons name="md-checkmark-circle" size={30} color="white" />
          </TabButton>
          <TabButton
            active={activeComponent === components.ROSTER}
            onTap={() => setActiveComponent(components.ROSTER)}
          >
            <Ionicons name="ios-people" size={30} color="white" />
          </TabButton>
        </View>
        {renderComponent}
      </View>
    </Background>
  );
};

ClassScreen.navigationOptions = (navigationData) => {
  const course = navigationData.navigation.getParam("courseInfo");
  var selectedClassTitle;
  if(course){
    selectedClassTitle = course.class_title;
  } else {
    selectedClassTitle = navigationData.navigation.getParam("class").class_title;
  }
  const updateCourse = navigationData.navigation.getParam("updateCourse");

  return {
    headerTitle: selectedClassTitle,
    headerLeftContainerStyle: {
      backgroundColor: Platform.OS == "android" ? Colors.accentColor : "",
    },
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={EvilIconsHeaderButton}>
        <Item
          title="Edit"
          iconName="pencil"
          onPress={() => {
            navigationData.navigation.navigate({
              routeName: "EditClass",
              params: {
                class: course,
                updateCourse: updateCourse
              },
            });
          }}
        />
      </HeaderButtons>
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="md-menu"
          onPress={() => {
            navigationData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  tabContainer: {
    flexDirection: "row",
    marginTop: 30,
  },
});

export default ClassScreen;
