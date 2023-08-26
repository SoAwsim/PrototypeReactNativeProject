import { useRef, useState } from "react";
import { ScrollView, StyleSheet, TextInput as NativeInput } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuthContext } from "@/providers/AuthProvider";
import { useLocaleContext } from "@/providers/LocaleProvider";
import i18n from "@/localization/i18n";

export default function LoginScreen() {
  const insets = useSafeAreaInsets(); // safe area paddings
  const style = loginStyle(insets);

  const { displayLang } = useLocaleContext();

  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  // used to navigate to the password field with keyboard next button from username field
  const refPasswordInput = useRef<NativeInput | null>(null);

  const { signIn, isError, clearInputError } = useAuthContext();

  function usernameInputHandler(enteredUsername: string) {
    setEnteredUsername(enteredUsername);
    clearInputError(); // clear error state when anything is typed
  }

  function passwordInputHandler(enteredPassword: string) {
    setEnteredPassword(enteredPassword);
    clearInputError(); // clear error state when anything is typed
  }

  function signInHandler() {
    console.log(
      "Username: " + enteredUsername + "\nPassword: " + enteredPassword
    ); // for debugging proposes remove later

    signIn(enteredUsername, enteredPassword); // use singIn function from AuthContext
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={style.SafeAreaFlex}
    >
      <TextInput
        mode="outlined"
        label={i18n.t("loginScreen.usernameField.label", {
          locale: displayLang,
        })}
        placeholder={i18n.t("loginScreen.usernameField.placeholder", {
          locale: displayLang,
        })}
        value={enteredUsername}
        onChangeText={usernameInputHandler}
        autoCapitalize="none"
        textContentType="username" // IOS 11+ keychain support
        autoComplete="username"
        error={isError}
        keyboardType="default"
        returnKeyType="next"
        blurOnSubmit={false}
        onSubmitEditing={() => refPasswordInput.current?.focus()}
        style={style.TextInput}
      />
      <TextInput
        ref={refPasswordInput}
        mode="outlined"
        label={i18n.t("loginScreen.passwordField.label", {
          locale: displayLang,
        })}
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
        {i18n.t("loginScreen.signInButton", { locale: displayLang })}
      </Button>
    </ScrollView>
  );
}

const loginStyle = (insets: EdgeInsets) =>
  StyleSheet.create({
    SafeAreaFlex: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    },

    TextInput: {
      width: "95%",
      margin: 10,
    },

    SignInButton: {
      margin: 40,
      width: "75%",
    },
  });
