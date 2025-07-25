import { Tabs } from "expo-router";
import { BotIcon, ChartBarIcon, FileTextIcon, WebhookIcon } from "lucide-react-native";

import theme from "@/constants/theme";

export default function AppRoutesLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: theme.colors.mutedForeground,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarLabelStyle: { fontFamily: "Geist" },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="posts"
        options={{
          title: "Posts",
          tabBarIcon: ({ color }) => <FileTextIcon color={color} size={20} />,
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: "Stats",
          tabBarIcon: ({ color }) => <ChartBarIcon color={color} size={20} />,
        }}
      />
      <Tabs.Screen
        name="integrations"
        options={{
          title: "Integrations",
          tabBarIcon: ({ color }) => <WebhookIcon color={color} size={20} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <BotIcon color={color} size={20} />,
        }}
      />
    </Tabs>
  );
}
