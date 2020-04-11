import { SIGN_OUT, SIGN_IN, SIGN_IN_AS_STUDENT, SIGN_IN_AS_TEACHER, UPDATE_EMAIL } from '../actions/users';

const initialState = {
	isTeacher: false,
	isStudent: false,
	name: null,
	email: null,
	id: null,
	token: null
};

const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case SIGN_IN_AS_TEACHER:
			return {
				...state,
				isTeacher: true,
				name: action.name,
				email: action.email,
				id: action.id,
				token: action.token
			};
		case SIGN_IN_AS_STUDENT:
			return {
				...state,
				isStudent: true,
				name: action.name,
				email: action.email,
				id: action.id,
				token: action.token
			};
		case UPDATE_EMAIL:
			return {
				...state,
				email: action.email
			};
		case SIGN_OUT:
			return {
				...state,
				isTeacher: false,
				isStudent: false,
				name: null,
				email: null,
				id: null,
				token: null
			};
		default:
	}
	return state;
};

export default usersReducer;
