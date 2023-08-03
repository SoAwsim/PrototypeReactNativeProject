import {
	DarkTheme as NavigationDarkTheme,
	DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import merge from 'deepmerge';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useColorScheme } from 'react-native';
import {
	MD3DarkTheme,
	MD3LightTheme,
	PaperProvider,
	adaptNavigationTheme
} from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavigationRoot from './src/NavigationRoot';

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
				<NavigationRoot theme={theme}/>
				<StatusBar style='auto'/>
			</PaperProvider>
		</SafeAreaProvider>
	);
}
