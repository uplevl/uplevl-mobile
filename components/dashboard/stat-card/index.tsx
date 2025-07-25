import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

import theme from "@/constants/theme";

export interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ComponentType<{ size?: number; color?: string }>;
}

function StatCardComponent({ title, value, icon: Icon }: StatCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          {Icon && <Icon size={20} color={theme.colors.primary} />}
        </View>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

export default memo(StatCardComponent);

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.neutral800,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    width: "48%", // For 2-column grid
    minHeight: 90,
  },
  content: {
    gap: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 12,
    color: theme.colors.mutedForeground,
    fontFamily: "Geist",
    flex: 1,
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.text,
    fontFamily: "Geist-SemiBold",
  },
});
