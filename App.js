import { PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavigationRoot from './src/NavigationRoot';

export default function App() {
  return (
	<SafeAreaProvider>
		<PaperProvider>
			<NavigationRoot />
			<StatusBar style='auto' />
    	</PaperProvider>
	</SafeAreaProvider>
  );
}
