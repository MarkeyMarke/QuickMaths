import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Picker,
  Platform,
  Keyboard,
} from "react-native";
import { Item, HeaderButtons } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";
import Background from "../components/Background";
import StandardButton from "../components/StandardButton";
import Colors from "../constants/Colors";
import EditIcon from "../constants/EditIcon";
import { httpTemplate } from "../constants/HttpTemplate";

const EditClassScreen = (props) => {
  const course = props.navigation.getParam("class");

  const [courseName, setCourseName] = useState(course.class_title);
  const [classYear, setClassYear] = useState(course.class_year);
  const [show, setShow] = useState(false);

  const year = course.class_year;

  /**
   * Sends a post request to the app server in order to update a class
   * with a new title and class year
   * @param {String} courseName the new title for the class
   * @param {Number} classYear the new year for the class
   */
  const editCourseHandler = async (courseName, classYear) => {
    try {
      const response = await fetch(
        `https://quickmaths-9472.nodechef.com/updateclass`,
        {
          body: JSON.stringify({
            id: course.id,
            firebase_id: course.firebase_id,
            class_title: courseName,
            class_year: classYear
          }), 
          ...httpTemplate
        }
      );
      const responseJSON = await response.json();
      if (responseJSON.failed) console.log("Couldn't edit class.");//TODO: replace or remove once all testing is done
      else {
        //calls the updateCourse function from the Class Screen in order to update the previous screen with the new info
        props.navigation.state.params.updateCourse({
          class_title: courseName,
          class_year: classYear,
          firebase_id: course.firebase_id,
          id: course.id
        });
      }
    } catch (err) {
      console.log("Edit class fetch has failed."); //TODO: replace or remove once all testing is done
    }
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
            <Text style={styles.inputField}>{course.id}</Text>
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={course.title}
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
              onTap={() => {
                editCourseHandler(courseName, classYear);
                props.navigation.pop();
              }}
              containerStyle={{ width: "85%" }}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </Background>
  );
};

EditClassScreen.navigationOptions = (navData) => {
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
    gestureEnabled: false,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  inputFieldContainer: {
    backgroundColor: "rgba(0,0,0, 0.6)",
    width: "85%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingLeft: 15,
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

export default EditClassScreen;
