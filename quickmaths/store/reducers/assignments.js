import Assignment from '../../models/Assignment';
import {ADD_ASSIGNMENT, DELETE_ASSIGNMENT, EDIT_ASSIGNMENT, SET_ASSIGNMENT} from '../actions/assignments';

const initialState = {
    assignments: null,
    init: null  // Will be removed once connected to database
};

const assignmentsReducer = (state = initialState, action) => {
    switch (action.type){
        case SET_ASSIGNMENT:
            var assignmentList = action.assignments;
            var length = assignmentList.length;
            return {...state, assignments:assignmentList, init: length}
        case ADD_ASSIGNMENT:
            var assignments = state.assignments;
            var id = state.init + 1; // Will be removed once connected to database
            var d = new Date();
            var publishDate =  d.getMonth().toString() + '/' + d.getDay().toString() + '/' + d.getFullYear().toString();
            var newAssignment = new Assignment(id.toString(), action.assignmentName, action.dueDate, 'Drafted', publishDate, 30);
            console.log(newAssignment);
            assignments.push(newAssignment);
            return {...state, assignments: assignments, init: id}
        case DELETE_ASSIGNMENT:
            var assignments = state.assignments.filter(
                (assignment) => {
                    return assignment.id !== action.assignmentId
                }
            );
            return {...state, assignments: assignments}; 
        case EDIT_ASSIGNMENT:
            var assignments = state.assignments;
            var i = assignments.findIndex((assignment) => { return assignment.id === action.assignmentId});
            assignments[i].title = action.assignmentName;
            assignments[i].dueDate = action.dueDate;
            return {...state, assignments: assignments};
        default:
            return state;
    }
}

export default assignmentsReducer;