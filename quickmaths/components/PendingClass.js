import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  ScrollView,
} from "react-native";

import { useSelector} from "react-redux";

import Background from "./Background";
import StandardButton from "./StandardButton";
import { getFirebaseID } from "../constants/FirebaseID";
import { httpTemplate } from "../constants/HttpTemplate";
import CustomAlert from "../constants/CustomAlert";

const PendingClass = (props) => {
  const [refreshing, setRefreshing] = useState(false);

  const firebaseToken = useSelector(state => state.users.token);
 
  /**
   * Sends a post request to the app server that will remove the 
   * user's request to join the class.
   */
  const leaveClass = async() => {
    var firebaseId = await getFirebaseID(firebaseToken);
    try {
      const response = await fetch(
        `https://quickmaths-9472.nodechef.com/leaveclass`,
        {
          body: JSON.stringify({
            firebase_id: firebaseId
          }), 
          ...httpTemplate
        }
      );
      const responseJSON = await response.json();
      if (responseJSON.failed) CustomAlert("Something Unexpected Happened", "Please Try Again Later", "Okay");
      else {
        props.onCancel();
      }
    } catch (err) {
      CustomAlert("Connection Error", "Please Try Again Later", "Okay");
    }
  }

   //Will call this function when user pulls down the screen to refresh
  const onRefresh = async() => {
    setRefreshing(true);
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
      if (responseJSON.failed) CustomAlert("Something Unexpected Happened", "Please Try Again Later", "Okay");
      else {
        console.log(responseJSON);
        if(responseJSON.status === "accepted"){
          setRefreshing(false);
          props.setStatus();
        }
      }
    } catch (err) {
      CustomAlert("Connection Error", "Please Try Again Later", "Okay");
    }
    setRefreshing(false);
  };

  return (
    <Background>
      <SafeAreaView style={styles.screen}>
        <ScrollView
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.textContainer}>
            <Text style={styles.text}>You're trying to join _.</Text>
            <Text style={styles.text}>
              Please ask your teacher to let you in!
            </Text>
          </View>
          <StandardButton
            text="Cancel"
            onTap={leaveClass}
          />
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "white",
  },
});

export default PendingClass;
