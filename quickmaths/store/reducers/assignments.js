import Assignment from '../../models/Assignment';
import {COURSE_ASSIGNMENTS} from '../../data/dummy-data';
import {ADD_ASSIGNMENT, DELETE_ASSIGNMENT} from '../actions/assignments';

const initialState = {
    assignments: COURSE_ASSIGNMENTS,
    init: COURSE_ASSIGNMENTS.length  // Will be removed once connected to database
};

const assignmentsReducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_ASSIGNMENT:
            let assignments = state.assignments;
            let id = state.init + 1; // Will be removed once connected to database
            let d = new Date();
            let createdDate =  d.getMonth.toString() + '/' + d.getDay.toString() + '/' + d.getFullYear.toString().substring(3);
            let newAssignment = new Assignment(id.toString(), action.assignmentName, action.dueDate, 'Drafted', createdDate);
            console.log(newAssignment);
            assignments.push(newAssignment);
            return {...state, assignments: assignments, init: id}
        case DELETE_ASSIGNMENT:
            let a = state.assignments.filter(
                (assignment) => {
                    return assignment.id !== action.assignmentId
                }
            );
            return {...state, assignments: a}; 
        default:
            return state;
    }
}

export default assignmentsReducer;