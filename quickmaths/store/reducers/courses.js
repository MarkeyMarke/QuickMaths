import {COURSES} from '../../data/dummy-data';
import { DELETE_COURSE } from '../actions/courses';

const initialState = {
    courses: COURSES
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
        default:
            return state;
    }
}

export default coursesReducer;