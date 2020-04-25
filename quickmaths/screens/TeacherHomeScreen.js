import React, { useState, useEffect } from "react";
import { View, StyleSheet, Platform} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { useSelector} from "react-redux";

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
import { getFirebaseID } from "../constants/FirebaseID";
import Background from "../components/Background";
import CustomAlert from "../constants/CustomAlert";

const TeacherHomeScreen = (props) => {
  const [refresh, setRefresh] = useState(false);
  const [classes, setClasses] = useState(null); 
  const firebaseToken = useSelector(state => state.users.token);

  //calls the fetchData function whenever the refresh state is updated
  useEffect(() => {
    fetchData();
  }, [refresh]);

  /**
   * Sends a post request to the server containing the id of the class that will
   * be deleted in the database. 
   * @param {number} id the class id of the class that will be deleted
   */
  const deleteCourseHandler = async (id) => {
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
      if (responseJSON.failed) CustomAlert("Something Unexpected Happened", "Please Try Again Later", "Okay");
      else {
        // reflects the deletion in the UI if the request is successful
        setClasses(classes.filter((o) => {return o.id != id;}));
      }
    } catch (err) {
      CustomAlert("Connection Error", "Please Try Again Later", "Okay");
    }
  };

  /**
   * Grabs the user's firebaseId from Firebase to confirm user's current session
   * is active and uses this id in a post request to the app server to grab 
   * all the classes belonging to the user from the database.
   */
  const fetchData = async () => {
		var firebaseId = await getFirebaseID(firebaseToken);
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
      if (responseJSON.failed) CustomAlert("Something Unexpected Happened", "Please Try Again Later", "Okay"); //TODO: replace or remove once all testing is done
      else {
        setClasses(responseJSON);
      }
    } catch (err) {
      CustomAlert("Connection Error", "Please Try Again Later", "Okay");
    }
  };

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
    <Background>
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
    </Background>
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
