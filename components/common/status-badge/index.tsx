import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

import theme from "@/constants/theme";

export interface StatusBadgeProps {
  label: string;
  variant?: "draft" | "scheduled" | "published" | "archived" | "success" | "warning" | "error";
  size?: "sm" | "md";
}

const variantStyles = {
  draft: { backgroundColor: theme.colors.mutedForeground },
  scheduled: { backgroundColor: theme.colors.chart1 },
  published: { backgroundColor: theme.colors.success },
  archived: { backgroundColor: theme.colors.mutedForeground },
  success: { backgroundColor: theme.colors.success },
  warning: { backgroundColor: theme.colors.chart1 },
  error: { backgroundColor: theme.colors.destructive },
};

function StatusBadgeComponent({ label, variant = "draft", size = "md" }: StatusBadgeProps) {
  const sizeStyles = size === "sm" ? styles.badgeSmall : styles.badge;
  const textSizeStyles = size === "sm" ? styles.textSmall : styles.text;

  return (
    <View style={[sizeStyles, variantStyles[variant]]}>
      <Text style={[textSizeStyles, styles.textColor]}>{label}</Text>
    </View>
  );
}

export default memo(StatusBadgeComponent);

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  badgeSmall: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  text: {
    fontSize: 12,
    fontFamily: "Geist-SemiBold",
  },
  textSmall: {
    fontSize: 11,
    fontFamily: "Geist-SemiBold",
  },
  textColor: {
    color: theme.colors.white,
  },
});
