import { View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";

export default function SettingsItem({ title, label, onPress }) {
    return(
        <TouchableRipple onPress={onPress}>
            <View style={{ paddingVertical: 10, paddingLeft: 20 }}>
                <Text variant="titleLarge">{title}</Text>
                <Text variant="labelMedium">{label}</Text>
            </View>
        </TouchableRipple>
    );
}
