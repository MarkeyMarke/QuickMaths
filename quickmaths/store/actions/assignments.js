export const ADD_ASSIGNMENT = 'ADD_ASSIGNMENT';

export const addAssignment = (name, dueDate) => {
    return { type: ADD_ASSIGNMENT, assignmentName: name, dueDate: dueDate}
};

export const DELETE_ASSIGNMENT = 'DELETE_ASSIGNMENT';

export const deleteAssignment = (id) => {
    return { type: DELETE_ASSIGNMENT, assignmentId: id}
};

export const EDIT_ASSIGNMENT = 'EDIT_ASSIGNMENT';

export const editAssignment = (id, name, date) => {
    return {type: EDIT_ASSIGNMENT, assignmentId: id, assignmentName: name, dueDate: date}
};

export const SET_ASSIGNMENT = 'SET_ASSIGNMENT';

export const setAssignment = (assignments) => {
    return {type: SET_ASSIGNMENT, assignments: assignments}
};