import { API_KEY} from 'react-native-dotenv';

/*
General Function that makes a fetch call to firebase to return the user's 
firebase id given the user's firebase token.
*/
export const getFirebaseID = async(firebaseToken) => {
    const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idToken: firebaseToken
            })
        }
    );
    if (!response.ok) {
        throw new Error('Something went wrong!');
    }
    const resData = await response.json();
    return resData.users[0].localId;  //returns the firebase id
}