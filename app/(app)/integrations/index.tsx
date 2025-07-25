import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

import integrationsData from "@/assets/mocks/integrations.json";

import theme from "@/constants/theme";

import IntegrationCard, { type Integration } from "@/components/business/integration-card";

export default function IntegrationsScreen() {
  const integrations: Integration[] = integrationsData as Integration[];

  function handleConnect(integration: Integration) {
    // Simulate connection logic
    Alert.alert("Connect Account", `Opening ${integration.title} authentication...`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Continue",
        onPress: () => {
          console.log(`Connecting to ${integration.title}...`);
          // In a real app, this would open OAuth flow
          Alert.alert("Success", `Successfully connected to ${integration.title}!`);
        },
      },
    ]);
  }

  function handleDisconnect(integration: Integration) {
    // Simulate disconnection logic
    Alert.alert("Success", `Successfully disconnected from ${integration.title}!`);
  }

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Social Media Accounts</Text>
        <Text style={styles.sectionDescription}>
          Connect the social media accounts you want to use with your AI agent. This will give Uplevl access to your
          account to post and interact with your audience.
        </Text>
      </View>

      <View style={styles.integrationsContainer}>
        {integrations.map((integration) => (
          <IntegrationCard
            key={integration.id}
            integration={integration}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Geist-SemiBold",
    color: theme.colors.text,
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    fontFamily: "Geist",
    color: theme.colors.mutedForeground,
    lineHeight: 20,
  },
  integrationsContainer: {
    gap: 0, // Gap is handled by marginBottom in card styles
  },
});
