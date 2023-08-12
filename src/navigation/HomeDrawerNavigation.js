import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import { useContext } from "react";
import { View, useWindowDimensions } from "react-native";
import { Drawer } from "react-native-paper";
import DummyHome from "../screens/dummyhome/DummyHome";
import SettingsScreen from "../screens/settings/SettingsScreen";
import { AuthContext } from "../context/AuthContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const DrawerNavigation = createDrawerNavigator();

function HomeDrawerContent(props) {
    /*const drawerState = props.navigation.getState();
    const drawerIcons = [
        {focus: 'home', unfocus: 'home-outline'}
    ];*/

    const { signOut } = useContext(AuthContext);

    return (
        <DrawerContentScrollView {...props}>
            <View style={{ flex: 1 }}>
                <Drawer.Section>
                    {/*drawerState.routes.map((route, i) => {
                        const focused = i === drawerState.index;

                        return (
                            <Drawer.Item
                                key={route.key}
                                label={route.name}
                                icon={focused ? drawerIcons[i].focus : drawerIcons[i].unfocus}
                                active={focused}
                                onPress={() => props.navigation.navigate(route.name)}
                            />
                        );
                    })*/}
                    <Drawer.Item
                        label="Settings"
                        icon="cog-outline"
                        onPress={() => {
                            props.navigation.closeDrawer();
                            props.stackNavigation.navigate('Settings');
                        }}
                    />
                </Drawer.Section>
                <Drawer.Section>
                    <Drawer.Item
                        label="Sign Out"
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
