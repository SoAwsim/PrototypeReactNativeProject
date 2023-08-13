import { View, ScrollView, StyleSheet } from "react-native";
import { useState, useContext } from "react";
import { Appbar, Text, TouchableRipple, Portal } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ThemeDialog from "./ThemeDialog";
import { ThemeContext } from "../../context/ThemeProvider";

export default function SettingsScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const style = SettingsStyle(insets);

    const [dialogVisible, setDialogVisible] = useState(false);
    const { currentTheme } = useContext(ThemeContext);

    const showDialog = () => setDialogVisible(true);

    const hideDialog = () => setDialogVisible(false);

    const themeText = currentTheme === 'system' ? 'System Default' : currentTheme === 'light' ? 'Light' : 'Dark';

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Settings" style={{ marginLeft: 20 }} />
            </Appbar.Header>
            <View style={style.MainView}>
                <Portal>
                    <ThemeDialog visible={dialogVisible} hideDialog={hideDialog} />
                </Portal>
                <ScrollView>
                    <Text variant="labelLarge" style={style.SectionText}>App</Text>
                    <View>
                        <TouchableRipple onPress={() => showDialog()} >
                            <View style={{ paddingVertical: 10, paddingLeft: 20 }}>
                                <Text variant="titleLarge">Theme</Text>
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
