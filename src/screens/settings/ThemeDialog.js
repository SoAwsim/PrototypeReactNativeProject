import { Button, Dialog, RadioButton, Text } from "react-native-paper";
import { useState, useContext } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { ThemeContext } from "../../context/ThemeProvider";
import i18n from "../../localization/i18n";

export default function ThemeDialog({ visible, hideDialog }) {
    const { currentTheme, changeTheme } = useContext(ThemeContext);
    const [checked, setChecked] = useState(currentTheme);

    function selectButton(selectedTheme) {
        setChecked(selectedTheme);
        changeTheme(selectedTheme);
        hideDialog();
    }

    return (
        <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>{i18n.t('settingsScreen.themeDialog.title')}</Dialog.Title>
            <Dialog.Content>
                <Pressable onPress={() => selectButton('light')}>
                    <View style={ThemeDialogStyle.RadioElement}>
                        <RadioButton
                            value="light"
                            status={ checked === 'light' ? 'checked' : 'unchecked' }
                            onPress={() => selectButton('light')}
                        />
                        <Text variant="titleMedium">{i18n.t('settingsScreen.themeText.light')}</Text>
                    </View>
                </Pressable>
                <Pressable onPress={() => selectButton('dark')}>
                    <View style={ThemeDialogStyle.RadioElement}>
                        <RadioButton
                            value="dark"
                            status={ checked === 'dark' ? 'checked' : 'unchecked' }
                            onPress={() => selectButton('dark')}
                        />
                        <Text variant="titleMedium">{i18n.t('settingsScreen.themeText.dark')}</Text>
                    </View>
                </Pressable>
                <Pressable onPress={() => selectButton('system')}>
                    <View style={ThemeDialogStyle.RadioElement}>
                        <RadioButton
                            value="system"
                            status={ checked === 'system' ? 'checked' : 'unchecked' }
                            onPress={() => selectButton('system')}
                        />
                        <Text variant="titleMedium">{i18n.t('settingsScreen.themeText.system')}</Text>
                    </View>
                </Pressable>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={hideDialog}>{i18n.t('settingsScreen.themeDialog.cancel')}</Button>
            </Dialog.Actions>
        </Dialog>
    );
}

const ThemeDialogStyle = StyleSheet.create({
    RadioElement: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})
