import {DELETE_STUDENT, SET_STUDENTS} from '../actions/students';

const initialState = {
    students: null
};

const studentReducer = (state=initialState, action) => {
    switch(action.type){
        case SET_STUDENTS:
            var studentList = action.students;
            return {...state, students:studentList}
        case DELETE_STUDENT:
            let s = state.students.filter(
                (student) => {
                    return student.id !== action.studentId
                }
            );
            return {...state, students: s};
        default:
            return state; 
    }
}

export default studentReducer;