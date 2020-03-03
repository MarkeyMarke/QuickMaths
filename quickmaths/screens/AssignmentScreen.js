import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Button,
  Alert,
  Text,
  ActivityIndicator
} from "react-native";
import Signature from "react-native-signature-canvas";
import { QUESTIONS } from "../data/dummy-data";
import { GOOGLECLOUD_API_KEY } from "react-native-dotenv";
import Background from "../components/Background";

//TODO: Set the title of the screen to have the assignment name
const AssignmentScreen = props => {
  const [currentQuestions, setQuestions] = useState(null);
  const [index, setIndex] = useState(null);
  const [alreadyComplete, setAlreadyComplete] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    //TODO: Eventually turns into MySQL fetch
    const numberOfQuestions = QUESTIONS.length;
    const questionsAlreadyDone = props.navigation.state.params.progress;
    setQuestions(QUESTIONS);

    //Index is NOT progress, it is used to traverse through the questions
    if (questionsAlreadyDone < numberOfQuestions) {
      setIndex(questionsAlreadyDone);
    } else {
      setIndex(0);
      setAlreadyComplete(true);
    }
  };

  const updateProgress = async () => {
    //TODO: Eventually turns into MySQL fetch
    const mySQLResult = { error: false };
    if (mySQLResult.error) {
      makeAlert("Sorry", "An error has occured!");
      console.log(error);
    } else {
      setIndex(index + 1);
      makeAlert("Good job!", "That was correct!");
    }
  };

  //For reusability and shortening lines of code.
  const makeAlert = (title, message) => {
    Alert.alert(title, message, [{ text: "OK", onPress: () => {} }]);
  };

  const readImageHandler = async base64string => {
    const fetchUrl = `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLECLOUD_API_KEY}`;
    const body = {
      requests: [
        {
          image: {
            content: base64string
          },
          features: [{ type: "TEXT_DETECTION" }]
        }
      ]
    };

    try {
      const googleCloudeResponse = await fetch(fetchUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      const responseJSON = await googleCloudeResponse.json();
      //Checks if Google found any texts
      if (Object.keys(responseJSON.responses[0]).length > 0) {
        const answer = responseJSON.responses[0].fullTextAnnotation.text.replace(
          /[^0-9.]/g,
          ""
        );
        if (currentQuestions[index].answer.toString() === answer) {
          //If they got it right, try update on MySQL
          await updateProgress();
        } else {
          makeAlert("Sorry", `Your answer ${answer} was wrong`);
        }
      } else {
        makeAlert("Sorry", "Couldn't read your writing!"); //If it's 0 or less, Google couldn't find anything
      }
    } catch (error) {
      //If there was something wrong with the internet connection or the technical stack
      makeAlert("Sorry", "An error has occured!");
      console.log(error);
    }
  };
  //TODO: Make a separate component for all of these rendered elements

  //Check if all questions have been loaded first
  //TODO: Use a better loading screen component.
  if (currentQuestions === null) {
    return (
      <Background>
        <View style={styles.container}>
          <Button
            title="Back"
            onPress={() => {
              props.navigation.pop();
            }}
          />
          <ActivityIndicator size="large" />
        </View>
      </Background>
    );
  }
  //Then check if the assignment is already completed (also don't go out of index)
  if (alreadyComplete && index < currentQuestions.length) {
    return (
      <Background>
        <View style={styles.container}>
          <Button
            title="Back"
            onPress={() => {
              props.navigation.pop();
            }}
          />
          <Text>
            Question {index + 1}/{currentQuestions.length}
          </Text>
          <Text>{currentQuestions[index].question}</Text>
          <Text>Answer:</Text>
          <Text>{currentQuestions[index].answer}</Text>
          <Button title="Next" onPress={() => setIndex(index + 1)} />
        </View>
      </Background>
    );
  }
  //Check if we've went through all questions
  if (index === currentQuestions.length) {
    return (
      <Background>
        <View style={styles.container}>
          <Text>You're finished!</Text>
          <Button title="Finish" onPress={() => props.navigation.pop()} />
        </View>
      </Background>
    );
  }
  //Otherwise, we ask them the current question
  return (
    <Background>
      <View style={styles.container}>
        <Button
          title="Back to assignments"
          onPress={() => {
            props.navigation.pop();
          }}
        />
        <Text>
          Question {index + 1}/{currentQuestions.length}
        </Text>
        <Text>{currentQuestions[index].question}</Text>
        <Signature
          onOK={img => readImageHandler(img.substr(22))}
          descriptionText="Your answer"
          clearText="Clear"
          confirmText="Send"
          autoClear={true}
        />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

AssignmentScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.state.params.title,
    gestureEnabled: false,
    headerLeft: () => null
  };
};

export default AssignmentScreen;
