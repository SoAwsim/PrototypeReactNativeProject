import { 
	PaperProvider,
	MD3DarkTheme,
	MD3LightTheme,
	adaptNavigationTheme
} from 'react-native-paper';
import {
	DarkTheme as NavigationDarkTheme,
	DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import NavigationRoot from './src/NavigationRoot';
import merge from 'deepmerge';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';

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
