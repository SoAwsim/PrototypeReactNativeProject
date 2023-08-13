import { Pressable, StyleSheet, View } from "react-native";
import { RadioButton, Text } from "react-native-paper";

export default function CustomRadioItem({ onPress, radioValue, radioStatusCondition, label }) {
    return (
        <Pressable onPress={onPress}>
            <View style={DialogStyle.RadioElement}>
                <RadioButton
                    value={radioValue}
                    status={radioStatusCondition ? 'checked' : 'unchecked'}
                    onPress={onPress}
                />
                <Text variant="titleMedium">{label}</Text>
            </View>
        </Pressable>
    );
}

const DialogStyle = StyleSheet.create({
    RadioElement: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})
