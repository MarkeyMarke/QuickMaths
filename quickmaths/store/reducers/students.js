import {STUDENTS} from '../../data/dummy-data';
import {DELETE_STUDENT} from '../actions/students';

const initialState = {
    students: STUDENTS
};

const studentReducer = (state=initialState, action) => {
    switch(action.type){
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