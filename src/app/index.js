import { Redirect, useRootNavigationState } from "expo-router";
import { useContext } from "react";
import { View } from "react-native";
import { AuthContext } from "../context/AppContext";

export default function LoadAuthToken() {
  const { isSignIn } = useContext(AuthContext);

  const navigationState = useRootNavigationState();

  if (!navigationState?.key) {
    return <View />;
  } else if (isSignIn) {
    return <Redirect href={"/home"} />;
  } else {
    return <Redirect href={"/login"} />;
  }
}
