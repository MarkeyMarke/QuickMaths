import React, { useState, useEffect } from "react";
import { View, ImageBackground, StyleSheet, Platform } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { useSelector, useDispatch } from "react-redux";

import { API_KEY, PROJECT_ID } from 'react-native-dotenv';
import { COURSES } from "../data/dummy-data";
import ListItem from "../components/ListItem";
import { Item, HeaderButtons } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import AddListItemButton from "../components/AddListItemButton";
import { deleteCourse, setCourse } from "../store/actions/courses";
import Loading from "../constants/Loading";
import { httpTemplate } from "../constants/HttpTemplate";

const TeacherHomeScreen = (props) => {
  const [refresh, setRefresh] = useState(false);
  const [classes, setClasses] = useState(null); 
  const courses = useSelector((state) => state.courses.courses);
  const firebaseToken = useSelector(state => state.users.token);
  

  const dispatch = useDispatch();

  const deleteCourseHandler = async (id) => {
    //TODO: https://quickmaths-9472.nodechef.com/deleteclass
    try {
      const response = await fetch(
        `https://quickmaths-9472.nodechef.com/deleteclass`,
        {
          body: JSON.stringify({
            id: Number.parseInt(id)
          }), 
          ...httpTemplate
        }
      );
      const responseJSON = await response.json();
      if (responseJSON.failed) console.log("Couldn't delete class.");
      else {
        console.log("Deleted class!");
        console.log(responseJSON);
      }
    } catch (err) {
      console.log("Delete class fetch has failed.");
    }
    setClasses(classes.filter((o) => {return o.id != id;}));
    dispatch(deleteCourse(id));
  };

  const fetchData = async () => {
    //TODO: https://quickmaths-9472.nodechef.com/getclasses
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
        `https://quickmaths-9472.nodechef.com/getclasses`,
        {
          body: JSON.stringify({
            firebase_id: firebaseId
          }), 
          ...httpTemplate
        }
      );
      const responseJSON = await response.json();
      if (responseJSON.failed) console.log("Couldn't find classes.");
      else {
        console.log("Retrieved classes!");
        console.log(responseJSON);
        setClasses(responseJSON);
      }
    } catch (err) {
      console.log("Class info fetch has failed.");
    }
    dispatch(setCourse(COURSES));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderListItem = (itemData) => {
    return (
      <ListItem
        topText={itemData.item.class_title}
        middleText={"Class of " + itemData.item.class_year}
        bottomText={itemData.item.id}
        onSelect={() => {
          props.navigation.navigate({
            routeName: "Class",
            params: {
              class: itemData.item,
              refresh: doRefresh,
            },
          });
        }}
        icon={<Ionicons name="ios-play" size={75} color="white" />}
      />
    );
  };

  const doRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <ImageBackground
      source={{
        uri:
          "https://www.trainingzone.co.uk/sites/default/files/styles/inline_banner/public/elenaleonova-books.jpg?itok=IKaBmw_i",
      }}
      style={styles.backgroundImage}
      blurRadius={3}
      resizeMode="cover"
    >
      {!classes ? (
        <Loading />
      ) : (
        <SwipeListView
          keyExtractor={(item, index) => item.id.toString()}
          data={classes}
          renderItem={renderListItem}
          renderHiddenItem={(data, rowMap) => (
            <View style={styles.backRow}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => deleteCourseHandler(data.item.id)}
                >
                  <Ionicons name="ios-trash" size={75} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          leftOpenValue={100}
          ListFooterComponent={
            <AddListItemButton
              text="Create class"
              onSelect={() => {
                props.navigation.replace("AddClass");
              }}
            />
          }
        />
      )}
    </ImageBackground>
  );
};

TeacherHomeScreen.navigationOptions = (navData) => {
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
  backRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: "red",
    width: 75,
    left: 45,
    justifyContent: "center",
    marginTop: 20,
    borderRadius: 10,
  },
  backButton: {
    alignItems: "center",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
});

export default TeacherHomeScreen;
