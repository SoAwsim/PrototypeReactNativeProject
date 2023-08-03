import axios from "axios";
import { useState } from "react";
import { ScrollView } from 'react-native';
import { Button, TextInput } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { loginStyle } from "./LoginStyle";

export default function LoginScreen({ navigation }) {
    const insets = useSafeAreaInsets();

    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [isError, setError] = useState(false);

    const loginUser = (username, password) => {
        const loginAPI = "https://workbench.persystlab.org/api/login.php";

        const promise = axios.post(loginAPI, {
            username: username,
            password: password,
        });

        const data = promise.then(response => response.data);

        return data;
    };

    function emailInputHandler(enteredEmail) {
        setEnteredEmail(enteredEmail);
        setError(false);
    };

    function passwordInputHandler(enteredPassword) {
        setEnteredPassword(enteredPassword);
        setError(false);
    };

    function signInHandler() {
        console.log("Email: " + enteredEmail + "\nPassword: " + enteredPassword);

        loginUser(enteredEmail, enteredPassword).then(
            data => { // add UI notification TODO
                if (data.status === "success") {
                    console.log("login");
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'DummyHome' }],
                    });
                } else {
                    console.log("fail");
                    setError(true);
                }
            },
            err => console.log(err)
        );
    };

    return (
        <ScrollView contentContainerStyle={loginStyle(insets).SafeAreaFlex}>
            <TextInput
                mode="outlined"
                label="Enter your email"
                placeholder="example@example.com"
                value={enteredEmail}
                onChangeText={emailInputHandler}
                autoCapitalize="none"
                autoComplete="email"
                error={isError}
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
                error={isError}
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
