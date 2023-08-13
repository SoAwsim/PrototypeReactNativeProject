import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, View } from 'react-native';
import { Text, Appbar } from 'react-native-paper';
import i18n from "../../localization/i18n";

export default function DummyHome({ navigation }) {
    const insets = useSafeAreaInsets();

    return (
        <>
            <Appbar.Header>
                <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
            </Appbar.Header>
            <View style={styles(insets).SafeAreaFlex}>
                <Text>{i18n.t('dummyHomeScreen.dummyText')}</Text>
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
