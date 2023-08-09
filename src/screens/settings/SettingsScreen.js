import { View, ScrollView } from "react-native";
import { useState, useContext } from "react";
import { Appbar, Text, TouchableRipple, Portal, Dialog } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SettingsStyle } from "./SettingsScreenStyle";
import ThemeDialog from "./ThemeDialog";
import { ThemeContext } from "../../context/AppContextProvider";

export default function SettingsScreen({ navigation }) {
    const insets = useSafeAreaInsets();
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
            <View style={SettingsStyle(insets).MainView}>
                <Portal>
                    <ThemeDialog visible={dialogVisible} hideDialog={hideDialog}/>
                </Portal>
                <ScrollView>
                    <Text variant="labelLarge" style={SettingsStyle(insets).SectionText}>App</Text>
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
