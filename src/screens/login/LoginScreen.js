import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import { StyleSheet, View } from 'react-native';
import { TextInput, Button } from "react-native-paper";

export default function LoginScreen({ navigation }) {
    const insets = useSafeAreaInsets();

    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');

    function emailInputHandler(enteredEmail) {
        setEnteredEmail(enteredEmail);
    };

    function passwordInputHandler(enteredPassword) {
        setEnteredPassword(enteredPassword);
    };

    function signInHandler() {
        console.log("Email: " + enteredEmail + "\nPassword: " + enteredPassword);
        navigation.reset({
            index: 0,
            routes: [{name: 'DummyHome'}],
        });
    };

    return (
        <View style={styles(insets).SafeAreaFlex}>
            <TextInput
                mode="outlined"
                label="Enter your email"
                placeholder="example@example.com"
                value={enteredEmail}
                onChangeText={emailInputHandler}
                style={styles(insets).TextInput}
            />
            <TextInput
                mode="outlined"
                label="Enter your password"
                value={enteredPassword}
                onChangeText={passwordInputHandler}
                secureTextEntry={true}
                style={styles(insets).TextInput}
            />
            <Button
                mode="contained"
                onPress={signInHandler}
                style={styles(insets).SignInButton}
            >
                Sign In
            </Button>
        </View>
    );
}

const styles = (insets) => StyleSheet.create({
    SafeAreaFlex: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right
    },

    TextInput: {
        width: '95%',
        margin: 10
    },

    SignInButton: {
        margin: 40,
        width: '75%'
    }
});
