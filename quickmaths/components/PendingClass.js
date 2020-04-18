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
      if (responseJSON.failed) console.log("Couldn't leave the class."); //TODO: replace or remove once all testing is done
      else {
        props.onCancel();
      }
    } catch (err) {
      console.log("Add user fetch has failed."); //TODO: replace or remove once all testing is done
    }
  }

   //Will call this function when user pulls down the screen to refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => {
      setRefreshing(false);
      props.setStatus();
    });
  }, [refreshing]);

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

//will remove once fetch request is set up
function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

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
