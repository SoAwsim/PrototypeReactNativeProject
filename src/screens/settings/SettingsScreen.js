import { View, ScrollView, StyleSheet } from "react-native";
import { useState, useContext } from "react";
import { Appbar, Text, TouchableRipple, Portal } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ThemeDialog from "./ThemeDialog";
import { ThemeContext } from "../../context/ThemeProvider";
import i18n from "../../localization/i18n";

export default function SettingsScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const style = SettingsStyle(insets);

    const [dialogVisible, setDialogVisible] = useState(false);
    const { currentTheme } = useContext(ThemeContext);

    const showDialog = () => setDialogVisible(true);

    const hideDialog = () => setDialogVisible(false);

    const themeText = currentTheme === 'system' ? i18n.t('settingsScreen.themeText.system') :
        currentTheme === 'light' ? i18n.t('settingsScreen.themeText.light') : i18n.t('settingsScreen.themeText.dark');

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title={i18n.t('settingsScreen.appBarTitle')} style={{ marginLeft: 20 }} />
            </Appbar.Header>
            <View style={style.MainView}>
                <Portal>
                    <ThemeDialog visible={dialogVisible} hideDialog={hideDialog} />
                </Portal>
                <ScrollView>
                    <Text variant="labelLarge" style={style.SectionText} >
                        {i18n.t('settingsScreen.sectionApp.title')}
                    </Text>
                    <View>
                        <TouchableRipple onPress={() => showDialog()} >
                            <View style={{ paddingVertical: 10, paddingLeft: 20 }}>
                                <Text variant="titleLarge">{i18n.t('settingsScreen.sectionApp.theme')}</Text>
                                <Text variant="labelMedium">{themeText}</Text>
                            </View>
                        </TouchableRipple>
                    </View>
                </ScrollView>
            </View>
        </>
    )
}

const SettingsStyle = (insets) => StyleSheet.create({
    MainView: {
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right
    },
    SectionText: {
        marginBottom: 10,
        paddingLeft: 20,
    },
    SettingBox: {
        marginTop: 10,
    }
})
