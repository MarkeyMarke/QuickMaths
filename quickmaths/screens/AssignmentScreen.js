import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Button,
  Alert,
  Text,
  ActivityIndicator,
  Platform,
} from "react-native";
import Signature from "react-native-signature-canvas";
import { QUESTIONS } from "../data/dummy-data";
import { GOOGLECLOUD_API_KEY } from "react-native-dotenv";
import Background from "../components/Background";
import BackButton from "../constants/BackButton";
import StandardButton from "../components/StandardButton";
import Colors from "../constants/Colors";
import { Item, HeaderButtons } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

//TODO: Set the title of the screen to have the assignment name
const AssignmentScreen = (props) => {
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

  const readImageHandler = async (base64string) => {
    const fetchUrl = `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLECLOUD_API_KEY}`;
    const body = {
      requests: [
        {
          image: {
            content: base64string,
          },
          features: [{ type: "TEXT_DETECTION" }],
        },
      ],
    };

    try {
      const googleCloudeResponse = await fetch(fetchUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
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

  const backButton = (
    <View style={styles.backButtonContainer}>
      <BackButton
        onTap={() => {
          props.navigation.pop();
        }}
      />
    </View>
  );

  const progressText = (text) => {
    return (
      <View style={styles.progressTextContainer}>
        <Text style={styles.whiteText}>{text}</Text>
      </View>
    );
  };

  const questionText = (text) => {
    return (
      <View style={styles.questionTextContainer}>
        <Text style={styles.whiteText}>{text}</Text>
      </View>
    );
  };

  const canvasWebStyle = `.m-signature-pad--footer
  .button {
    background-color: #B76767;
  }`;

  //TODO: Make a separate component for all of these rendered elements
  //Check if all questions have been loaded first
  if (!currentQuestions) {
    return (
      <Background>
        {backButton}
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      </Background>
    );
  }
  //Then check if the assignment is already completed (also don't go out of index)
  if (alreadyComplete && index < currentQuestions.length) {
    return (
      <Background>
        {backButton}
        <View style={styles.assignmentContainer}>
          {progressText(`Question ${index + 1}/${currentQuestions.length}`)}
          {questionText(`${currentQuestions[index].question}?`)}
          <View style={styles.answerTextContainer}>
            <Text style={styles.answerText}>
              {currentQuestions[index].answer}
            </Text>
          </View>
          <StandardButton text="Next" onTap={() => setIndex(index + 1)} />
        </View>
      </Background>
    );
  }
  //Check if we've went through all questions
  if (index === currentQuestions.length) {
    return (
      <Background>
        {backButton}
        <View style={styles.assignmentContainer}>
          {progressText(
            `Question ${currentQuestions.length}/${currentQuestions.length}`
          )}
          {questionText(`You're finished!`)}
          <StandardButton text="Finish" onTap={() => props.navigation.pop()} />
        </View>
      </Background>
    );
  }
  //Otherwise, we ask them the current question
  return (
    <Background>
      {backButton}
      <View style={styles.assignmentContainer}>
        {progressText(`Question ${index + 1}/${currentQuestions.length}`)}
        {questionText(`${currentQuestions[index].question}?`)}
        <View style={styles.canvasContainer}>
          <Signature
            onOK={(img) => readImageHandler(img.substr(22))}
            descriptionText="Your answer"
            clearText="Clear"
            confirmText="Send"
            autoClear={true}
            webStyle={canvasWebStyle}
          />
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  assignmentContainer: {
    flex: 90,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  backButtonContainer: {
    flex: 10,
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: "5%",
  },
  whiteText: {
    fontSize: 25,
    color: "white",
  },
  progressTextContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: "10%",
    backgroundColor: Colors.primaryColor,
  },
  questionTextContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: "15%",
    backgroundColor: "rgba(0,0,0,0.6)",
    borderColor: "rgba(0,0,0,0.6)",
    borderRadius: 20,
    borderWidth: 1,
    marginVertical: 10,
  },
  answerText: {
    fontSize: 100,
  },
  answerTextContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: "50%",
    backgroundColor: "white",
  },
  canvasContainer: {
    width: "90%",
    height: "70%",
    marginBottom: "5%",
  },
  loadingContainer: {
    flex: 90,
    justifyContent: "center",
    alignItems: "center",
  },
});

AssignmentScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.state.params.title,
    headerLeftContainerStyle: {
      backgroundColor: Platform.OS == "android" ? Colors.accentColor : "",
    },
    gestureEnabled: false,
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

export default AssignmentScreen;
