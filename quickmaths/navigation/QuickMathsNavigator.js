import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import EmailRecoveryScreen from '../screens/EmailRecoveryScreen';
import TeacherHomeScreen from '../screens/TeacherHomeScreen';
import StudentHomeScreen from '../screens/StudentHomeScreen';
import ClassScreen from '../screens/ClassScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CustomDrawer from '../components/Drawer';
import Colors from '../constants/Colors';
import AddClassScreen from '../screens/AddClassScreen';
import EditClassScreen from '../screens/EditClassScreen';
import AddAssignmentScreen from '../screens/AddAssignmentScreen';
import QuestionScreen from '../screens/QuestionScreen';
import AssignmentScreen from '../screens/AssignmentScreen';

const StudentNavigator = createStackNavigator({
    StudentHomeScreen: StudentHomeScreen,
    Assignment: AssignmentScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Colors.primaryColor
        },
        headerTintColor: 'white'
    }
});

const TeacherNavigator = createStackNavigator({
    TeacherHomeScreen: TeacherHomeScreen,
    Class: ClassScreen,
    AddClass: AddClassScreen,
    EditClass: EditClassScreen,
    AddAssignment: AddAssignmentScreen,
    Question: QuestionScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Colors.primaryColor
        },
        headerTintColor: 'white'
    }
});

const ProfileNavigator = createStackNavigator({
    Profile: ProfileScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Colors.primaryColor
        },
        headerTintColor: 'white'
    }
});

const AuthNavigator = createSwitchNavigator({
    Home: HomeScreen,
    Login: LoginScreen,
    Register: RegisterScreen,
    EmailRecovery: EmailRecoveryScreen
});

const MainNavigator = createDrawerNavigator({
    Student: {
        screen: StudentNavigator,
        navigationOptions: {
            drawerLabel: () => null,
        }
    },
    Teacher: {
        screen: TeacherNavigator,
        navigationOptions: {
            drawerLabel: () => null,
        }
    },
    Profile: ProfileNavigator,
}, {
    drawerWidth: '60%',
    drawerBackgroundColor: Colors.accentColor,
    overlayColor: 1,
    contentComponent: CustomDrawer,
});

const QuickMathsNavigator = createSwitchNavigator({
    Auth: AuthNavigator,
    Drawer: MainNavigator
});

export default createAppContainer(QuickMathsNavigator);