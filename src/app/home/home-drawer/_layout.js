import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useWindowDimensions, View } from "react-native";
import { Drawer as DrawerPaper } from "react-native-paper";
import { useAuthContext } from "../../../providers/AuthProvider";
import { useLocaleContext } from "../../../providers/LocaleProvider";
import i18n from "../../../localization/i18n";

function HomeDrawerContent(props) {
  const { signOut } = useAuthContext();
  const { displayLang } = useLocaleContext();
  const router = useRouter();

  return (
    <DrawerContentScrollView {...props}>
      <View style={{ flex: 1 }}>
        <DrawerPaper.Section>
          <DrawerPaper.Item
            label={i18n.t("dummyHomeScreen.homeDrawer.settings", {
              locale: displayLang,
            })}
            icon="cog-outline"
            onPress={() => {
              props.navigation.closeDrawer();
              router.push("/home/settings");
            }}
          />
        </DrawerPaper.Section>
        <DrawerPaper.Section>
          <DrawerPaper.Item
            label={i18n.t("dummyHomeScreen.homeDrawer.signOut", {
              locale: displayLang,
            })}
            icon="logout"
            active={false}
            onPress={() => signOut()}
          />
        </DrawerPaper.Section>
      </View>
    </DrawerContentScrollView>
  );
}

export default function HomeDrawer() {
  const windowsWidth = useWindowDimensions().width;

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        swipeEdgeWidth: windowsWidth,
      }}
      drawerContent={(props) => <HomeDrawerContent {...props} />}
    >
      <Drawer.Screen name="home" />
    </Drawer>
  );
}
