import { Alert } from 'react-native';

const CustomAlert = (title, message, buttonText) => {
    Alert.alert(title, message, [{text:buttonText}]);
}

export default CustomAlert;