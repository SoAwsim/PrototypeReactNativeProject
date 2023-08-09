import { Button, Dialog, RadioButton, Text } from "react-native-paper";
import { useState, useContext } from "react";
import { View, Pressable } from "react-native";
import { ThemeContext } from "../../context/AppContextProvider";

export default function ThemeDialog({ visible, hideDialog }) {
    const { currentTheme, changeTheme } = useContext(ThemeContext);

    const selectedIndex = currentTheme === 'system' ? '2' : currentTheme === 'dark' ? '1' : '0';
    const [checked, setChecked] = useState(selectedIndex);

    function selectButton(buttonIndex) {
        setChecked(buttonIndex);
        switch (buttonIndex) {
            case '0':
                changeTheme('light');
                break;
            case '1':
                changeTheme('dark');
                break;
            case '2':
                changeTheme('system');
                break;
            default:
                break;
        }
        hideDialog();
    }

    return (
        <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Choose your desired theme</Dialog.Title>
            <Dialog.Content>
                <Pressable onPress={() => selectButton('0')}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton
                            value="0"
                            status={ checked === '0' ? 'checked' : 'unchecked' }
                            onPress={() => selectButton('0')}
                        />
                        <Text variant="titleMedium">Light</Text>
                    </View>
                </Pressable>
                <Pressable onPress={() => selectButton('1')}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton
                            value="1"
                            status={ checked === '1' ? 'checked' : 'unchecked' }
                            onPress={() => selectButton('1')}
                        />
                        <Text variant="titleMedium">Dark</Text>
                    </View>
                </Pressable>
                <Pressable onPress={() => selectButton('2')}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton
                            value="2"
                            status={ checked === '2' ? 'checked' : 'unchecked' }
                            onPress={() => selectButton('2')}
                        />
                        <Text variant="titleMedium">System Default</Text>
                    </View>
                </Pressable>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={hideDialog}>Cancel</Button>
            </Dialog.Actions>
        </Dialog>
    );
}
