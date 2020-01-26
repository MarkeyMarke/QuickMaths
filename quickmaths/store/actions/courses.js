export const DELETE_COURSE = 'DELETE_COURSE';

export const deleteCourse = (id) => {
    return { type: DELETE_COURSE, itemId: id}
};

export const ADD_COURSE = 'ADD_COURSE';

export const addCourse = (name, year) => {
    return {type: ADD_COURSE, courseName: name, classYear: year}
}