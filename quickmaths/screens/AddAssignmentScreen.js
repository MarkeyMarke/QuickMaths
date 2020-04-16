import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  Text,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import Background from "../components/Background";
import EditIcon from "../constants/EditIcon";
import AddListItemButton from "../components/AddListItemButton";
import Question from "../models/Question";
import ListItem from "../components/ListItem";
import { EvilIcons } from "@expo/vector-icons";
import StandardButton from "../components/StandardButton";
import Loading from "../constants/Loading";
import { httpTemplate } from "../constants/HttpTemplate";

const AddAssignmentScreen = (props) => {
  const item = props.navigation.getParam("assignment");

  const [assignmentName, setAssignmentName] = item
    ? useState(item.title)
    : useState("");
  const [questions, setQuestions] = useState(null);
  const [questionID, setQuestionID] = useState(null);
  const [assignmentID, setAssignmentID] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [date, setDate] = item ? useState(item.createDueDate()) : useState(new Date());
  const [show, setShow] = useState(false);
  const [dateText, setDateText] = item
    ? useState(item.getDateText(item.dueDate))
    : useState(null);

  const course = props.navigation.getParam("class");

  useEffect(() => {
    fetchData();
  }, []);

  /**
   * Gets the assignment info and questions if editing from a post request
   * to the app server if the user is editing the assignment. Otherwise it sets
   * the questions state to an empty array.
   */
  const fetchData = async () => {
    if (item) {
      try {
        const response = await fetch(
          `https://quickmaths-9472.nodechef.com/getassignment`,
          {
            body: JSON.stringify({
              id: item.id,
            }), 
            ...httpTemplate
          }
        );
        const responseJSON = await response.json();
        if (responseJSON.failed) console.log("Couldn't get assignment info.");//TODO: replace or remove once all testing is done
        else {
          setQuestions(responseJSON.questions);
          setQuestionID(responseJSON.questions[responseJSON.questions.length-1].id+1); //This is for the virtualized list
          setAssignmentID(responseJSON.assignment_id);
        }
      } catch (err) {
        console.log("Got assignment info fetch has failed.");//TODO: replace or remove once all testing is done
        console.log(err);
      }
    } else {
      setQuestions([]);
      setQuestionID(0);
    }
  };

  /**
   * Sends a post request to the app server adding an assignment to the
   * selected class
   */
  const addAssignmentHandler = async() => {
    try {
      const convertedDate = date.getFullYear().toString() + "-" 
        + (date.getMonth() + 1).toString() + "-" 
        + date.getDate().toString();
      var dbQuestionsCopy = [];
      questions.forEach((item) => {
        dbQuestionsCopy.push({question: item.question, answer: item.answer});
      });
      const response = await fetch(
        `https://quickmaths-9472.nodechef.com/createassignment`,
        {
          body: JSON.stringify({
            class_id: course.id,
            name: assignmentName,
            due_date: convertedDate,
            number_of_questions: questions.length,
            questions: dbQuestionsCopy
          }), 
          ...httpTemplate
        }
      );
      const responseJSON = await response.json();
      if (responseJSON.failed) console.log("Couldn't create assignment."); //TODO: replace or remove once all testing is done
      else {
        console.log("Created assignment!"); //TODO: replace or remove once all testing is done
      }
    } catch (err) {
      console.log("create assignment fetch has failed."); //TODO: replace or remove once all testing is done
      console.log(err); //TODO: replace or remove once all testing is done
    }
  };

  /**
   * Sends a post request to the app server with the updated assignment info
   * to update the assignment in the db.
   */
  const editAssignmentHandler = async() => {
    try {
      const convertedDate = date.getFullYear().toString() + "-" 
        + (date.getMonth() + 1).toString() + "-" 
        + date.getDate().toString();
      var dbQuestionsCopy = [];
      questions.forEach((item) => {
        dbQuestionsCopy.push({question: item.question, answer: item.answer});
      });
      const response = await fetch(
        `https://quickmaths-9472.nodechef.com/replaceassignment`,
        {
          body: JSON.stringify({
            class_id: course.id,
            name: assignmentName,
            due_date: convertedDate,
            number_of_questions: questions.length,
            delete_id: assignmentID,
            questions: dbQuestionsCopy
          }), 
          ...httpTemplate
        }
      );
      const responseJSON = await response.json();
      if (responseJSON.failed) console.log("Couldn't replace assignment."); //TODO: replace or remove once all testing is done
      else {
        console.log("replaced assignment!"); //TODO: replace or remove once all testing is done
      }
    } catch (err) {
      console.log("replace assignment fetch has failed."); //TODO: replace or remove once all testing is done
      console.log(err); //TODO: replace or remove once all testing is done
    }
  };

  const renderQuestionListItem = (itemData) => {
    return (
      <ListItem
        topText={itemData.item.question}
        middleText={"Answer: " + itemData.item.answer}
        containerStyle={styles.listItemContainerStyle}
        onSelect={() => {
          props.navigation.navigate({
            routeName: "Question",
            params: {
              edit: editQuestion,
              refresh: doRefresh,
              question: itemData.item,
            },
          });
        }}
        icon={<EvilIcons name="pencil" size={75} color="white" />}
        buttonContainerStyle={{ marginTop: 5, marginLeft: 10 }}
      />
    );
  };

  const addQuestion = (question, answer) => {
    var i = questionID;
    var q = new Question(i.toString(), question, Number(answer));
    var copy = questions;
    copy.push(q);
    setQuestions(copy);
    i++;
    setQuestionID(i);
  };

  const editQuestion = (id, question, answer) => {
    var i = questions.findIndex((item) => item.id === id);
    var newQuestions = questions;
    newQuestions[i].question = question;
    newQuestions[i].answer = answer;
    setQuestions(newQuestions);
  };

  const doRefresh = () => {
    setRefresh(!refresh);
  };

  if (!questions) {
    return <Loading />;
  }

  return show && Platform.OS === "ios" ? (
    <View>
      <DateTimePicker
        value={date}
        onChange={(event, selectedDate) => {
          if (selectedDate === undefined) {
            setShow(false);
          } else {
            setDate(selectedDate);
          }
        }}
        style={{ alignSelf: "auto" }}
      />
      <StandardButton
        text="Set Due Date"
        onTap={() => {
          setShow(false);
          setDateText(
            (date.getMonth() + 1).toString() +
              "/" +
              date.getDate().toString() +
              "/" +
              date.getFullYear().toString()
          );
        }}
        containerStyle={{ alignSelf: "center" }}
      />
    </View>
  ) : (
    <Background>
      <View style={styles.screen}>
        {show && Platform.OS === "android" && (
          <DateTimePicker
            value={date}
            onChange={(event, selectedDate) => {
              if (selectedDate === undefined) {
                setShow(false);
              } else {
                setShow(false);
                setDate(selectedDate);
                setDateText(
                  (selectedDate.getMonth() + 1).toString() +
                    "/" +
                    selectedDate.getDate().toString() +
                    "/" +
                    selectedDate.getFullYear().toString()
                );
              }
            }}
          />
        )}
        <FlatList
          keyExtractor={(item, index) => item.id.toString()}
          data={questions}
          renderItem={renderQuestionListItem}
          ListEmptyComponent={<View></View>}
          ListHeaderComponent={
            <View>
              <View style={styles.inputFieldContainer}>
                <TextInput
                  style={styles.inputField}
                  placeholder="Enter Assignment Name"
                  placeholderTextColor="white"
                  onChangeText={(text) => setAssignmentName(text)}
                  value={assignmentName}
                />
                <EditIcon />
              </View>
              {dateText ? (
                <TouchableWithoutFeedback
                  onPress={() => {
                    setShow(true);
                  }}
                >
                  <View style={styles.inputFieldContainer}>
                    <Text style={styles.inputField}>{dateText}</Text>
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
                    <Text style={styles.inputField}>Enter Due Date</Text>
                    <EditIcon />
                  </View>
                </TouchableWithoutFeedback>
              )}
            </View>
          }
          ListFooterComponent={
            <View>
              <AddListItemButton
                text="Add Question"
                containerStyle={styles.addButtonContainer}
                onSelect={() => {
                  props.navigation.navigate({
                    routeName: "Question",
                    params: {
                      add: addQuestion,
                      refresh: doRefresh,
                    },
                  });
                }}
              />
              <StandardButton
                text="Save"
                containerStyle={styles.saveButtonContainer}
                onTap={() => {
                  if (questions.length == 0) {
                    alert("Please add a Question first!");
                    return;
                  }
                  if (item) {
                    editAssignmentHandler();
                  } else {
                    addAssignmentHandler();
                  }
                  props.navigation.state.params.refresh();
                  props.navigation.pop();
                }}
              />
            </View>
          }
        />
      </View>
    </Background>
  );
};

AddAssignmentScreen.navigationOptions = (navigationData) => {
  const course = navigationData.navigation.getParam("class");
  const selectedClassTitle = course.title;
  return {
    headerTitle: selectedClassTitle,
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
    width: "95%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 10,
    paddingLeft: 10,
    marginLeft: 10,
  },
  inputField: {
    color: "white",
    fontSize: 20,
  },
  listItemContainerStyle: {
    width: "95%",
    marginTop: 10,
  },
  addButtonContainer: {
    width: "95%",
    marginTop: 10,
  },
  saveButtonContainer: {
    width: "95%",
    paddingLeft: 10,
    marginLeft: 5,
  },
});

export default AddAssignmentScreen;
