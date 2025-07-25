import { AlertCircle, Check, Trash2 } from "lucide-react-native";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import theme from "@/constants/theme";

import SocialPlatformBadge from "@/components/business/social-platform-badge";
import { Button } from "@/components/common/button";

import { containerStyles } from "@/lib/constants/styles";
import { formatRelativeDate } from "@/lib/helpers/date";

export interface Integration {
  id: string;
  name: string;
  title: string;
  description: string;
  isConnected: boolean;
  connectedAt: string | null;
  followerCount: number | null;
  accountUsername: string | null;
  platform: "instagram" | "facebook";
}

interface IntegrationCardProps {
  integration: Integration;
  onConnect?: (integration: Integration) => void;
  onDisconnect?: (integration: Integration) => void;
}

export default function IntegrationCard({ integration, onConnect, onDisconnect }: IntegrationCardProps) {
  function handleConnect() {
    console.log("Connecting to", integration.title);
    onConnect?.(integration);
  }

  function handleDisconnect() {
    Alert.alert(
      "Disconnect Account",
      `Are you sure you want to disconnect from ${integration.title}? This will remove Uplevl from your account and it will no longer pamper your audience.`,
      [
        {
          text: "No, keep it",
          style: "cancel",
        },
        {
          text: "Yes, disconnect",
          style: "destructive",
          onPress: () => {
            console.log("Disconnecting from", integration.title);
            onDisconnect?.(integration);
          },
        },
      ],
    );
  }

  const getStatusIcon = () => {
    if (integration.isConnected) {
      return <Check size={16} color={theme.colors.success} />;
    }
    return <AlertCircle size={16} color={theme.colors.mutedForeground} />;
  };

  const getStatusText = () => {
    if (integration.isConnected) {
      return `Connected ${integration.connectedAt ? formatRelativeDate(integration.connectedAt) : ""}`;
    }
    return "Not connected";
  };

  const getStatusColor = () => {
    return integration.isConnected ? theme.colors.success : theme.colors.mutedForeground;
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <SocialPlatformBadge
            platform={integration.platform}
            followerCount={integration.followerCount ?? undefined}
            hideLabel={true}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{integration.title}</Text>
            <View style={styles.statusContainer}>
              {getStatusIcon()}
              <Text style={[styles.statusText, { color: getStatusColor() }]}>{getStatusText()}</Text>
            </View>
            {integration.isConnected && integration.accountUsername && (
              <Text style={styles.accountText}>{integration.accountUsername}</Text>
            )}
          </View>
        </View>
      </View>

      <Text style={styles.description}>{integration.description}</Text>

      <View style={styles.actions}>
        <Button
          variant={integration.isConnected ? "outline" : "default"}
          onPress={handleConnect}
          disabled={integration.isConnected}
          style={styles.actionButton}
        >
          {integration.isConnected ? "Connected" : "Connect"}
        </Button>

        {integration.isConnected && (
          <TouchableOpacity onPress={handleDisconnect} style={styles.disconnectButton}>
            <Trash2 size={16} color={theme.colors.destructive} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    ...containerStyles.card,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    flex: 1,
  },
  titleContainer: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 18,
    fontFamily: "Geist-SemiBold",
    color: theme.colors.text,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusText: {
    fontSize: 12,
    fontFamily: "Geist",
  },
  accountText: {
    fontSize: 12,
    fontFamily: "Geist",
    color: theme.colors.mutedForeground,
  },
  description: {
    fontSize: 14,
    fontFamily: "Geist",
    color: theme.colors.mutedForeground,
    lineHeight: 20,
    marginBottom: 16,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
  disconnectButton: {
    padding: 8,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.destructive + "10",
    borderWidth: 1,
    borderColor: theme.colors.destructive + "20",
  },
});
