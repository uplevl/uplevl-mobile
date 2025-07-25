/**
 * Shared style constants and patterns
 */
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

import theme from "@/constants/theme";

// Common card shadow
export const cardShadow: ViewStyle = {
  shadowColor: theme.colors.neutral800,
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 2,
};

// Common button base style
export const buttonBase: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: theme.borderRadius.sm + 2,
  borderWidth: 1,
  borderColor: theme.colors.transparent,
};

// Common text styles
export const textStyles = StyleSheet.create({
  body: {
    fontSize: theme.fontSize.md,
    fontFamily: theme.fontFamily.regular,
    color: theme.colors.text,
  } as TextStyle,

  caption: {
    fontSize: theme.fontSize.sm,
    fontFamily: theme.fontFamily.regular,
    color: theme.colors.mutedForeground,
  } as TextStyle,

  title: {
    fontSize: theme.fontSize.lg,
    fontFamily: theme.fontFamily.semiBold,
    color: theme.colors.text,
  } as TextStyle,
});

// Common container styles
export const containerStyles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    padding: 16,
    ...cardShadow,
  } as ViewStyle,

  screenPadding: {
    paddingHorizontal: 16,
  } as ViewStyle,

  centeredContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  } as ViewStyle,
});
