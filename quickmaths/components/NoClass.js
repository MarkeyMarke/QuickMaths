import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { useSelector} from "react-redux";

import Background from "./Background";
import StandardButton from "./StandardButton";
import { getFirebaseID } from "../constants/FirebaseID";
import { httpTemplate } from "../constants/HttpTemplate";
import CustomAlert from "../constants/CustomAlert";

const NoClass = (props) => {
  const [courseCode, setCourseCode] = useState("");
  const firebaseToken = useSelector(state => state.users.token);
  
  /**
   * Sends a post request to the app server with the body containing 
   * the user's firebaseid and the course code of the class they want
   * to join.
   */
  const addUser = async() => {
    var firebaseId = await getFirebaseID(firebaseToken);
    try {
      const response = await fetch(
        `https://quickmaths-9472.nodechef.com/adduser`,
        {
          body: JSON.stringify({
            id: Number.parseInt(courseCode),
            firebase_id: firebaseId
          }), 
          ...httpTemplate
        }
      );
      const responseJSON = await response.json();
      if (responseJSON.failed){
        CustomAlert("Sorry", "That class code does not exist.", "OK");
        setCourseCode("");
      } 
      else {
        props.setStatus(); //switches to the next component
      }
    } catch (err) {
      CustomAlert("Connection Error", "Please Try Again Later", "Okay");
    }
  }
  return (
    <Background>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.screen}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Looks like you're not in a class yet.
            </Text>
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder="Enter class code"
              placeholderTextColor="white"
              onChangeText={(text) => setCourseCode(text)}
              value={courseCode}
            />
          </View>
          <StandardButton
            text="Join"
            onTap={addUser}
          />
        </View>
      </TouchableWithoutFeedback>
    </Background>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "white",
  },
  inputFieldContainer: {
    backgroundColor: "rgba(0,0,0, 0.4)",
    width: "75%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 10,
    borderRadius: 20,
  },
  inputField: {
    color: "white",
    fontSize: 20,
  },
});

export default NoClass;
