export const DELETE_COURSE = 'DELETE_COURSE';

export const deleteCourse = (id) => {
    return { type: DELETE_COURSE, itemId: id}
};
