import { DELETE_COURSE, ADD_COURSE, EDIT_COURSE, SET_COURSE } from '../actions/courses';
import Course from '../../models/Courses';

const initialState = {
    courses: null,
    init: null  // Will be removed once connected to database
};

const coursesReducer = (state=initialState, action) => {
    switch (action.type){
        case SET_COURSE:
            var courseList = action.courses;
            var length = courseList.length;
            return {...state, courses:courseList, init: length}
        case DELETE_COURSE:
            var c = state.courses.filter(
                (course) => {
                    return course.id !== action.itemId
                }
            );
            return {...state, courses: c}; 
        case ADD_COURSE:
            var courses = state.courses;
            var id = state.init + 1; // Will be removed once connected to database
            var courseCode = Math.floor(Math.random()*1000000000); // Will be removed once connected to database or replaced with better method?
            var newCourse = new Course(id.toString(), action.courseName, action.classYear, courseCode.toString());
            console.log(newCourse);
            courses.push(newCourse);
            return {...state, courses: courses, init: id};
        case EDIT_COURSE:
            var courses = state.courses;
            var index = courses.findIndex((c) => { return c.id === action.courseId});
            console.log(courses);
            courses[index].title = action.courseName;
            courses[index].classYear = action.classYear;
            return {...state, courses: courses};
        default:
            return state;
    }
}

export default coursesReducer;