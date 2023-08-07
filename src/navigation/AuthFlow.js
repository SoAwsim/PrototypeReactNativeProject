import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from "axios";
import * as React from "react";
import LoginScreen from '../screens/login/LoginScreen';
import SplashScreen from "../screens/splash/SplashScreen";
import { HomeNavigator } from './HomeDrawerNavigation';

const AuthContext = React.createContext();
const Stack = createNativeStackNavigator();

export default function AuthFlow() {
    const [state, dispatch] = React.useReducer( // use secure tokens here in the future this is just a dummy implemenetation
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false
                    }
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isSignout: false,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        userToken: null,
                        isSignout: true,
                    };
            }
        },
        {
            isLoading: true,
            userToken: null,
            isSignout: false,
        }
    );

    const [isError, setIsError] = React.useState(false);

    React.useEffect(() => {
        // restore stored auth token in the future instead loading null
        dispatch({ type: 'RESTORE_TOKEN', token: null });
    }, []);

    const authContext = React.useMemo(
        () => ({
            updateIsError: () => setIsError(false),
            signIn: (loginInfo) => {
                const loginAPI = "https://workbench.persystlab.org/api/login.php";

                const promise = axios.post(loginAPI, {
                    username: loginInfo.enteredEmail,
                    password: loginInfo.enteredPassword,
                });

                const data = promise.then(response => response.data);

                data.then(
                    answer => {
                        if (answer.status === "success") {
                            console.log("login success");
                            dispatch({ type: 'SIGN_IN', token: 'dummy-token' });
                        } else {
                            setIsError(true);
                            console.log("login failed");
                        }
                    },
                    err => console.log(err)
                );
            },
            signOut: () => dispatch({ type: 'SIGN_OUT' }),
        }),
        []
    );

    if (state.isLoading) {
        // app has not loaded the user token from storage yet
        return <SplashScreen />;
    }

    return (
        <AuthContext.Provider value={authContext}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {state.userToken == null ? (
                    <Stack.Screen name="Login" options={{ animationTypeForReplace: state.isSignout ? 'pop' : 'push' }}>
                        {(props) => <LoginScreen {...props} AuthContext={AuthContext} isError={isError} />}
                    </Stack.Screen>
                ) : (
                    <Stack.Screen name="DummyHome" component={HomeNavigator} />
                )}
            </Stack.Navigator>
        </AuthContext.Provider>
    )
}
