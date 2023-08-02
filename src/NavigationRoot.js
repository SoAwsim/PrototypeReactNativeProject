import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/login/LoginScreen';
import DummyHome from './screens/dummyhome/DummyHome';

const Stack = createNativeStackNavigator();

export default function NavigationRoot({ theme }) {
    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="DummyHome" component={DummyHome} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
