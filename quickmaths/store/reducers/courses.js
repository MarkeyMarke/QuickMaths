import {COURSES} from '../../data/dummy-data';
import { DELETE_COURSE, ADD_COURSE } from '../actions/courses';
import Course from '../../models/Courses';

const initialState = {
    courses: COURSES,
    init: COURSES.length  // Will be removed once connected to database
};

const coursesReducer = (state=initialState, action) => {
    switch (action.type){
        case DELETE_COURSE:
            let c = state.courses.filter(
                (course) => {
                    return course.id !== action.itemId
                }
            );
            return {...state, courses: c}; 
        case ADD_COURSE:
            let courses = state.courses;
            let id = state.init + 1; // Will be removed once connected to database
            let courseCode = Math.floor(Math.random()*1000000000); // Will be removed once connected to database or replaced with better method?
            let newCourse = new Course(id.toString(), action.courseName, action.classYear, courseCode.toString());
            console.log(newCourse);
            courses.push(newCourse);
            return {...state, courses: courses, init: id}
        default:
            return state;
    }
}

export default coursesReducer;