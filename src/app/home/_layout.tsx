import { Stack, useRouter } from "expo-router";

export default function HomeStack() {
  const router = useRouter();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home-drawer" />
      <Stack.Screen name="settings" />
    </Stack>
  );
}
