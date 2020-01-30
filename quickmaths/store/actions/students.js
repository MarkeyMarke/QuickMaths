export const DELETE_STUDENT = 'DELETE_STUDENT';

export const deleteStudent = (id) => {
    return { type: DELETE_STUDENT, studentId: id}
};