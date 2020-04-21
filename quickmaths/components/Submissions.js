import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { STUDENT_REMAINING } from "../data/dummy-data";
import { COURSE_ASSIGNMENTS } from "../data/dummy-data";
import TabButton from "./TabButton";
import ListItem from "./ListItem";
import Colors from "../constants/Colors";
import Loading from "../constants/Loading";

const Submissions = (props) => {
  //Used for conditional rendering between two sub-screens
  const [isStudentRemainingActive, setIsStudentRemainingActive] = useState(
    false
  );
  //TODO: Drop these states in favor of the schema provided by MySQL Fetch
  const [studentsRemaining, setStudentsRemaining] = useState(null);
  const [courseAssignments, setCourseAssignments] = useState(null);

  //TODO: Move these into a useEffect in the two sub-components
  const fetchData = async () => {
    //TODO: https://quickmaths-9472.nodechef.com/getteacherstudentprogress, Input: classID, Output: [{ assignment_id*,(assignment)name*,due_date,count* }], NOTE: If Mark isn't done with query yet, make dummy data
    //TODO: https://quickmaths-9472.nodechef.com/getincompleteassgn, Input: assignmentID, Output: [{ firebase_id*, (student)name*, school_id*, email, isComplete* }]
    setStudentsRemaining(STUDENT_REMAINING);
    setCourseAssignments(COURSE_ASSIGNMENTS);
  };

  //Don't need this here anymore (the two sub-components will do it)
  useEffect(() => {
    fetchData();
  }, []);

  const renderSubmissionListItem = (itemData) => {
    return (
      <View>
        <ListItem
          topText={itemData.item.title}
          middleText={"Due " + itemData.item.dueDate}
          bottomText={itemData.item.submissions + " submissions missing"}
          bottomTextStyle={{ fontStyle: "italic" }}
          containerStyle={{ width: "97.5%", marginTop: 10 }}
          onSelect={() => {
            setIsStudentRemainingActive(true);
          }}
          icon={<Ionicons name="ios-play" size={75} color="white" />}
        />
      </View>
    );
  };

  const renderStudentRemainingList = (itemData) => {
    var str2 = "Incompleted";
    if (itemData.item.assignment === str2) {
      return (
        <ListItem
          topText={itemData.item.name}
          middleText={itemData.item.studentid}
          bottomText={itemData.item.assignment}
          bottomTextStyle={{ fontStyle: "italic" }}
          containerStyle={{ width: "95.5%", marginTop: 10 }}
          icon={<Ionicons name="md-close-circle" size={70} color="white" />}
        />
      );
    } else {
      return (
        <ListItem
          topText={itemData.item.name}
          middleText={itemData.item.studentid}
          bottomText={itemData.item.assignment}
          bottomTextStyle={{ fontStyle: "italic" }}
          containerStyle={{ width: "95.5%", marginTop: 10 }}
          icon={<Ionicons name="md-checkmark-circle" size={70} color="white" />}
        />
      );
    }
  };

  if (!studentsRemaining) {
    return <Loading />;
  }

  //TODO: Make a separate sub-component for rendering the list of "list of assignments with missing count" vs "list of students showing done or not"
  return (
    <View>
      {isStudentRemainingActive ? (
        <View>
          <View style={styles.simpleBackLabel}>
            <TabButton
              active={isStudentRemainingActive}
              onTap={() => {
                setIsStudentRemainingActive(false);
              }}
            >
              <Ionicons name="ios-play" size={35} style={styles.icon} />
            </TabButton>
            <Text style={styles.simpleAdditionText}>Simple Addition HW</Text>
          </View>
          <FlatList
            keyExtractor={(item, index) => item.id}
            data={studentsRemaining}
            renderItem={renderStudentRemainingList}
          />
        </View>
      ) : (
        <FlatList
          keyExtractor={(item, index) => item.id}
          data={courseAssignments}
          renderItem={renderSubmissionListItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    transform: [{ rotateY: "180deg" }],
    color: "white",
    marginLeft: -30,
  },
  simpleBackLabel: {
    width: "95%",
    height: "5%",
    marginLeft: 10,
    marginTop: 10,
    borderColor: "transparent",
    backgroundColor: Colors.primaryColor,
    flexDirection: "row",
  },
  simpleAdditionText: {
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 45,
    marginTop: 10,
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default Submissions;
