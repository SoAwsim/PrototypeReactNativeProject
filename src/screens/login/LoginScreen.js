import { useState, useContext } from "react";
import { ScrollView } from 'react-native';
import { Button, TextInput } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { loginStyle } from "./LoginStyle";
import { AuthContext } from "../../context/AuthContext";

export default function LoginScreen(props) {
    const insets = useSafeAreaInsets();

    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');

    const { signIn, updateIsError } = useContext(AuthContext);

    function emailInputHandler(enteredEmail) {
        setEnteredEmail(enteredEmail);
        updateIsError();
    };

    function passwordInputHandler(enteredPassword) {
        setEnteredPassword(enteredPassword);
        updateIsError();
    };

    function signInHandler() {
        console.log("Email: " + enteredEmail + "\nPassword: " + enteredPassword);

        signIn({ enteredEmail, enteredPassword });
    };

    return (
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={loginStyle(insets).SafeAreaFlex}>
            <TextInput
                mode="outlined"
                label="Enter your email"
                placeholder="example@example.com"
                value={enteredEmail}
                onChangeText={emailInputHandler}
                autoCapitalize="none"
                textContentType="emailAddress"
                autoComplete="email"
                error={props.isError}
                keyboardType="email-address"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => this.passwordInput.focus()}
                style={loginStyle(insets).TextInput}
            />
            <TextInput
                ref={input => this.passwordInput = input}
                mode="outlined"
                label="Enter your password"
                value={enteredPassword}
                onChangeText={passwordInputHandler}
                textContentType="password" // IOS 11+ password keychain support
                autoComplete="current-password"
                secureTextEntry={true}
                error={props.isError}
                returnKeyType="send"
                onSubmitEditing={() => signInHandler()}
                style={loginStyle(insets).TextInput}
            />
            <Button
                mode="contained"
                onPress={signInHandler}
                style={loginStyle(insets).SignInButton}
            >
                Sign In
            </Button>
        </ScrollView>
    );
}
