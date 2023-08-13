import { useContext } from "react";
import { StyleSheet, View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LocaleContext } from "../../context/AppContext";
import i18n from "../../localization/i18n";

export default function DummyHome({ navigation }) {
    const insets = useSafeAreaInsets();

    const { displayLang } = useContext(LocaleContext);

    return (
        <>
            <Appbar.Header>
                <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
            </Appbar.Header>
            <View style={styles(insets).SafeAreaFlex}>
                <Text>{i18n.t('dummyHomeScreen.dummyText', { locale: displayLang })}</Text>
            </View>
        </>
    );
}

const styles = (insets) => StyleSheet.create({
    SafeAreaFlex: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right
    }
})
