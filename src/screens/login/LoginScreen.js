import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import { View } from 'react-native';
import { TextInput, Button } from "react-native-paper";
import { loginStyle } from "./LoginStyle";
import axios from "axios";

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
                        routes: [{name: 'DummyHome'}],
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
        <View style={loginStyle(insets).SafeAreaFlex}>
            <TextInput
                mode="outlined"
                label="Enter your email"
                placeholder="example@example.com"
                value={enteredEmail}
                onChangeText={emailInputHandler}
                error={isError}
                style={loginStyle(insets).TextInput}
            />
            <TextInput
                mode="outlined"
                label="Enter your password"
                value={enteredPassword}
                onChangeText={passwordInputHandler}
                secureTextEntry={true}
                error={isError}
                style={loginStyle(insets).TextInput}
            />
            <Button
                mode="contained"
                onPress={signInHandler}
                style={loginStyle(insets).SignInButton}
            >
                Sign In
            </Button>
        </View>
    );
}
