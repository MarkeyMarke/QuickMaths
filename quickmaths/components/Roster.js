import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import {useDispatch } from "react-redux";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { AntDesign } from "@expo/vector-icons";

import SwipeableList from "../components/SwipeableList";
import ListItem from "../components/ListItem";
import Colors from "../constants/Colors";
import Loading from "../constants/Loading";
import { httpTemplate } from "../constants/HttpTemplate";

const Roster = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [roster, setRoster] = useState(null);
  const [requests, setRequests] = useState(null);

  const course = props.navigation.getParam("class");

  useEffect(() => {
    fetchData();
  }, [selectedIndex]);

  /**
   * Sends one of two post requests to the app server with the course id depening on which tab is selected.
   * A response is returned containing either an array of students that have been accepted to the class,
   * an array of student requests to join the class, or a failure value. 
   */
  const fetchData = async () => {
    if(selectedIndex === 0){
      try {
        const response = await fetch(
          `https://quickmaths-9472.nodechef.com/viewroster`,
          {
            body: JSON.stringify({
              id: course.id
            }), 
            ...httpTemplate
          }
        );
        const responseJSON = await response.json();
        if (responseJSON.failed) console.log("Couldn't find roster info."); //TODO: replace or remove once all testing is done
        else {
          setRoster(responseJSON);
        }
      } catch (err) {
        console.log("Roster info fetch has failed."); //TODO: replace or remove once all testing is done
      }
    } else {
      try {
        const response = await fetch(
          `https://quickmaths-9472.nodechef.com/viewrosterrequests`,
          {
            body: JSON.stringify({
              id: course.id
            }), 
            ...httpTemplate
          }
        );
        const responseJSON = await response.json();
        if (responseJSON.failed) console.log("Couldn't find roster requests."); //TODO: replace or remove once all testing is done
        else {
          setRequests(responseJSON);
        }
      } catch (err) {
        console.log("Roster request info fetch has failed."); //TODO: replace or remove once all testing is done
      }
    }
  };

  /**
   * Sends a post request with a student's firebase id to the app server that will remove 
   * the provided student from the class roster. 
   * @param {Object} item the student object the will be removed from the class roster
   *  
   */
  const removeUser = async(item) => {
    try {
      const response = await fetch(
        `https://quickmaths-9472.nodechef.com/leaveclass`,
        {
          body: JSON.stringify({
            firebase_id: item.firebase_id
          }), 
          ...httpTemplate
        }
      );
      const responseJSON = await response.json();
      if (responseJSON.failed) console.log("Couldn't remove the user."); //TODO: replace or remove once all testing is done
    } catch (err) {
      console.log("Remove user fetch has failed."); //TODO: replace or remove once all testing is done
    }
  }; 

  /**
   * Sends a post request, containing a student's firebase id and the course id, that will accept
   * a student's request and add them to the class roster.
   * @param {Object} item the student request object that will be accepted
   */
  const acceptRequest = async(item) => {
    try {
      const response = await fetch(
        `https://quickmaths-9472.nodechef.com/acceptrequest`,
        {
          body: JSON.stringify({
            firebase_id: item.firebase_id,
            id: course.id
          }), 
          ...httpTemplate
        }
      );
      const responseJSON = await response.json();
      if (responseJSON.failed) console.log("Couldn't accept the request."); //TODO: replace or remove once all testing is done
      else {
        setRequests(requests.filter((o) => {return o.firebase_id != item.firebase_id;}));
      }
    } catch (err) {
      console.log("The accept request fetch has failed."); //TODO: replace or remove once all testing is done
    }
  }

  const renderStudentListItem = (itemData) => {
    return (
      <ListItem
        topText={itemData.item.name}
        middleText={itemData.item.school_id}
        bottomText={itemData.item.email}
        bottomTextStyle={{ fontStyle: "italic" }}
        containerStyle={styles.listItemContainerStyle}
        buttonContainerStyle={{ marginTop: 15, marginLeft: 15 }}
      />
    );
  };

  const renderStudentRequestListItem = (itemData) => {
    return (
      <ListItem
        topText={itemData.item.name}
        middleText={itemData.item.school_id}
        bottomText={itemData.item.email}
        bottomTextStyle={{ fontStyle: "italic" }}
        containerStyle={styles.listItemContainerStyle}
        onSelect={() => {
          acceptRequest(itemData.item);
        }}
        icon={<AntDesign name="plus" size={50} color="white" />}
        buttonContainerStyle={{ marginTop: 15, marginLeft: 15 }}
      />
    );
  };

  return (
    <View>
      <SegmentedControlTab
        values={["Roster", "Requests"]}
        selectedIndex={selectedIndex}
        onTabPress={(index) => {
          setSelectedIndex(index);
        }}
        tabsContainerStyle={styles.segmentedTabsContainerStyle}
        tabStyle={styles.segmentedTabStyle}
        tabTextStyle={styles.segmentedTabTextStyle}
        borderRadius={0}
        activeTabStyle={styles.segmentedActiveTabStyle}
      />
      {selectedIndex === 0 ? (
        !roster ? <Loading/> :
        <SwipeableList
          keyExtractor={(item, index) => item.firebase_id}
          data={roster}
          listEmptyComponent={
            <View style={styles.emptyTextContainer}>
              <Text style={styles.emptyText}>No Students yet!</Text>
            </View>
          }
          renderItem={renderStudentListItem}
          onDelete={(item) => {
            removeUser(item);
            setRoster(requests.filter((o) => {return o.firebase_id != item.firebase_id;}));
          }}
          buttonContainerStyle={styles.deleteButtonContainer}
        />
      ) : (
        !requests ? <Loading/> :
        <SwipeableList
          keyExtractor={(item, index) => item.firebase_id}
          data={requests}
          renderItem={renderStudentRequestListItem}
          listEmptyComponent={
            <View style={styles.emptyTextContainer}>
              <Text style={styles.emptyText}>No Requests!</Text>
            </View>
          }
          onDelete={(item) => {
            removeUser(item);
            setRequests(requests.filter((o) => {return o.firebase_id != item.firebase_id;}));
          }}
          buttonContainerStyle={styles.deleteButtonContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  emptyTextContainer: {
    alignItems:"center",
    marginTop: 10
  },
  emptyText: {
    fontSize: 25,
    color: "white"
  },
  deleteButtonContainer: {
    marginTop: 10,
  },
  listItemContainerStyle: {
    width: "95%",
    marginTop: 10,
  },
  segmentedTabsContainerStyle: {
    width: "95%",
    marginTop: 10,
  },
  segmentedTabStyle: {
    backgroundColor: Colors.accentColor,
    borderColor: "transparent",
  },
  segmentedTabTextStyle: {
    color: "white",
  },
  segmentedActiveTabStyle: {
    backgroundColor: Colors.primaryColor,
  },
});

export default Roster;
