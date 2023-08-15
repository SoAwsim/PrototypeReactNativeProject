import { useContext, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LocaleContext, ThemeContext } from "../../context/AppContext";
import i18n from "../../localization/i18n";
import SettingsItem from "../../components/SettingsItem";
import LanguageDialog from "../../components/dialogs/LanguageDialog";
import ThemeDialog from "../../components/dialogs/ThemeDialog";
import { useRouter } from "expo-router";

export default function SettingsScreen() {
    const insets = useSafeAreaInsets();
    const style = SettingsStyle(insets);

    const [themeDialogVisible, setDialogVisible] = useState(false);
    const { currentTheme } = useContext(ThemeContext);

    const [langDialogVisible, setLangDialogVisible] = useState(false);

    const { displayLang } = useContext(LocaleContext);

    const showThemeDialog = () => setDialogVisible(true);
    const hideThemeDialog = () => setDialogVisible(false);

    const showLangDialog = () => setLangDialogVisible(true);
    const hideLangDialog = () => setLangDialogVisible(false);

    const themeText = currentTheme === 'system' ? i18n.t('settingsScreen.themeText.system') :
        currentTheme === 'light' ? i18n.t('settingsScreen.themeText.light') : i18n.t('settingsScreen.themeText.dark');
    
    const router = useRouter();

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => router.back()} />
                <Appbar.Content title={i18n.t('settingsScreen.appBarTitle', { locale: displayLang })} style={{ marginLeft: 20 }} />
            </Appbar.Header>
            <View style={style.MainView}>
                <ThemeDialog visible={themeDialogVisible} hideDialog={hideThemeDialog} />
                <LanguageDialog visible={langDialogVisible} hideDialog={hideLangDialog} />
                <ScrollView>
                    <Text variant="labelLarge" style={style.SectionText} >
                        {i18n.t('settingsScreen.sectionApp.title', { locale: displayLang })}
                    </Text>
                    <View>
                        <SettingsItem 
                            title={i18n.t('settingsScreen.sectionApp.theme', { locale: displayLang })}
                            label={themeText}
                            onPress={() => showThemeDialog()}
                        />
                        <SettingsItem
                            title={i18n.t('settingsScreen.sectionApp.lang', { locale: displayLang })}
                            label={i18n.t('lang', { locale: displayLang })}
                            onPress={() => showLangDialog()}
                        />
                    </View>
                </ScrollView>
            </View>
        </>
    )
}

const SettingsStyle = (insets) => StyleSheet.create({
    MainView: {
        flex: 1,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right
    },
    SectionText: {
        marginBottom: 10,
        paddingLeft: 20,
    },
})
