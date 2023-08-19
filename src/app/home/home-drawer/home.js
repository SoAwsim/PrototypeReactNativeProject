import { useNavigation } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Appbar, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocaleContext } from "../../../providers/LocaleProvider";
import i18n from "../../../localization/i18n";

export default function Home() {
  const insets = useSafeAreaInsets();
  const style = styles(insets);

  const { displayLang } = useLocaleContext();
  const navigation = useNavigation();

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
      </Appbar.Header>
      <View style={style.SafeAreaFlex}>
        <Text>
          {i18n.t("dummyHomeScreen.dummyText", { locale: displayLang })}
        </Text>
      </View>
    </>
  );
}

const styles = (insets) =>
  StyleSheet.create({
    SafeAreaFlex: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    },
  });
