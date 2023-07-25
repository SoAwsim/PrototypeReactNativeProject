import { SafeAreaView } from "react-native-safe-area-context";
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function LoginScreen() {
    return (
        <SafeAreaView style={styles.SafeAreaFlex}>
            <TextInput placeholder="Enter your e-mail" style={styles.TextInput} />
            <TextInput placeholder="Enter your password" style={styles.TextInput} />
            <Button title="Sign In" />
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    SafeAreaFlex: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },

    TextInput: {
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 10,
        padding: 10,
        width: '80%',
        margin: 10
    },

    SignInButton: {
        borderRadius: 10,
    }
});
