import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

import theme from "@/constants/theme";

export interface EngagementMetricProps {
  icon: React.ComponentType<{ size?: number; color?: string }>;
  count: number;
  label: string;
  iconColor?: string;
  variant?: "horizontal" | "vertical";
}

function EngagementMetricComponent({
  icon: Icon,
  count,
  label,
  iconColor = theme.colors.mutedForeground,
  variant = "vertical",
}: EngagementMetricProps) {
  const isHorizontal = variant === "horizontal";

  return (
    <View style={[styles.container, isHorizontal && styles.horizontalContainer]}>
      <View style={[styles.iconContainer, isHorizontal && styles.horizontalIconContainer]}>
        <Icon size={20} color={iconColor} />
        <Text style={styles.count}>{count.toLocaleString()}</Text>
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

export default memo(EngagementMetricComponent);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  horizontalContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  horizontalIconContainer: {
    marginBottom: 0,
  },
  count: {
    fontSize: 20,
    fontFamily: "Geist-SemiBold",
    color: theme.colors.text,
  },
  label: {
    fontSize: 12,
    fontFamily: "Geist",
    color: theme.colors.mutedForeground,
  },
});
