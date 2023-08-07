import { View } from "react-native";
import { Appbar, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SettingsStyle } from "./SettingsScreenStyle";

export default function SettingsScreen({ navigation }) {
    const insets = useSafeAreaInsets();

    return (
        <>
            <Appbar.Header>
                <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()}/>
            </Appbar.Header>
            <View style={SettingsStyle(insets).MainView}>
                <Text>This the settings page</Text>
            </View>
        </>
    )
}
