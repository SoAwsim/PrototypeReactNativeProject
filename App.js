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

const { LightTheme, DarkTheme } = adaptNavigationTheme({
	reactNavigationLight: NavigationDefaultTheme,
	reactNavigationDark: NavigationDarkTheme
});

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

export default function App() {

	const colorScheme = useColorScheme();
	const isThemeDark = colorScheme === 'dark';

	let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

	return (
		<SafeAreaProvider>
			<PaperProvider theme={theme}>
				<NavigationContainer theme={theme}>
					<AuthFlow />
					<StatusBar style='auto'/>
				</NavigationContainer>
			</PaperProvider>
		</SafeAreaProvider>
	);
}
