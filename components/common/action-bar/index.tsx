import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import theme from "@/constants/theme";

export interface ActionBarProps {
  children: React.ReactNode;
  variant?: "floating" | "attached";
}

function ActionBarComponent({ children, variant = "floating" }: ActionBarProps) {
  const insets = useSafeAreaInsets();

  const containerStyles = variant === "floating" ? styles.floatingContainer : styles.attachedContainer;

  return (
    <View style={[containerStyles, { paddingBottom: insets.bottom + 12 }]}>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

export default memo(ActionBarComponent);

const styles = StyleSheet.create({
  floatingContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    shadowColor: theme.colors.neutral800,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 100,
  },
  attachedContainer: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  content: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
});
