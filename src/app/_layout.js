import { Stack } from "expo-router";
import AuthProvider from "../context/providers/AuthProvider";
import LocaleProvider from "../context/providers/LocaleProvider";
import CustomThemeProvider from "../context/providers/ThemeProvider";

export default function RootLayout() {
  return (
    <CustomThemeProvider>
      <LocaleProvider>
        <AuthProvider>
          <Stack
            screenOptions={{ headerShown: false }}
            initialRouteName="modal"
          >
            <Stack.Screen name="login" />
            <Stack.Screen name="home" />
          </Stack>
        </AuthProvider>
      </LocaleProvider>
    </CustomThemeProvider>
  );
}
