import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { useWindowDimensions, View } from "react-native";
import { Drawer } from "react-native-paper";
import { AuthContext, LocaleContext } from "../context/AppContext";
import i18n from "../localization/i18n";
import DummyHome from "../screens/dummyhome/DummyHome";
import SettingsScreen from "../screens/settings/SettingsScreen";

const DrawerNavigation = createDrawerNavigator();

function HomeDrawerContent(props) {
    const { signOut } = useContext(AuthContext);
    const { displayLang } = useContext(LocaleContext);

    return (
        <DrawerContentScrollView {...props}>
            <View style={{ flex: 1 }}>
                <Drawer.Section>
                    <Drawer.Item
                        label={i18n.t('dummyHomeScreen.homeDrawer.settings', { locale: displayLang })}
                        icon="cog-outline"
                        onPress={() => {
                            props.navigation.closeDrawer();
                            props.stackNavigation.navigate('Settings');
                        }}
                    />
                </Drawer.Section>
                <Drawer.Section>
                    <Drawer.Item
                        label={i18n.t('dummyHomeScreen.homeDrawer.signOut', { locale: displayLang })}
                        icon='logout'
                        active={false}
                        onPress={() => signOut()}
                    />
                </Drawer.Section>
            </View>
        </DrawerContentScrollView>
    )
}

function HomeNavigator({ navigation }) {
    const windowsWidth = useWindowDimensions().width;

    return (
        <DrawerNavigation.Navigator 
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                swipeEdgeWidth: windowsWidth,
            }}
            drawerContent={(props) => <HomeDrawerContent {...props} stackNavigation={navigation} />}
        >
            <DrawerNavigation.Screen
                name="Home"
                component={DummyHome}
            />
        </DrawerNavigation.Navigator>
    )
}

const Stack = createNativeStackNavigator();
export default function HomeStack() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name="HomeStack"
                component={HomeNavigator}
            />
            <Stack.Screen
                name="Settings"
                component={SettingsScreen}
            />
        </Stack.Navigator>
    );
}
