import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import { StyleSheet, View } from 'react-native';
import { TextInput, Button } from "react-native-paper";
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
        <View style={styles(insets).SafeAreaFlex}>
            <TextInput
                mode="outlined"
                label="Enter your email"
                placeholder="example@example.com"
                value={enteredEmail}
                onChangeText={emailInputHandler}
                error={isError}
                style={styles(insets).TextInput}
            />
            <TextInput
                mode="outlined"
                label="Enter your password"
                value={enteredPassword}
                onChangeText={passwordInputHandler}
                secureTextEntry={true}
                error={isError}
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
