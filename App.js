import React from 'react';
import 'react-native-gesture-handler';
import AppContextProvider from './src/context/AppContextProvider';
import AuthFlow from './src/navigation/AuthFlow';

export default function App() {
	return (
		<AppContextProvider>
			<AuthFlow />
		</AppContextProvider>
	);
}
