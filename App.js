import {
	NavigationContainer,
	DarkTheme as NavigationDarkTheme,
	DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import merge from 'deepmerge';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useColorScheme } from 'react-native';
import 'react-native-gesture-handler';
import {
	MD3DarkTheme,
	MD3LightTheme,
	PaperProvider,
	adaptNavigationTheme
} from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthFlow from './src/navigation/AuthFlow';
import { ThemeContext } from './src/context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
	reactNavigationLight: NavigationDefaultTheme,
	reactNavigationDark: NavigationDarkTheme
});

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

export default function App() {
	const [currentTheme, setCurrentTheme] = React.useState("system");

	React.useEffect(() => {
		AsyncStorage.getItem('app-theme')
        .then(
            value => {
				console.log(value)
                if (value !== null) {
                    setCurrentTheme(value);
                }
            }
        )
        .catch(
            err => console.log(err)
        )
	}, [])

	const colorScheme = useColorScheme();

	let isThemeDark;

	switch (currentTheme) {
		case 'system':
			isThemeDark = colorScheme === 'dark'
			break;
		case 'light':
			isThemeDark = false;
			break;
		case 'dark':
			isThemeDark = true;
			break;
	};

	const preferences = React.useMemo(
		() => ({
			changeTheme: theme => {
				setCurrentTheme(theme);
				AsyncStorage.setItem('app-theme', theme)
				.then(
					() => console.log("Theme saved")
				)
				.catch(
					err => console.log(err)
				)
			},
			currentTheme
		}),
		[currentTheme]
	);

	//const colorScheme = useColorScheme();
	//const isThemeDark = colorScheme === 'dark';

	let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

	return (
		<ThemeContext.Provider value={preferences}>
			<SafeAreaProvider>
				<PaperProvider theme={theme}>
					<NavigationContainer theme={theme}>
						<AuthFlow />
						<StatusBar style='auto'/>
					</NavigationContainer>
				</PaperProvider>
			</SafeAreaProvider>
		</ThemeContext.Provider>
	);
}
