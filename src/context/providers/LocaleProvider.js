import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import { useEffect, useMemo, useRef, useState } from "react";
import { AppState } from "react-native";
import i18n from "../../localization/i18n";
import { LocaleContext } from "../AppContext";

export default function LocaleProvider({ children }) {
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    const [systemLang, setSystemLang] = useState(getLocales()[0].languageCode);
    const [appLang, setAppLang] = useState('en');
    const [displayLang, setDisplayLang] = useState('en');

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            appState.current = nextAppState;
            setAppStateVisible(appState.current);
        });

        return () => {
            subscription.remove();
        };
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('app-lang')
        .then(
            storageLang => {
                if (systemLang !== 'en' && systemLang !== 'tr') {
                    setSystemLang('und');
                }

                if (storageLang !== null) { // user has a stored lang preference
                    setAppLang(storageLang);
                    if (storageLang === 'system') { // user follow system lang
                        if (systemLang !== 'und') { // system lang is supported by the app
                            i18n.locale = systemLang;
                            setDisplayLang(systemLang);
                        } else { // system lang is not supported by the app fallback to en
                            i18n.locale = "en";
                            setDisplayLang('en');
                        }
                    } else { // user is not following the system lang
                        i18n.locale = storageLang;
                        setDisplayLang(storageLang);
                    }
                } else if (systemLang !== 'und') { // user does not have a lang preference but system lang is supported by the app
                    i18n.locale = systemLang;
                    setAppLang('system');
                    setDisplayLang(systemLang);
                } else { // user does not have a lang preference and system lang is not supported by the app
                    i18n.locale = "en";
                    setAppLang('en');
                    setDisplayLang('en');
                }
            }
        )
        .catch(
            err => console.log(err)
        );
    }, []);

    useEffect(() => {
        if (appStateVisible === 'active') {
            const currentSystemLang = getLocales()[0].languageCode;
            if (currentSystemLang !== 'en' && currentSystemLang !== 'tr') {
                setSystemLang('und');

            } else {
                setSystemLang(currentSystemLang);
            }

            if (appLang === 'system') {
                if (systemLang === 'und') {
                    console.log("Unsupported system language set, falling back to en");
                    i18n.locale = "en";
                    setDisplayLang('en');
                } else {
                    i18n.locale = systemLang;
                    setDisplayLang(systemLang);
                }
            }
        }
    }, [appStateVisible]);

    const langPreferences = useMemo(
        () => ({
            changeLang: lang => {
                AsyncStorage.setItem('app-lang', lang)
                .catch(
                    err => console.log(err)
                );
                setAppLang(lang);
                if (lang === 'system') { // user has chosen the system lang
                    if (systemLang !== 'und') { // system lang is supported by the app
                        i18n.locale = systemLang;
                        setDisplayLang(systemLang);
                    } else { // system lang is not supported by the app
                        i18n.locale = "en";
                        setDisplayLang('en');
                    }
                } else { // user has chosen a language that the app supports
                    i18n.locale = lang;
                    setDisplayLang(lang);
                }
            },
            systemLang, // provides the system lang
            appLang, // provides currently chosen lang
            displayLang // provides which lang should be displayed by the components
        }),
        [systemLang, appLang, displayLang]
    )

    return (
        <LocaleContext.Provider value={langPreferences}>
            {children}
        </LocaleContext.Provider>
    );
}
