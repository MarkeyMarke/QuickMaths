import React from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { DrawerItems } from "react-navigation-drawer";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import StandardButton from "./StandardButton";
import { signOut } from "../store/actions/users";
import { getFirebaseID } from "../constants/FirebaseID";
import { httpTemplate } from "../constants/HttpTemplate";
import CustomAlert from "../constants/CustomAlert";

const CustomDrawer = (props) => {
  const isTeacher = useSelector((state) => state.users.isTeacher);
  const firebaseToken = useSelector(state => state.users.token);
  const dispatch = useDispatch();

  const signOutHandler = () => {
    dispatch(signOut());
  };

  const homePageHandler = () => {
    if (isTeacher)
      //Teacher Home Page
      props.navigation.navigate("TeacherHomeScreen");
    //Student Home Page
    else props.navigation.navigate("StudentHomeScreen");
  };

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
        props.navigation.navigate({
          routeName: "StudentHomeScreen",
          params: {refresh: true}
        });
      }
    } catch (err) {
      CustomAlert("Connection Error", "Please Try Again Later", "Okay");
    }
  }

  return (
    <ScrollView>
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: "always", horizontal: "never" }}
      >
        <DrawerItems
          {...props}
          getLabel={(scene) =>
            props.getLabel(scene) !== null ? (
              <View style={styles.button}>
                <Text style={styles.label}>{props.getLabel(scene)}</Text>
              </View>
            ) : null
          }
        />
        {isTeacher ? null : (
          <StandardButton
            text="Leave Class"
            onTap={leaveClass}
            buttonStyle={styles.button}
            containerStyle={styles.container}
          />
        )}
        <StandardButton
          text={isTeacher ? "Classes" : "Assignments"}
          onTap={() => homePageHandler()}
          buttonStyle={styles.button}
          containerStyle={styles.container}
        />
        <StandardButton
          text="Sign Out"
          onTap={() => {
            signOutHandler();
            props.navigation.navigate("Home");
          }}
          buttonStyle={styles.button}
          containerStyle={styles.container}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  label: {
    color: "white",
    fontSize: 25,
  },
  button: {
    backgroundColor: Colors.primaryColor,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 40,
    marginTop: 10,
  },
});

export default CustomDrawer;
