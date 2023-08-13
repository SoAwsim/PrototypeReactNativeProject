import { useState, useContext } from "react";
import { ScrollView, StyleSheet } from 'react-native';
import { Button, TextInput } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AuthContext } from "../../context/AuthContext";
import i18n from "../../localization/i18n";

export default function LoginScreen() {
    const insets = useSafeAreaInsets(); // safe area paddings
    const style = loginStyle(insets);

    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');

    const { signIn, isError, setIsError } = useContext(AuthContext);

    function usernameInputHandler(enteredUsername) {
        setEnteredUsername(enteredUsername);
        setIsError(false); // clear error state when anything is typed
    };

    function passwordInputHandler(enteredPassword) {
        setEnteredPassword(enteredPassword);
        setIsError(false); // clear error state when anything is typed
    };

    function signInHandler() {
        console.log("Username: " + enteredUsername + "\nPassword: " + enteredPassword); // for debugging proposes remove later

        signIn({ enteredUsername, enteredPassword }); // use singIn function from AuthContext
    };

    return (
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={style.SafeAreaFlex}>
            <TextInput
                mode="outlined"
                label={i18n.t('loginScreen.usernameField.label')}
                placeholder={i18n.t('loginScreen.usernameField.placeholder')}
                value={enteredUsername}
                onChangeText={usernameInputHandler}
                autoCapitalize="none"
                textContentType="username" // IOS 11+ keychain support
                autoComplete="username"
                error={isError}
                keyboardType="default"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => this.passwordInput.focus()}
                style={style.TextInput}
            />
            <TextInput
                ref={input => this.passwordInput = input}
                mode="outlined"
                label={i18n.t('loginScreen.passwordField.label')}
                value={enteredPassword}
                onChangeText={passwordInputHandler}
                textContentType="password" // IOS 11+ keychain support
                autoComplete="current-password"
                secureTextEntry={true}
                error={isError}
                returnKeyType="send"
                onSubmitEditing={() => signInHandler()}
                style={style.TextInput}
            />
            <Button
                mode="contained"
                onPress={signInHandler}
                style={style.SignInButton}
            >
                {i18n.t('loginScreen.signInButton')}
            </Button>
        </ScrollView>
    );
}

const loginStyle = props => StyleSheet.create({
    SafeAreaFlex: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: props.top,
        paddingBottom: props.bottom,
        paddingLeft: props.left,
        paddingRight: props.right
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
