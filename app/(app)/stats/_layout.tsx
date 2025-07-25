import { Stack } from "expo-router";

export default function DashboardLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Dashboard",
          headerBlurEffect: "regular",
          headerTransparent: true,
          headerLargeTitle: true,
        }}
      />
    </Stack>
  );
}
