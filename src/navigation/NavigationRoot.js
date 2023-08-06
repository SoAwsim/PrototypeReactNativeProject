import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DummyHome from '../screens/dummyhome/DummyHome';
import LoginScreen from '../screens/login/LoginScreen';
import { HomeNavigator } from './HomeDrawerNavigation';

const Stack = createNativeStackNavigator();

export default function NavigationRoot({ theme }) {
    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="DummyHome" component={HomeNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
