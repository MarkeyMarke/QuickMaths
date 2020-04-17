import React from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { DrawerItems } from "react-navigation-drawer";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import StandardButton from "./StandardButton";
import { signOut } from "../store/actions/users";

const CustomDrawer = (props) => {
  const isTeacher = useSelector((state) => state.users.isTeacher);
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

  //TODO: https:///quickmaths-9472.nodechef.com/leaveclass Input: { firebase_id: (studentid) } Output: Failed yes/no

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
            onTap={() => {
              console.log("Left the class!");
            }}
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
