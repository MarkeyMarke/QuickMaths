import {SIGN_OUT,SIGN_IN_AS_STUDENT,SIGN_IN_AS_TEACHER} from '../actions/users';

const initialState = {
    isTeacher: false,
    isStudent: false
};

const usersReducer = (state = initialState, action) => {
    switch (action.type){
        case SIGN_IN_AS_TEACHER:
            return {...state, isTeacher: true}; 
        case SIGN_IN_AS_STUDENT:
            return {...state, isStudent: true}; 
        case SIGN_OUT:
            return {...state, isTeacher: false, isStudent: false}; 
        default:
            return state;
    }
}

export default usersReducer;