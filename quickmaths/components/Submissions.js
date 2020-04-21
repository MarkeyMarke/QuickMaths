import React, { useState} from "react";
import { View} from "react-native";

import AssignmentSubmissionList from "./AssignmentSubmissionList";
import StudentProgressList from "./StudentProgressList";

const Submissions = (props) => {
  //Used for conditional rendering between two sub-screens
  const [isStudentRemainingActive, setIsStudentRemainingActive] = useState(
    false
  );
 
  const [assignment, setAssignment] = useState(null);

  const saveAssignment= (assignment) => {
    setAssignment(assignment);
  } 

  const switchSubComponent = () => {
    setIsStudentRemainingActive(!isStudentRemainingActive);
  };

  return (
    <View>
      {isStudentRemainingActive ? (
        <StudentProgressList
          assignment={assignment}
          goToAssignmentSubmission={switchSubComponent}
        />
      ) : (
        <AssignmentSubmissionList
          navigation={props.navigation}
          goToStudentAssignmentProgress={switchSubComponent}
          saveAssignment={saveAssignment}
        />
      )}
    </View>
  );
};

export default Submissions;
