import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, View } from 'react-native';
import { Text, Button, Appbar } from 'react-native-paper';

export default function DummyHome({ navigation }) {
    const insets = useSafeAreaInsets();

    return (
        <>
            <Appbar.Header>
                <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
            </Appbar.Header>
            <View style={styles(insets).SafeAreaFlex}>
                <Text>This is the dummy home page</Text>
            </View>
        </>
    );
}

const styles = (insets) => StyleSheet.create({
    SafeAreaFlex: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right
    }
})
