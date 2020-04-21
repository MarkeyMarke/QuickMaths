import React, { useState, useEffect } from "react";
import { View, FlatList} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import ListItem from "./ListItem";
import Loading from "../constants/Loading";
import { httpTemplate } from "../constants/HttpTemplate";

const AssignmentSubmissionList = (props) => {
    const [assignments, setAssignments] = useState(null);

    const course = props.navigation.getParam("class");
    
    /**
     * Sends a post request to the app server, containing a class id, that receives
     * an array of assignment objects from the pertaining class. 
     */
    const fetchData = async () => {
        try {
            const response = await fetch(
              `https://quickmaths-9472.nodechef.com/getteacherstudentprogress`,
              {
                body: JSON.stringify({
                  class_id: course.id
                }), 
                ...httpTemplate
              }
            );
            const responseJSON = await response.json();
            if (responseJSON.failed) console.log("Couldn't get teacher student progress."); //TODO: replace or remove once all testing is done
            else {
                console.log(responseJSON);
                setAssignments(responseJSON);
            }
          } catch (err) {
            console.log("Teacher student progress fetch has failed."); //TODO: replace or remove once all testing is done
            console.log(err);
        }
    };
    
    useEffect(() => {
    fetchData();
    }, []);
    
    const renderAssignmentListItem = (itemData) => {
        return (
          <View>
            <ListItem
              topText={itemData.item.assignment_name}
              middleText={itemData.item.missing_submissions + " submissions missing"}
              middleTextStyle={{ fontStyle: "italic" }}
              containerStyle={{ width: "97.5%", marginTop: 10 }}
              onSelect={() => {
                props.saveAssignment(itemData.item);
                props.goToStudentAssignmentProgress();
              }}
              icon={<Ionicons name="ios-play" size={75} color="white" />}
            />
          </View>
        );
      };

    if (!assignments) {
        return <Loading />;
    }

    return (
        <FlatList
          keyExtractor={(item, index) => item.assignment_id.toString()}
          data={assignments}
          renderItem={renderAssignmentListItem}
        />
    );
}

export default AssignmentSubmissionList;