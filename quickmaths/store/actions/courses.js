export const DELETE_COURSE = 'DELETE_COURSE';

export const deleteCourse = (id) => {
    return { type: DELETE_COURSE, itemId: id}
};

export const ADD_COURSE = 'ADD_COURSE';

export const addCourse = (name, year) => {
    return {type: ADD_COURSE, courseName: name, classYear: year}
};

export const EDIT_COURSE = 'EDIT_COURSE';

export const editCourse = (id, name, year) => {
    return {type: EDIT_COURSE, courseId: id, courseName: name, classYear: year}
};

export const SET_COURSE = 'SET_COURSE';

export const setCourse = (courses) => {
    return {type: SET_COURSE, courses: courses}
};