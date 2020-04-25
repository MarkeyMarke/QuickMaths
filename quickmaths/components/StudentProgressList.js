import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import TabButton from "./TabButton";
import ListItem from "./ListItem";
import Colors from "../constants/Colors";
import Loading from "../constants/Loading";
import { httpTemplate } from "../constants/HttpTemplate";
import CustomAlert from "../constants/CustomAlert";

const StudentProgressList = (props) => {
    const [students, setStudents] = useState(null);
    
    /**
     * Sends a post request, containing an assignment id, and receives an array
     * of student objects.
     */
    const fetchData = async () => {
        try {
            const response = await fetch(
            `https://quickmaths-9472.nodechef.com/getincompleteassgn`,
            {
                body: JSON.stringify({
                    id: props.assignment.assignment_id
                }), 
                ...httpTemplate
            }
            );
            const responseJSON = await response.json();
            if (responseJSON.failed) CustomAlert("Something Unexpected Happened", "Please Try Again Later", "Okay");
            else {
                setStudents(responseJSON);
            }
        } catch (err) {
          CustomAlert("Connection Error", "Please Try Again Later", "Okay");
        }
    };

  useEffect(() => {
    fetchData();
  }, []);

  const renderStudentRemainingList = (itemData) => {
    if (!itemData.item.isComplete) {
      return (
        <ListItem
          topText={itemData.item.name}
          middleText={itemData.item.school_id}
          bottomText={itemData.item.email}
          bottomTextStyle={{ fontStyle: "italic" }}
          containerStyle={{ width: "95.5%", marginTop: 10 }}
          icon={<Ionicons name="md-close-circle" size={70} color="white" />}
        />
      );
    } else {
      return (
        <ListItem
          topText={itemData.item.name}
          middleText={itemData.item.school_id}
          bottomText={itemData.item.email}
          bottomTextStyle={{ fontStyle: "italic" }}
          containerStyle={{ width: "95.5%", marginTop: 10 }}
          icon={<Ionicons name="md-checkmark-circle" size={70} color="white" />}
        />
      );
    }
  };

  if(!students){
    return <Loading/>
  }

  return(
    <View>
        <View style={styles.simpleBackLabel}>
        <TabButton
            active={true}
            onTap={() => {
                props.goToAssignmentSubmission();
            }}
        >
            <Ionicons name="ios-play" size={35} style={styles.icon} />
        </TabButton>
        <Text style={styles.simpleAdditionText}>{props.assignment.assignment_name}</Text>
        </View>
        <FlatList
            keyExtractor={(item, index) => item.firebase_id}
            data={students}
            renderItem={renderStudentRemainingList}
        />
    </View>
  );
}

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

export default StudentProgressList;