import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Picker,
  Text,
  Platform,
  Keyboard,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Item, HeaderButtons } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

import { API_KEY, PROJECT_ID } from 'react-native-dotenv';
import Background from "../components/Background";
import StandardButton from "../components/StandardButton";
import { addCourse } from "../store/actions/courses";
import Colors from "../constants/Colors";
import EditIcon from "../constants/EditIcon";
import { httpTemplate } from "../constants/HttpTemplate";

const AddClassScreen = (props) => {
  const [courseName, setCourseName] = useState("");
  const [classYear, setClassYear] = useState(null);
  const [show, setShow] = useState(false);

  const firebaseToken = useSelector(state => state.users.token);

  const year = new Date().getFullYear();
  const dispatch = useDispatch();

  const addCourseHandler = async (courseName, classYear) => {
    //TODO: https://quickmaths-9472.nodechef.com/createclass NOTE: Year is a float!
    const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idToken: firebaseToken
            })
        }
    );
    if (!response.ok) {
        throw new Error('Something went wrong!');
    }   
    const resData = await response.json();
    var firebaseId = resData.users[0].localId;
    try {
        const response = await fetch(
          `https://quickmaths-9472.nodechef.com/createclass`,
          {
            body: JSON.stringify({
              firebase_id: firebaseId,
              class_title: courseName,
              class_year: Number.parseFloat(classYear)
            }), 
            ...httpTemplate
          }
        );
        const responseJSON = await response.json();
        if (responseJSON.failed) {
            console.log("Couldn't add class.");
            console.log(convertedYear);
        }
        else {
          console.log("Added class!");
          console.log(responseJSON);
        }
      } catch (err) {
        console.log("Add class fetch has failed.");
        console.log(err);
      }
    dispatch(addCourse(courseName, classYear));
  };

  return (
    <Background>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.screen}>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder="Enter Course Name"
              placeholderTextColor="white"
              onChangeText={(text) => setCourseName(text)}
              value={courseName}
            />
            <EditIcon />
          </View>
          {classYear ? (
            <TouchableWithoutFeedback
              onPress={() => {
                setShow(true);
              }}
            >
              <View style={styles.inputFieldContainer}>
                <Text style={styles.inputField}>Class of {classYear}</Text>
                <EditIcon />
              </View>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => {
                setShow(true);
              }}
            >
              <View style={styles.inputFieldContainer}>
                <Text style={styles.inputField}>Class of xxxx</Text>
                <EditIcon />
              </View>
            </TouchableWithoutFeedback>
          )}
          {show && (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={classYear}
                onValueChange={(itemValue, itemPosition) => {
                  setClassYear(itemValue);
                  if (Platform.OS == "android") {
                    setShow(false);
                  }
                }}
                mode="dropdown"
                itemStyle={{ color: Colors.primaryColor }}
              >
                <Picker.Item
                  label={(year - 1).toString()}
                  value={(year - 1).toString()}
                />
                <Picker.Item label={year.toString()} value={year.toString()} />
                <Picker.Item
                  label={(year + 1).toString()}
                  value={(year + 1).toString()}
                />
              </Picker>
              {Platform.OS == "ios" && (
                <StandardButton
                  text="Set Class Year"
                  onTap={() => {
                    setShow(false);
                  }}
                  containerStyle={{ alignSelf: "center" }}
                />
              )}
            </View>
          )}
          {!show && (
            <StandardButton
              text="Save"
              onTap={async () => {
                await addCourseHandler(courseName, classYear);
                props.navigation.replace("TeacherHomeScreen");
              }}
              containerStyle={{ width: "85%" }}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </Background>
  );
};

AddClassScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Courses",
    headerLeftContainerStyle: {
      backgroundColor: Platform.OS == "android" ? Colors.accentColor : "",
    },
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
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  inputFieldContainer: {
    backgroundColor: "rgba(0,0,0, 0.4)",
    width: "85%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 10,
  },
  inputField: {
    color: "white",
    fontSize: 20,
  },
  pickerContainer: {
    backgroundColor: "white",
    width: "85%",
    color: Colors.primaryColor,
    marginTop: 10,
  },
});

export default AddClassScreen;
