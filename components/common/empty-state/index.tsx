import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

import theme from "@/constants/theme";

import { containerStyles, textStyles } from "@/lib/constants/styles";

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ComponentType<{ size?: number; color?: string }>;
}

function EmptyStateComponent({ title, description, icon: Icon }: EmptyStateProps) {
  return (
    <View style={styles.emptyState}>
      {Icon && (
        <View style={styles.iconContainer}>
          <Icon size={48} color={theme.colors.mutedForeground} />
        </View>
      )}
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyDescription}>{description}</Text>
    </View>
  );
}

export default memo(EmptyStateComponent);

const styles = StyleSheet.create({
  emptyState: {
    ...containerStyles.centeredContent,
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  iconContainer: {
    marginBottom: 16,
    opacity: 0.6,
  },
  emptyTitle: {
    ...textStyles.title,
    marginBottom: 6,
    textAlign: "center",
  },
  emptyDescription: {
    ...textStyles.caption,
    textAlign: "center",
    lineHeight: 20,
  },
});
