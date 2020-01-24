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

const AppNavigator = createStackNavigator({
    StudentHomeScreen: StudentHomeScreen,
    TeacherHomeScreen: TeacherHomeScreen,
    Class: ClassScreen,
    AddClass: AddClassScreen
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

const QuickMathsNavigator = createSwitchNavigator({
    Auth: AuthNavigator,
    App: AppNavigator
});

const MainNavigator = createDrawerNavigator({
    Main: {
        screen: QuickMathsNavigator,
        navigationOptions: {
            drawerLabel: () => null,
        }
    },
    Profile: ProfileScreen,
}, {
    drawerWidth: '60%',
    drawerBackgroundColor: Colors.accentColor,
    overlayColor: 1,
    contentComponent: CustomDrawer,
});

export default createAppContainer(MainNavigator);