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
import { useDispatch } from "react-redux";

import HeaderButton from "../components/HeaderButton";
import Background from "../components/Background";
import StandardButton from "../components/StandardButton";
import Colors from "../constants/Colors";
import EditIcon from "../constants/EditIcon";
import { editCourse } from "../store/actions/courses";

const EditClassScreen = (props) => {
  const course = props.navigation.getParam("class");

  const [courseName, setCourseName] = useState(course.title);
  const [classYear, setClassYear] = useState(course.classYear);
  const [show, setShow] = useState(false);

  const year = Number(course.classYear);

  const dispatch = useDispatch();

  const editCourseHandler = (id, courseName, classYear) => {
    //TODO: https://quickmaths-9472.nodechef.com/updateclass NOTE: Year is a float!
    dispatch(editCourse(id, courseName, classYear));
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
            <Text style={styles.inputField}>{course.courseCode}</Text>
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
                editCourseHandler(course.id, courseName, classYear);
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
