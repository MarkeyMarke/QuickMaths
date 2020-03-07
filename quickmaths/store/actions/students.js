export const DELETE_STUDENT = 'DELETE_STUDENT';

export const deleteStudent = (id) => {
    return { type: DELETE_STUDENT, studentId: id}
};

export const SET_STUDENTS= 'SET_STUDENTS';

export const setStudents = (students) => {
    return {type: SET_STUDENTS, students: students}
};