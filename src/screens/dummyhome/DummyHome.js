import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

export default function DummyHome() {
    const insets = useSafeAreaInsets();

    return (
        <View style={styles(insets).SafeAreaFlex}>
            <Text>
                This is the dummy home page
            </Text>
        </View>
    );
}

const styles = (insets) => StyleSheet.create({
    SafeAreaFlex: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right
    }
})
