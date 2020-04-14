import React, { useState, useEffect } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Background from "../components/Background";
import BackButton from "../constants/BackButton";
import TabButton from "../components/TabButton";
import { deleteAssignment, setAssignment } from "../store/actions/assignments";
import Colors from "../constants/Colors";
import { Item, HeaderButtons } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import EvilIconsHeaderButton from "../components/EvilIconsHeaderButton";
import AssignmentList from "../components/AssignmentList";
import Roster from "../components/Roster";
import Submissions from "../components/Submissions";
import { COURSE_ASSIGNMENTS } from "../data/dummy-data";
import Loading from "../constants/Loading";
import { httpTemplate } from "../constants/HttpTemplate";
import Assignment from "../models/Assignment";

const ClassScreen = (props) => {
  const components = {
    ASSIGNMENTS: "assignments",
    SUBMISSIONS: "submissions",
    ROSTER: "roster",
  };

  const [activeComponent, setActiveComponent] = useState(
    components.ASSIGNMENTS
  );

  const course = props.navigation.getParam("class");

  const [courseAssignments, setCourseAssignments] = useState(null); 
  const dispatch = useDispatch();

  const deleteAssignmentHandler = (item) => {
    //TODO: https:///quickmaths-9472.nodechef.com/deleteassignment
    dispatch(deleteAssignment(item.id));
  };

  const fetchData = async () => {
    //TODO: https://quickmaths-9472.nodechef.com/viewclass NOTE: Make a new model for this specific assignment format
    try {
      const response = await fetch(
        `https://quickmaths-9472.nodechef.com/viewclass`,
        {
          body: JSON.stringify({
            class_id: course.id
          }), 
          ...httpTemplate
        }
      );
      const responseJSON = await response.json();
      if (responseJSON.failed) console.log("Couldn't find Assignments.");
      else {
        console.log("Retrieved Assignments!");
        console.log(responseJSON);
        var convertedAssignments = [];
        responseJSON.forEach(item => {
          convertedAssignments.push(new Assignment(item.id.toString(), item.name, item.due_date, item.pub_date, 0));
        });
        setCourseAssignments(convertedAssignments);
      }
    } catch (err) {
      console.log("Assignment info fetch has failed.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  let renderComponent;

  switch (activeComponent) {
    case components.ASSIGNMENTS:
      renderComponent = (
        <AssignmentList
          courseAssignments={courseAssignments}
          deleteAssignmentHandler={deleteAssignmentHandler}
          navigation={props.navigation}
        />
      );
      break;
    case components.SUBMISSIONS:
      renderComponent = <Submissions courseAssignments={courseAssignments} />;
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
        {!courseAssignments ? <Loading /> : renderComponent}
      </View>
    </Background>
  );
};

ClassScreen.navigationOptions = (navigationData) => {
  const course = navigationData.navigation.getParam("class");
  const selectedClassTitle = course.class_title;
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
