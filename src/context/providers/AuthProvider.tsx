import axios from "axios";
import { config } from "../../../Config";
import { useRouter } from "expo-router";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

export type AuthPreferences = {
  signIn: (username: string, password: string) => void;
  signOut: () => void;
  isLoading: boolean;
  isSignIn: boolean;
  isError: boolean;
  clearInputError: () => void;
};

type AuthState = {
  isLoading: boolean;
  userToken: any;
  isSignout: boolean;
};

type AuthAction = {
  type: "RESTORE_TOKEN" | "SIGN_IN" | "SIGN_OUT";
  token: any;
};

const AuthContext = createContext<AuthPreferences | undefined>(undefined); // used for managing the authentication flow

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw Error("useAuthContext cannot be used outside AuthProvider");
  }

  return context;
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

	// this is a complex state with multiple variables thats why I have used useReducer() here
  // dispatch() function is used to manage the state and the state variable is used to read the current state
  const [state, dispatch] = useReducer(
    // use secure tokens here in the future this is just a dummy implemenetation
    (prevState: AuthState, action: AuthAction) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            userToken: action.token,
            isSignout: false,
          };
        case "SIGN_OUT":
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

	// used for the error state of email and password field
  const [isError, setIsError] = useState(false);

  // used for restoring the authtoken from the storage
  useEffect(() => {
    // restore stored auth token in the future instead loading null
    dispatch({ type: "RESTORE_TOKEN", token: null });
  }, []);

	// value for AuthContext
  const authContext: AuthPreferences = useMemo(
    () => ({
      signIn: (username, password) => {
        const loginAPI = "https://workbench.persystlab.org/api/login.php";

        try {
          axios
            .post(loginAPI, {
              username: username,
              password: password,
              apiKey: config.API_KEY,
            })
            .then(({ data }) => {
              if (data.status === "success") {
                console.log("login success");
                dispatch({ type: "SIGN_IN", token: "dummy-token" });
                router.replace("/home");
              } else {
                setIsError(true);
                console.log("login failed");
              }
            })
            .catch((err) => console.log(err));
        } catch (error) {
          if (error instanceof TypeError) {
            // handle misusage of API_KEY
            if (error.message.includes("API_KEY")) {
              console.warn(
                "API_KEY is missing or not named and located properly." +
                  "Please check the README for further instructions."
              );
            } else {
              console.warn(
                "A TypeError occurred inside the signIn function." +
                  "If you have changed the naming of the API_KEY please also update the corresponding locations described in the README."
              );
              throw error; // possibly an error not related to API_KEY so throw it again
            }
          } else {
            throw error; // throw all other errors that are not related to API_KEY
          }
        }
      },
      signOut: () => {
        dispatch({ type: "SIGN_OUT", token: null });
        router.replace("/login");
      }, // TODO: Handle proper sign out after implmenting auth tokens
      isLoading: state.isLoading,
      isSignIn: state.userToken != null,
      isError,
      clearInputError: () => {
        setIsError(false);
      },
    }),
    [isError, state]
  );

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
}
