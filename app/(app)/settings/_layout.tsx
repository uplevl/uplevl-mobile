import { Stack } from "expo-router";

export default function PostDetailsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="settings"
        options={{
          headerTitle: "Settings",
          headerBlurEffect: "regular",
          headerTransparent: true,
          headerLargeTitle: true,
        }}
      />
      <Stack.Screen
        name="add-service"
        options={{
          headerTitle: "Add Service",
          headerBlurEffect: "regular",
          headerTransparent: true,
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
