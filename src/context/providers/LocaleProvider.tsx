import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { AppState } from "react-native";
import { LocaleContext } from "../AppContext";

export enum SystemLang {
  und,
  en,
  tr,
}

export enum AppLang {
  sys = "system",
  en = "en",
  tr = "tr",
}

export interface LocaleValueType {
  changeLang: (lang: AppLang) => void;
  systemLang: SystemLang;
  appLang: AppLang;
  displayLang: string;
}

function findDisplayLang(lang: SystemLang): string {
  switch (lang) {
    case SystemLang.und:
    case SystemLang.en:
      return "en";
    case SystemLang.tr:
      return "tr";
  }
}

export default function LocaleProvider({ children }: { children: ReactNode }) {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const [systemLang, setSystemLang] = useState(SystemLang.und);
  const [appLang, setAppLang] = useState(AppLang.en);
  const [displayLang, setDisplayLang] = useState("en");

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("app-lang")
      .then((storageLang) => {
        let currentSysLang = getLocales()[0].languageCode;
        if (currentSysLang === "en") setSystemLang(SystemLang.en);
        else if (currentSysLang === "tr") setSystemLang(SystemLang.tr);
        else currentSysLang = "und";

        if (storageLang !== null) {
          // user has a stored lang preference
          switch (storageLang) {
            case "en":
              setAppLang(AppLang.en);
              break;
            case "tr":
              setAppLang(AppLang.tr);
              break;
            case "system":
              setAppLang(AppLang.sys);
              break;
          }

          if (storageLang === "system") {
            // user follow system lang
            if (currentSysLang === "und") {
              setDisplayLang("en");
            } else {
              setDisplayLang(currentSysLang);
            }
          } else {
            // user is not following the system lang
            setDisplayLang(storageLang);
          }
        } else if (currentSysLang !== "und") {
          // user does not have a lang preference but system lang is supported by the app
          setAppLang(AppLang.sys);
          setDisplayLang(currentSysLang);
        } else {
          // user does not have a lang preference and system lang is not supported by the app
          setAppLang(AppLang.sys);
          setDisplayLang("en");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // run when app is back into the foreground
  useEffect(() => {
    if (appStateVisible === "active") {
      const currentSystemLang = getLocales()[0].languageCode;
      currentSystemLang === "en"
        ? setSystemLang(SystemLang.en)
        : currentSystemLang === "tr"
        ? setSystemLang(SystemLang.tr)
        : setSystemLang(SystemLang.und);

      if (appLang === AppLang.sys) {
        if (systemLang === SystemLang.und) {
          console.log("Unsupported system language set, falling back to en");
        }
        setDisplayLang(findDisplayLang(systemLang));
      }
    }
  }, [appStateVisible]);

  const langPreferences: LocaleValueType = useMemo(
    () => ({
      changeLang: (lang: AppLang) => {
        AsyncStorage.setItem("app-lang", lang).catch((err) => console.log(err));
        setAppLang(lang);

        if (lang === AppLang.sys) {
          // user has chosen the system lang
          setDisplayLang(findDisplayLang(systemLang));
        } else {
          // user has chosen a language that the app supports
          setDisplayLang(lang);
        }
      },
      systemLang, // provides the system lang
      appLang, // provides currently chosen lang
      displayLang, // provides which lang should be displayed by the components
    }),
    [systemLang, appLang, displayLang]
  );

  return (
    <LocaleContext.Provider value={langPreferences}>
      {children}
    </LocaleContext.Provider>
  );
}
