import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import { useContext } from "react";
import { View, useWindowDimensions } from "react-native";
import { Drawer } from "react-native-paper";
import DummyHome from "../screens/dummyhome/DummyHome";
import SettingsScreen from "../screens/settings/SettingsScreen";
import { AuthContext } from "../context/AuthContext";

const DrawerNavigation = createDrawerNavigator();

function HomeDrawerContent(props) {
    const state = props.navigation.getState();
    const drawerIcons = [
        {focus: 'home', unfocus: 'home-outline'},
        {focus: 'cog', unfocus: 'cog-outline'}
    ]

    const { signOut } = useContext(AuthContext);

    return (
        <DrawerContentScrollView {...props}>
            <View style={{ flex: 1 }}>
                <Drawer.Section>
                    {state.routes.map((route, i) => {
                        const focused = i === state.index;

                        return (
                            <Drawer.Item
                                key={route.key}
                                label={route.name}
                                icon={focused ? drawerIcons[i].focus : drawerIcons[i].unfocus}
                                active={focused}
                                onPress={() => props.navigation.navigate(route.name)}
                            />
                        )
                    })}
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

export const HomeNavigator = () => {
    const windowsWidth = useWindowDimensions().width;

    return (
        <DrawerNavigation.Navigator 
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                swipeEdgeWidth: windowsWidth,
            }}
            drawerContent={HomeDrawerContent}
        >
            <DrawerNavigation.Screen
                name="Home"
                component={DummyHome}
            />
            <DrawerNavigation.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ swipeEnabled: false }}
            />
        </DrawerNavigation.Navigator>
    )
}
