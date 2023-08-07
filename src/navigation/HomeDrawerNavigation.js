import { createDrawerNavigator } from "@react-navigation/drawer";
import { Text, View, useWindowDimensions } from "react-native";
import DummyHome from "../screens/dummyhome/DummyHome";
import SettingsScreen from "../screens/settings/SettingsScreen";

const Drawer = createDrawerNavigator();

function HomeDrawerContent() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Drawer</Text>
        </View>
    )
}

export const HomeNavigator = () => {
    const windowsWidth = useWindowDimensions().width;

    return (
        <Drawer.Navigator 
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                swipeEdgeWidth: windowsWidth,
            }}
        >
            <Drawer.Screen
                name="Home"
                component={DummyHome}
            />
            <Drawer.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ swipeEnabled: false }}
            />
        </Drawer.Navigator>
    )
}
