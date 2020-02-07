export const SIGN_UP = 'SIGN_UP';
export const SIGN_OUT = 'SIGN_OUT';
export const SIGN_IN_AS_TEACHER = 'SIGN_IN_AS_TEACHER';
export const SIGN_IN_AS_STUDENT = 'SIGN_IN_AS_STUDENT';

//Function For Validating Email
function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return !re.test(String(email).toLowerCase());
}
//Function For Sign In
export const signIn = (email, password) => {
	return async dispatch => {
		//Handling Error Input
		if (email === '') {
			let message = 'Fill In The Email';
			throw new Error(message);
		} else if (validateEmail(email)) {
			let message = 'Invalid Email!';
			throw new Error(message);
		} else if (password === '') {
			let message = 'Fill In The Password';
			throw new Error(message);
		} else if (password.length <= 5) {
			let message = 'Password Length Minimum 5';
			throw new Error(message);
		}
		//Sign In, using Firebase API
		const response = await fetch(
			'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyANoan0dDcv0SrGib8fa3S2qLYiflt2_dY',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: email,
					password: password,
					returnSecureToken: true
				})
			}
		);
		//Handling The Sign In Error API
		if (!response.ok) {
			const errorResData = await response.json();
			const errorId = errorResData.error.message;
			let message = 'Something Went Wrong!';
			if (errorId === 'EMAIL_NOT_FOUND') {
				message = 'Email Does Not Exist';
			} else if (errorId === 'INVALID_PASSWORD') {
				message = 'Invalid Password';
			}
			throw new Error(message);
		}
		//Get User Data, using Firebase API
		const resData = await response.json();
		const getUserData = await fetch(
			'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyANoan0dDcv0SrGib8fa3S2qLYiflt2_dY',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					idToken: resData.idToken
				})
			}
		);
		const getUserDataArray = await getUserData.json();
		//Handling Verification Email Error API
		if (!getUserDataArray.users[0].emailVerified) {
			let message = 'Verify Your Email!';
			throw new Error(message);
		}
		//Check User
		const getUser = await fetch('https://quickmaths-bc73a.firebaseio.com/users.json');
		const resUserData = await getUser.json();
		var isTeacher = true;
		for (const key in resUserData) {
			if (resUserData[key].email == email) {
				isTeacher = resUserData[key].teacher;
			}
		}
		if (isTeacher) dispatch({ type: SIGN_IN_AS_TEACHER });
		else dispatch({ type: SIGN_IN_AS_STUDENT });
		//dispatch({ type: SIGN_IN });
	};
};

//Function For Sign Up
export const signUp = (email, fullName, userID, password, selected) => {
	return async dispatch => {
		//Handling Error Input
		if (email === '') {
			let message = 'Fill In The Email';
			throw new Error(message);
		} else if (validateEmail(email)) {
			let message = 'Invalid Email!';
			throw new Error(message);
		} else if (fullName === '') {
			let message = 'Fill In The Full Name';
			throw new Error(message);
		} else if (userID === '') {
			let message = 'Fill In The ID';
			throw new Error(message);
		} else if (isNaN(userID)) {
			let message = 'ID Has To Be Digit!';
			throw new Error(message);
		} else if (password === '') {
			let message = 'Fill In The Password';
			throw new Error(message);
		} else if (password.length <= 5) {
			let message = 'Password Length Minimum 5';
			throw new Error(message);
		}
		//Sign Up, using Firebase API
		const response = await fetch(
			'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyANoan0dDcv0SrGib8fa3S2qLYiflt2_dY',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: email,
					password: password,
					returnSecureToken: true
				})
			}
		);
		//Handling Sign Up Error API
		if (!response.ok) {
			const errorResData = await response.json();
			const errorId = errorResData.error.message;
			let message = 'Something Went Wrong!';
			if (errorId === 'EMAIL_EXISTS') {
				message = 'Email Exist';
			}
			throw new Error(message);
		}
		const resData = await response.json();
		//Send Email Verification, using Firebase API
		const sendEmailVerification = await fetch(
			'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyANoan0dDcv0SrGib8fa3S2qLYiflt2_dY',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					requestType: 'VERIFY_EMAIL',
					idToken: resData.idToken
				})
			}
		);
		//Handling Email Verification Error API
		if (!sendEmailVerification.ok) {
			const errorEmailData = await sendEmailVerification.json();
			const errorIdEm = errorEmailData.error.message;
			let message = 'Something Went Wrong!';
			if (errorIdEm === 'EMAIL_NOT_FOUND') {
				message = 'Email Does Not Exist';
			}
			throw new Error(message);
		}
		//Post New User to Firebase
		const createTeacherUser = await fetch('https://quickmaths-bc73a.firebaseio.com/users.json', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				fullName: fullName,
				userID: userID,
				teacher: selected
			})
		});
		if (!createTeacherUser.ok) {
			let message = 'Something Went Wrong!';
			throw new Error(message);
		}
		dispatch({ type: SIGN_UP });
	};
};
//Function For Forget Password
export const forgetPassword = email => {
	return async dispatch => {
		//Handling Error Input
		if (email === '') {
			let message = 'Fill In The Email';
			throw new Error(message);
		} else if (validateEmail(email)) {
			let message = 'Invalid Email';
			throw new Error(message);
		}
		//Forget Password, using Firebase API
		const response = await fetch(
			'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyANoan0dDcv0SrGib8fa3S2qLYiflt2_dY',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					requestType: 'PASSWORD_RESET',
					email: email
				})
			}
		);
		//Handling The Forget Password Error API
		if (!response.ok) {
			const errorResData = await response.json();
			const errorId = errorResData.error.message;
			let message = 'Something Went Wrong!';
			if (errorId === 'EMAIL_NOT_FOUND') {
				message = 'Email Does Not Exist';
			}
			throw new Error(message);
		}
	};
};
//Function For Sign Out
export const signOut = () => {
	return { type: SIGN_OUT };
};
