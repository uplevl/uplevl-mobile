import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

import theme from "@/constants/theme";

export interface SocialPlatformBadgeProps {
  platform: "instagram" | "facebook" | "twitter" | "linkedin";
  followerCount?: number; // Make optional since we're not displaying it prominently
  hideLabel?: boolean; // New prop to hide the platform label
}

export default function SocialPlatformBadge({ platform, followerCount, hideLabel = false }: SocialPlatformBadgeProps) {
  const platformConfig = {
    instagram: {
      color: "#E4405F",
      name: "Instagram",
      icon: Instagram,
    },
    facebook: {
      color: "#1877F2",
      name: "Facebook",
      icon: Facebook,
    },
    twitter: {
      color: "#1DA1F2",
      name: "Twitter",
      icon: Twitter,
    },
    linkedin: {
      color: "#0077B5",
      name: "LinkedIn",
      icon: Linkedin,
    },
  };

  const config = platformConfig[platform];
  const IconComponent = config.icon;

  // Adjust sizes based on whether label is hidden
  const iconSize = hideLabel ? 20 : 16;
  const badgeSize = hideLabel ? 32 : 28;
  const badgeRadius = badgeSize / 2;

  return (
    <View style={[styles.container, hideLabel && styles.containerNoLabel]}>
      {/* Icon badge */}
      <View
        style={[
          styles.iconBadge,
          {
            backgroundColor: config.color,
            width: badgeSize,
            height: badgeSize,
            borderRadius: badgeRadius,
          },
        ]}
      >
        <IconComponent size={iconSize} color="#FFFFFF" />
      </View>

      {/* Platform name - conditionally rendered */}
      {!hideLabel && <Text style={styles.platformName}>{config.name}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  containerNoLabel: {
    gap: 0,
  },
  iconBadge: {
    alignItems: "center",
    justifyContent: "center",
    ...theme.shadows.sm,
  },
  platformName: {
    fontSize: 14,
    fontFamily: "Geist-SemiBold",
    color: theme.colors.text,
  },
});
