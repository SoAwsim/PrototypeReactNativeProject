import React from 'react';
import 'react-native-gesture-handler';
import LocaleProvider from './src/context/providers/LocaleProvider';
import ThemeProvider from './src/context/providers/ThemeProvider';
import AuthFlow from './src/navigation/AuthFlow';

export default function App() {
	return (
		<ThemeProvider>
			<LocaleProvider>
				<AuthFlow />
			</LocaleProvider>
		</ThemeProvider>
	);
}
