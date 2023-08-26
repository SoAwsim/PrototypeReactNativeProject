import { Redirect, SplashScreen, useRootNavigationState } from "expo-router";
import { useEffect } from "react";
import { useAuthContext } from "../providers/AuthProvider";

// Show the splash screen until navigation and auth state is ready
SplashScreen.preventAutoHideAsync();

export default function LoadAuthToken() {
  const { isSignedIn, isLoading } = useAuthContext();

  // work around for expo-router bug https://github.com/expo/router/issues/740
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!isLoading && navigationState?.key) {
      SplashScreen.hideAsync();
    }
  }, [isLoading, navigationState]);

  if (isLoading && !navigationState?.key) {
    return null;
  } else if (isSignedIn) {
    return <Redirect href={"/home"} />;
  } else {
    return <Redirect href={"/login"} />;
  }
}
