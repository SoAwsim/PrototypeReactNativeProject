import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    NavigationContainer,
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import merge from "deepmerge";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { useColorScheme } from "react-native";
import {
    MD3DarkTheme,
    MD3LightTheme,
    PaperProvider,
    adaptNavigationTheme,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Custom contexts used through out the app
export const ThemeContext = React.createContext(); // used for getting and setting the theme
export const AuthContext = React.createContext(); // used for managing the authentication flow

// Build a combined theme for react-navigation and react-native-paper components
function BuildCombinedTheme() {
    const { LightTheme, DarkTheme } = adaptNavigationTheme({
        reactNavigationLight: NavigationDefaultTheme,
        reactNavigationDark: NavigationDarkTheme
    });

    const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
    const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

    return {CombinedDefaultTheme, CombinedDarkTheme};
}

// provides required contexts for the child components
export default function AppContextProvider({ children }) {
    const [currentTheme, setCurrentTheme] = React.useState("system");

    // try to load user selected theme from storage, if non existent or failed return back to default 'system'
    React.useEffect(() => {
		AsyncStorage.getItem('app-theme')
        .then(
            value => {
                if (value !== null) {
                    setCurrentTheme(value);
                }
            }
        )
        .catch(
            err => console.log(err)
        )
	}, [])

    // provides hook for accessing the system theme
    const systemColorScheme = useColorScheme();

    // decide if theme should be dark or not
    const isThemeDark = theme => {
        switch (theme) {
            case 'system':
                return (systemColorScheme === 'dark');
            case 'light':
                return false;
            case 'dark':
                return true;
        }
    }

    // value for ThemeContext
    const preferences = React.useMemo(
		() => ({
			changeTheme: theme => { // used for chaning and storing the selected theme
				setCurrentTheme(theme);
				AsyncStorage.setItem('app-theme', theme)
				.catch(
					err => console.log(err)
				)
			},
			currentTheme // used for accessing the current theme
		}),
		[currentTheme]
	);

    const combinedTheme = BuildCombinedTheme();

    // the theme that will be used throughout the app
    const theme = isThemeDark(currentTheme) ? combinedTheme.CombinedDarkTheme : combinedTheme.CombinedDefaultTheme;

    return (
        <ThemeContext.Provider value={preferences}>
            <SafeAreaProvider>
                <PaperProvider theme={theme}>
                    <NavigationContainer theme={theme}>
                        {children}
                        <StatusBar style='auto'/>
                    </NavigationContainer>
                </PaperProvider>
            </SafeAreaProvider>
        </ThemeContext.Provider>
    );
}
