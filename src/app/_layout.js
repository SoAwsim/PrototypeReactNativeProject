import { SplashScreen, Stack, useRouter } from "expo-router";
import { useReducer, useState, useEffect, useMemo } from "react";
import { AuthContext } from "../context/AppContext";
import CustomThemeProvider from "../context/providers/ThemeProvider";
import LocaleProvider from "../context/providers/LocaleProvider";
import axios from "axios";
import { config } from '../../Config'

export default function RootLayout() {
    const router = useRouter();
    SplashScreen.preventAutoHideAsync();
    
    // this is a complex state with multiple variables thats why I have used useReducer() here
    // dispatch() function is used to manage the state and the state variable is used to read the current state
    const [state, dispatch] = useReducer( // use secure tokens here in the future this is just a dummy implemenetation
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

    const [isError, setIsError] = useState(false);

    // used for restoring the authtoken from the storage
    useEffect(() => {
        // restore stored auth token in the future instead loading null
        dispatch({ type: 'RESTORE_TOKEN', token: null });
    }, []);

    // value for the AuthContext
    const authContext = useMemo(
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
                            if (data.status === "success") {
                                console.log("login success");
                                dispatch({ type: 'SIGN_IN', token: 'dummy-token' });
                                router.replace('/home');
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
            signOut: () => {
                dispatch({ type: 'SIGN_OUT' });
                router.replace('/login');
            }, // TODO: Handle proper sign out after implementing authtokens
            isSignIn: state.userToken != null,
            isError,
            setIsError,
        }),
        [isError, state]
    );

    useEffect(() => {
        if (!state.isLoading) {
            SplashScreen.hideAsync();
        }
    }, [state]);

    if (state.isLoading) {
        return null;
    }

    return (
        <CustomThemeProvider>
            <LocaleProvider>
                <AuthContext.Provider value={authContext}>
                    <Stack screenOptions={{ headerShown: false }} initialRouteName="modal" >
                        <Stack.Screen
                            name="login"
                            options={{ animationTypeForReplace: state.isSignout ? 'pop' : 'push' }}
                        />
                        <Stack.Screen
                            name="home"
                        />
                    </Stack>
                </AuthContext.Provider>
            </LocaleProvider>
        </CustomThemeProvider>
    );
}
