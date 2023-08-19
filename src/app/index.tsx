import { Redirect, SplashScreen, useRootNavigationState } from "expo-router";
import { useEffect } from "react";
import { useAuthContext } from "../providers/AuthProvider";

export default function LoadAuthToken() {
  SplashScreen.preventAutoHideAsync();
  const { isSignedIn, isLoading } = useAuthContext();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!isLoading && navigationState?.key) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  if (isLoading && !navigationState?.key) {
    return null;
  } else if (isSignedIn) {
    return <Redirect href={"/home"} />;
  } else {
    return <Redirect href={"/login"} />;
  }
}
