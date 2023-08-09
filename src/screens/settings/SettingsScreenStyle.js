import { StyleSheet } from "react-native";

export const SettingsStyle = (insets) => StyleSheet.create({
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
