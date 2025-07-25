import { Stack } from "expo-router";
import { StyleSheet, Text } from "react-native";

import theme from "@/constants/theme";

import { PostsProvider } from "@/contexts/posts-context";

export default function PostsLayout() {
  return (
    <PostsProvider>
      <Stack
        screenOptions={{
          headerTitle: ({ children }) => <Text style={styles.headerTitle}>{children}</Text>,
        }}
      >
        <Stack.Screen
          name="list"
          options={{
            headerBlurEffect: "regular",
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="[id]"
          options={{
            headerTitle: "",
            headerBlurEffect: "regular",
            headerTransparent: true,
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="add-post"
          options={{
            headerTitle: "Add Post",
            headerBlurEffect: "regular",
            headerTransparent: true,
            presentation: "modal",
          }}
        />
      </Stack>
    </PostsProvider>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: "Geist-SemiBold",
    fontSize: 16,
    color: theme.colors.text,
  },
  filterButton: {
    padding: 8,
    marginRight: 8,
  },
});
