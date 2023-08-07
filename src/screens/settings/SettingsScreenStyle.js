import { StyleSheet } from "react-native";

export const SettingsStyle = (insets) => StyleSheet.create({
    MainView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right
    }
})
