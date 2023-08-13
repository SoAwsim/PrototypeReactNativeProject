import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    NavigationContainer,
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import merge from "deepmerge";
import { StatusBar } from "expo-status-bar";
import {
    createContext,
    useEffect,
    useMemo,
    useState
} from "react";
import { useColorScheme } from "react-native";
import {
    MD3DarkTheme,
    MD3LightTheme,
    PaperProvider,
    adaptNavigationTheme,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Custom contexts used through out the app
export const ThemeContext = createContext(); // used for getting and setting the theme

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

const combinedTheme = BuildCombinedTheme();

// provides required contexts for the child components
export default function ThemeProvider({ children }) {
    const [currentTheme, setCurrentTheme] = useState('system');
    
    // provides hook for accessing the system theme
    const systemColorScheme = useColorScheme();

    // decide if theme should be dark or not
    const isThemeDark = () => {
        switch (currentTheme) {
            case 'system':
                return (systemColorScheme === 'dark');
            case 'light':
                return false;
            case 'dark':
                return true;
        }
    }

    // try to load user selected theme from storage, if non existent or failed return back to default 'system'
    useEffect(() => {
		AsyncStorage.getItem('app-theme')
        .then(
            storageTheme => {
                if (storageTheme !== null) {
                    setCurrentTheme(storageTheme);
                }
            }
        )
        .catch(
            err => console.log(err)
        )
	}, [])

    // value for ThemeContext
    const preferences = useMemo(
		() => ({
			changeTheme: theme => { // used for chaning and storing the selected theme
				AsyncStorage.setItem('app-theme', theme)
				.catch(
					err => console.log(err)
				)
                setCurrentTheme(theme);
			},
			currentTheme // used for accessing the current theme
		}),
		[currentTheme]
	);

    // the theme that will be used throughout the app
    const theme = isThemeDark() ? {appTheme: combinedTheme.CombinedDarkTheme, statusBar: 'light'} : {appTheme: combinedTheme.CombinedDefaultTheme, statusBar: 'dark'};

    return (
        <ThemeContext.Provider value={preferences}>
            <SafeAreaProvider>
                <PaperProvider theme={theme.appTheme}>
                    <NavigationContainer theme={theme.appTheme}>
                        {children}
                        <StatusBar style={theme.statusBar} />
                    </NavigationContainer>
                </PaperProvider>
            </SafeAreaProvider>
        </ThemeContext.Provider>
    );
}
