import React, { useState, useEffect } from "react";
import {View, Text, StyleSheet, FlatList, ActivityIndicator, Platform } from "react-native";
import { useSelector} from "react-redux";

import Colors from "../constants/Colors";
import { Item, HeaderButtons } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import Background from "../components/Background";
import ListItem from "../components/ListItem";
import { Ionicons } from "@expo/vector-icons";
import NoClass from "../components/NoClass";
import PendingClass from "../components/PendingClass";
import { httpTemplate } from "../constants/HttpTemplate";
import { getFirebaseID } from "../constants/FirebaseID";
import StudentAssignment from "../models/StudentAssignment";

const StudentHomeScreen = props => {
  const refreshFromDrawer = props.navigation.getParam("refresh");
  const status = {
      NONE: 'none',
      PENDING: 'pending',
      ACCEPTED: 'accepted'
  };
  
  const [currentStatus, setCurrentStatus] = useState(null);
  const [assignments, setAssignments] = useState(null);
  const firebaseToken = useSelector(state => state.users.token);

  useEffect(() => {
    fetchData();
  }, []);

  
  /**
   * Sends a post request, containing the student's firebase id, and receives
   * a response containing an object with an array with the class assignments 
   * and the student's status, or an object with a failed parameter.
   */
  const fetchData = async () => {
    var firebaseId = await getFirebaseID(firebaseToken);
    try {
      const response = await fetch(
        `https://quickmaths-9472.nodechef.com/getstudentassignments`,
        {
          body: JSON.stringify({
            firebase_id: firebaseId
          }), 
          ...httpTemplate
        }
      );
      const responseJSON = await response.json();
      if (responseJSON.failed) console.log("Couldn't find student assignments."); //TODO: replace or remove once all testing is done
      else {
        if(responseJSON.status === status.NONE){
          setCurrentStatus(status.NONE);
        }
        else if(responseJSON.status === status.PENDING){
          setCurrentStatus(status.PENDING);
        }
        else{
          var convertedAssignments = [];
          responseJSON.assignments.forEach(item => {
          convertedAssignments.push(new StudentAssignment(item.assignment_id.toString(), item.name, item.due_date, item.assignment_progress, item.number_of_questions));
          });
          setAssignments(convertedAssignments);
          setCurrentStatus(status.ACCEPTED);
        }
      }
    } catch (err) {
      console.log("Class info fetch has failed."); //TODO: replace or remove once all testing is done
      console.log(err);
    }
  };

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

  if(refreshFromDrawer){
    fetchData()
  }

  let renderComponent;

	switch (currentStatus){
		case status.NONE:
			renderComponent = 
			<NoClass setStatus={() => setCurrentStatus(status.PENDING)}/>
			break;
		case status.PENDING:
			renderComponent = 
      <PendingClass 
        setStatus={() => setCurrentStatus(status.ACCEPTED)}
        onCancel={() => setCurrentStatus(status.NONE)} 
      />
			break;
		case status.ACCEPTED:
      renderComponent = 
      <FlatList
          keyExtractor={(item, index) => item.id}
          data={assignments}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={
            <View style={styles.screen}>
              <Text style={styles.emptyText}>No Assignments yet!</Text>
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
  },
  emptyText: {
    color: "black",
    fontSize: 25
  }
});

StudentHomeScreen.navigationOptions = navData => {
  return {
    headerTitle: "Assignments",
    headerLeftContainerStyle: {
      backgroundColor: Platform.OS == "android" ? Colors.accentColor : ""
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
