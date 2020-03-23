import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Alert
} from "react-native";

import Background from "../components/Background";
import AppTitle from "../constants/AppTitle";
import StandardButton from "../components/StandardButton";
import LinkButton from '../components/LinkButton';

import { useSelector, useDispatch } from "react-redux";
import * as usersAuthActions from "../store/actions/users";

const LoginScreen = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [submitted, setSubmitted] = useState(false);
  const isTeacher = useSelector(state => state.users.isTeacher);
  const dispatch = useDispatch();
  //Function For An Allert
  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  useEffect(() => {
    //props.navigation.navigate("StudentHomeScreen"); //TODO: Will delete this line and uncomment it when done developing this branch
    if (submitted) {
      if (isTeacher)
        //Teacher Home Page
        props.navigation.navigate("TeacherHomeScreen");
      //Student Home Page
      else props.navigation.navigate("StudentHomeScreen");
    }
  }, [submitted]);

  //Function For Login
  const onLogin = async () => {
    setError(null);
    try {
      await dispatch(usersAuthActions.signIn(email, password));
      //TODO: Please delete uneeded comments like this.
      /*
			const getUserIdentification = await fetch('https://quickmaths-bc73a.firebaseio.com/users.json');
			const resData = await getUserIdentification.json();
			var isTeacher = true;
			for (const key in resData) {
				if (resData[key].email == email) {
					isTeacher = resData[key].teacher;
				}
            }
            */
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
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
          <View style={styles.titleContainer}>
            <AppTitle />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder="Enter Email"
              placeholderTextColor="white"
              autoCapitalize="none"
              onChangeText={text => setEmail(text)}
              value={email}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder="Enter Password"
              placeholderTextColor="white"
              autoCapitalize="none"
              secureTextEntry
              onChangeText={text => setPassword(text)}
              value={password}
            />
          </View>

          <StandardButton text="Login" onTap={onLogin} />
          <LinkButton
            text="Forgot Password?"
            onTap={() => {
              props.navigation.navigate("EmailRecovery");
            }}
          />
          <LinkButton
            text="Not Registered?"
            onTap={() => {
              props.navigation.navigate("Register");
            }}
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
    alignItems: "center"
  },
  titleContainer: {
    paddingBottom: 20
  },
  inputFieldContainer: {
    backgroundColor: "rgba(0,0,0, 0.4)",
    borderRadius: 20,
    width: "75%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 10
  },
  inputField: {
    color: "white",
    fontSize: 20
  }
});

export default LoginScreen;
