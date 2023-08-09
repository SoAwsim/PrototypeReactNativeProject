import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from "axios";
import * as React from "react";
import LoginScreen from '../screens/login/LoginScreen';
import SplashScreen from "../screens/splash/SplashScreen";
import { HomeNavigator } from './HomeDrawerNavigation';
import { config } from '../../Config';
import { AuthContext } from '../context/AppContextProvider';

const Stack = createNativeStackNavigator();

export default function AuthFlow() {
    // this is a complex state with multiple variables thats why I have used useReducer() here
    // dispatch() function is used to manage the state and the state variable is used to read the current state
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
            isLoading: true, // value for the authtoken loading procedure if set to true screen will render the splash screen
            userToken: null, // value for the currently logged in user, if set to null no user is logged in
            isSignout: false, // value for indicating sign out action, if set to true a special animation is played while switching back
        }
    );

    const [isError, setIsError] = React.useState(false);

    // used for restoring the authtoken from the storage
    React.useEffect(() => {
        // restore stored auth token in the future instead loading null
        dispatch({ type: 'RESTORE_TOKEN', token: null });
    }, []);

    // value for the AuthContext
    const authContext = React.useMemo(
        () => ({
            signIn: ({ enteredUsername, enteredPassword }) => {
                const loginAPI = "https://workbench.persystlab.org/api/login.php";

                try {
                    axios.post(loginAPI, {
                        username: enteredUsername,
                        password: enteredPassword,
                        apiKey: config.API_KEY,
                    })
                    .then(
                        ({ data }) => {
                            console.log(data);
                            if (data.status === "success") {
                                console.log("login success");
                                dispatch({ type: 'SIGN_IN', token: 'dummy-token' });
                            } else {
                                setIsError(true);
                                console.log("login failed");
                            }
                        }
                    )
                    .catch(
                        err => console.log(err)
                    )
                } catch (error) {
                    if (error instanceof TypeError) { // handle misusage of API_KEY
                        if (error.message.includes("API_KEY")) {
                            console.warn(
                                "API_KEY is missing or not named and located properly." +
                                "Please check the README for further instructions.");
                        } else {
                            console.warn("A TypeError occurred inside the signIn function." + 
                            "If you have changed the naming of the API_KEY please also update the corresponding locations described in the README.");
                            throw error; // possibly an error not related to API_KEY so throw it again
                        }
                    } else {
                        throw error; // throw all other errors that are not related to API_KEY
                    }
                }
            },
            signOut: () => dispatch({ type: 'SIGN_OUT' }), // TODO: Handle proper sign out after implementing authtokens
            isError,
            setIsError,
        }),
        [isError]
    );

    if (state.isLoading) {
        // app has not loaded the user token from storage yet
        return <SplashScreen />;
    }

    return (
        <AuthContext.Provider value={authContext}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {state.userToken == null ? (
                    <Stack.Screen
                        name="Login"
                        options={{ animationTypeForReplace: state.isSignout ? 'pop' : 'push' }}
                        component={LoginScreen}
                    />
                ) : (
                    <Stack.Screen
                        name="DummyHome"
                        component={HomeNavigator}
                    />
                )}
            </Stack.Navigator>
        </AuthContext.Provider>
    )
}
