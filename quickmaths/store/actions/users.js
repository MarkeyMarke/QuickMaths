export const SIGN_UP = 'SIGN_UP';
export const SIGN_OUT = 'SIGN_OUT';
export const SIGN_IN_AS_TEACHER = 'SIGN_IN_AS_TEACHER';
export const SIGN_IN_AS_STUDENT = 'SIGN_IN_AS_STUDENT';

import { API_KEY, PROJECT_ID } from 'react-native-dotenv';
import { httpTemplate } from '../../constants/HttpTemplate';
export const SIGNIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
export const GETDATA_URL = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`;
export const SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
export const EMAILVERIFICATION_URL = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`;
export const FORGETPASSWORD_URL = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`;
// = `https://${PROJECT_ID}.firebaseio.com/users.json`;
export const CHANGEPASSWORD_URL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;
export const CHANGEEMAIL_URL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;

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
		const response = await fetch(SIGNIN_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				password: password,
				returnSecureToken: true
			})
		});
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
		const getUserData = await fetch(GETDATA_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				idToken: resData.idToken
			})
		});
		const getUserDataArray = await getUserData.json();
		//Handling Verification Email Error API
		if (!getUserDataArray.users[0].emailVerified) {
			let message = 'Verify Your Email!';
			throw new Error(message);
		}
		//Check User
		var localId = resData.localId;
		try {
			const response = await fetch(
				`https://quickmaths-9472.nodechef.com/signin`, {
					body: JSON.stringify({
						firebase_id: localId
					}),
					...httpTemplate
				}
			);
			const responseJSON = await response.json();
			if (responseJSON.failed) {
				let message = 'Something Went Wrong!';
	 			throw new Error(message);
			} else {
				console.log(responseJSON);
				var isTeacher = responseJSON[0].is_teacher;
				var nameProf = responseJSON[0].name;
				var idProf = responseJSON[0].school_id;
				var emailProf = responseJSON[0].email;
				if (isTeacher)
					dispatch({
						type: SIGN_IN_AS_TEACHER,
						name: nameProf,
						email: emailProf,
						id: idProf,
						token: resData.idToken
					});
				else
					dispatch({
						type: SIGN_IN_AS_STUDENT,
						name: nameProf,
						email: emailProf,
						id: idProf,
						token: resData.idToken
					});
			}
		}
		catch (err){
			console.log(err);
			let message = 'Something Went Wrong!';
		 	throw new Error(message);
		};
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
		} else if (password.length < 6) {
			let message = 'Password Length Minimum 6';
			throw new Error(message);
		}
		//Sign Up, using Firebase API
		const response = await fetch(SIGNUP_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				password: password,
				returnSecureToken: true
			})
		});
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
		const sendEmailVerification = await fetch(EMAILVERIFICATION_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				requestType: 'VERIFY_EMAIL',
				idToken: resData.idToken
			})
		});
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
		//Post New User to MySQL
		var localId = resData.localId;
		try {
			const response = await fetch(
				`https://quickmaths-9472.nodechef.com/signup`, {
					body: JSON.stringify({
						firebase_id: localId,
						school_id: userID,
						name: fullName,
						is_teacher: selected,
						email: email
					}),
					...httpTemplate
				}
			);
			const responseJSON = await response.json();
			if (responseJSON.failed) {
				let message = 'Something Went Wrong!';
	 			throw new Error(message);
			};
		}
		catch (err){
			let message = 'Something Went Wrong!';
		 	throw new Error(message);
		}
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
		const response = await fetch(FORGETPASSWORD_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				requestType: 'PASSWORD_RESET',
				email: email
			})
		});
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

//Function For Update Email
export const updateEmail = (email, idToken) => {
	return async dispatch => {
		if (validateEmail(email)) {
			let message = 'Invalid Email!';
			throw new Error(message);
		}
		//Change Email, using Firebase API
		const changeEmail = await fetch(CHANGEEMAIL_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				idToken: idToken,
				email: email,
				returnSecureToken: true
			})
		});
		//Handling Change Email Error API
		if (!changeEmail.ok) {
			const errorResData = await changeEmail.json();
			const errorId = errorResData.error.message;
			let message = 'Sign Out And Try Again!';
			if (errorId === 'EMAIL_EXISTS') {
				message = 'Email Exist';
			}
			throw new Error(message);
		}
		const newData = await changeEmail.json();
		//Send Email Verification, using Firebase API
		const sendEmailVerification = await fetch(EMAILVERIFICATION_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				requestType: 'VERIFY_EMAIL',
				idToken: newData.idToken
			})
		});
		//Handling Email Verification Error API
		if (!sendEmailVerification.ok) {
			const errorEmailData = await sendEmailVerification.json();
			const errorIdEm = errorEmailData.error.message;
			let message = 'Something Went Wrong!';
			if (errorIdEm === 'EMAIL_EXISTS') {
				message = 'Email Exists';
			}
			throw new Error(message);
		}
	};
};
//Function For Update Password
export const updatePassword = (password, idToken) => {
	return async dispatch => {
		if (password.length < 6) {
			let message = 'Password Length Minimum 6';
			throw new Error(message);
		}
		//Change Password, using Firebase API
		const changePass = await fetch(CHANGEPASSWORD_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				idToken: idToken,
				password: password,
				returnSecureToken: true
			})
		});
		//Handling The Change Password Error API
		if (!changePass.ok) {
			const resDataPass = await changePass.json();
			const errorResData = await resDataPass.json();
			const errorId = errorResData.error.message;
			let message = 'Something Went Wrong!';
			if (errorId === 'WEAK_PASSWORD') {
				message = 'Password Should More Than 6';
			}
			throw new Error(message);
		}
	};
};
//Function For Update Name And/Or UserID Profile
//TODO: to be replaced with mysql, also update the email
export const updateProfile = (name, nameProfile, id, idProfile, token) => {
	return async dispatch => {
		//This is how you get the userID as 'localid' for the update fetch later
		const response = await fetch(
			`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}
		`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					idToken: token
				})
			}
		);
		if (!response.ok) {
			throw new Error('Something went wrong!');
		}
		if (name == '') name = nameProfile;
		if (id == '') id = idProfile;
		const resData = await response.json();
		var localId = resData.users[0].localId;
		//TODO: this is the one you need to replace.
		const updateProfileFetch = await fetch(`https://${PROJECT_ID}.firebaseio.com/users/${localId}.json`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				fullName: name,
				userID: id
			})
		});
		if (!updateProfileFetch.ok) {
			throw new Error('Something went wrong!');
		}
	};
};
