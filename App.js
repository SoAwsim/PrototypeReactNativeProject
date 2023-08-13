import React from 'react';
import 'react-native-gesture-handler';
import ThemeProvider from './src/context/ThemeProvider';
import AuthFlow from './src/navigation/AuthFlow';

export default function App() {
	return (
		<ThemeProvider>
			<AuthFlow />
		</ThemeProvider>
	);
}
