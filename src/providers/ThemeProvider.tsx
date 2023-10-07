import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import merge from "deepmerge";
import { setStatusBarStyle } from "expo-status-bar";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useColorScheme } from "react-native";
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";
import { ThemeProp } from "react-native-paper/lib/typescript/types";

type CombinedTheme = Theme & ThemeProp;

// Build a combined theme for react-navigation and react-native-paper components
function BuildCombinedTheme(): {
  CombinedDefaultTheme: CombinedTheme;
  CombinedDarkTheme: CombinedTheme;
} {
  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

  const CombinedDefaultTheme: CombinedTheme = merge(MD3LightTheme, LightTheme);
  const CombinedDarkTheme: CombinedTheme = merge(MD3DarkTheme, DarkTheme);

  return { CombinedDefaultTheme, CombinedDarkTheme };
}

const combinedTheme = BuildCombinedTheme();

export type AppTheme = "light" | "dark" | "system";

export type ThemePreferences = {
  changeTheme: (theme: AppTheme) => void;
  currentTheme: AppTheme;
};

const ThemeContext = createContext<ThemePreferences | undefined>(undefined); // used for getting and setting the theme

export function useThemePreferences() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw Error("useTheme cannot be used outside of CustomThemeProvider");
  }

  return context;
}

// provides required contexts for the child components
export default function CustomThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [currentTheme, setCurrentTheme] = useState<AppTheme>("light");

  let appTheme = combinedTheme.CombinedDefaultTheme;

  // provides hook for accessing the system theme
  const systemColorScheme = useColorScheme();

  switch (currentTheme) {
    case "system":
      appTheme =
        systemColorScheme === "dark"
          ? combinedTheme.CombinedDarkTheme
          : combinedTheme.CombinedDefaultTheme;
      setStatusBarStyle("auto");
      break;
    case "dark":
      appTheme = combinedTheme.CombinedDarkTheme;
      setStatusBarStyle("light");
      break;
    case "light":
      appTheme = combinedTheme.CombinedDefaultTheme;
      setStatusBarStyle("dark");
      break;
  }

  // try to load user selected theme from storage, if non existent or failed return back to default 'system'
  useEffect(() => {
    AsyncStorage.getItem("app-theme")
      .then((storageTheme) => {
        if (storageTheme !== null) {
          storageTheme === "system"
            ? setCurrentTheme("system")
            : storageTheme === "light"
            ? setCurrentTheme("light")
            : setCurrentTheme("dark");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // value for ThemeContext
  const preferences: ThemePreferences = useMemo(
    () => ({
      changeTheme: (theme: AppTheme) => {
        // used for chaning and storing the selected theme
        AsyncStorage.setItem("app-theme", theme).catch((err) =>
          console.log(err)
        );
        setCurrentTheme(theme);
      },
      currentTheme, // used for accessing the current theme
    }),
    [currentTheme]
  );

  return (
    <PaperProvider theme={appTheme}>
      <ThemeProvider value={appTheme}>
        <ThemeContext.Provider value={preferences}>
          {children}
        </ThemeContext.Provider>
      </ThemeProvider>
    </PaperProvider>
  );
}
