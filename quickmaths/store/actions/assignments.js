export const ADD_ASSIGNMENT = 'ADD_ASSIGNMENT';

export const addAssignment = (name, dueDate ) => {
    return { type: ADD_ASSIGNMENT, assignmentName: name, dueDate: dueDate}
};

export const DELETE_ASSIGNMENT = 'DELETE_ASSIGNMENT';

export const deleteAssignment = (id) => {
    return { type: DELETE_ASSIGNMENT, assignmentId: id}
};