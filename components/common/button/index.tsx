import { LinearGradient } from "expo-linear-gradient";
import { memo, useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";

import theme from "@/constants/theme";

import { buttonBase } from "@/lib/constants/styles";
import { BaseButtonProps, ButtonSize, ButtonVariant } from "@/lib/types/common";

// Extract style maps to constants to prevent recreation on each render
const variantStyles: Record<ButtonVariant, ViewStyle> = {
  default: {
    borderColor: theme.colors.primary,
    shadowColor: theme.colors.neutral800,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  destructive: {
    backgroundColor: theme.colors.destructive,
    borderColor: theme.colors.destructive,
    shadowColor: theme.colors.neutral800,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  "destructive-outline": {
    backgroundColor: theme.colors.transparent,
    borderColor: theme.colors.destructive,
    borderWidth: 1,
  },
  outline: {
    backgroundColor: theme.colors.neutral50,
    borderColor: theme.colors.neutral200,
    borderWidth: 1,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.secondary,
    shadowColor: theme.colors.neutral800,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  ghost: {
    backgroundColor: theme.colors.transparent,
    borderColor: theme.colors.transparent,
  },
  link: {
    backgroundColor: theme.colors.transparent,
    borderColor: theme.colors.transparent,
  },
};

const pressedVariantStyles: Record<ButtonVariant, ViewStyle> = {
  default: {
    borderColor: theme.colors.primaryDark,
  },
  destructive: {
    backgroundColor: theme.colors.destructiveDark,
    borderColor: theme.colors.destructiveDark,
  },
  "destructive-outline": {
    backgroundColor: theme.colors.destructiveLight,
    borderColor: theme.colors.destructive,
  },
  outline: {
    backgroundColor: theme.colors.accent,
    borderColor: theme.colors.neutral200,
  },
  secondary: {
    backgroundColor: theme.colors.neutral200,
    borderColor: theme.colors.neutral200,
  },
  ghost: {
    backgroundColor: theme.colors.accent,
    borderColor: theme.colors.transparent,
  },
  link: {
    backgroundColor: theme.colors.transparent,
    borderColor: theme.colors.transparent,
  },
};

const variantTextStyles: Record<ButtonVariant, TextStyle> = {
  default: {
    color: theme.colors.text,
    fontFamily: theme.fontFamily.regular,
  },
  destructive: {
    color: theme.colors.white,
    fontFamily: theme.fontFamily.regular,
  },
  "destructive-outline": {
    color: theme.colors.destructive,
    fontFamily: theme.fontFamily.regular,
  },
  outline: {
    color: theme.colors.neutral800,
    fontFamily: theme.fontFamily.regular,
  },
  secondary: {
    color: theme.colors.secondaryForeground,
    fontFamily: theme.fontFamily.regular,
  },
  ghost: {
    color: theme.colors.neutral800,
    fontFamily: theme.fontFamily.regular,
  },
  link: {
    color: theme.colors.primary,
    fontFamily: theme.fontFamily.regular,
    textDecorationLine: "underline",
  },
};

const iconColors: Record<ButtonVariant, string> = {
  default: theme.colors.text,
  destructive: theme.colors.white,
  "destructive-outline": theme.colors.destructive,
  outline: theme.colors.accentForeground,
  secondary: theme.colors.secondaryForeground,
  ghost: theme.colors.neutral800,
  link: theme.colors.primaryDark,
};

const pressedVariantTextStyles: Record<ButtonVariant, TextStyle> = {
  default: {
    color: theme.colors.text,
    fontFamily: theme.fontFamily.regular,
  },
  destructive: {
    color: theme.colors.white,
    fontFamily: theme.fontFamily.regular,
  },
  "destructive-outline": {
    color: theme.colors.destructive,
    fontFamily: theme.fontFamily.regular,
  },
  outline: {
    color: theme.colors.accentForeground,
    fontFamily: theme.fontFamily.regular,
  },
  secondary: {
    color: theme.colors.secondaryForeground,
    fontFamily: theme.fontFamily.regular,
  },
  ghost: {
    color: theme.colors.accentForeground,
    fontFamily: theme.fontFamily.regular,
  },
  link: {
    color: theme.colors.primaryDark,
    fontFamily: theme.fontFamily.regular,
    textDecorationLine: "underline",
  },
};

const sizeStyles: Record<ButtonSize, ViewStyle> = {
  default: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm + 2, // 10px
  },
  sm: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
  },
  lg: {
    paddingHorizontal: theme.spacing.xxl,
    paddingVertical: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg + 2, // 14px
  },
  xl: {
    paddingHorizontal: 40,
    paddingVertical: theme.spacing.xl,
    borderRadius: theme.borderRadius.xl,
  },
  icon: {
    paddingHorizontal: theme.spacing.sm + 2, // 10px
    paddingVertical: theme.spacing.sm + 2, // 10px
  },
};

const sizeTextStyles: Record<ButtonSize, TextStyle> = {
  default: {
    fontSize: theme.fontSize.md,
    fontFamily: theme.fontFamily.semiBold,
  },
  sm: {
    fontSize: theme.fontSize.sm,
    fontFamily: theme.fontFamily.regular,
  },
  lg: {
    fontSize: theme.fontSize.md,
    fontFamily: theme.fontFamily.semiBold,
  },
  xl: {
    fontSize: theme.fontSize.md,
    fontFamily: theme.fontFamily.semiBold,
  },
  icon: {
    fontSize: theme.fontSize.sm,
    fontFamily: theme.fontFamily.regular,
  },
};

function ButtonComponent({
  children,
  icon: Icon,
  variant = "default",
  size = "default",
  disabled = false,
  onPress,
  style,
  textStyle,
}: BaseButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = useCallback(() => {
    setIsPressed(true);
  }, []);

  const handlePressOut = useCallback(() => {
    setIsPressed(false);
  }, []);

  const buttonStyle = useMemo(
    () => [
      buttonBase,
      variantStyles[variant],
      isPressed && pressedVariantStyles[variant],
      sizeStyles[size],
      disabled && styles.disabled,
      style,
    ],
    [variant, size, isPressed, disabled, style],
  );

  const textStyles = useMemo(
    () => [
      styles.baseText,
      variantTextStyles[variant],
      isPressed && pressedVariantTextStyles[variant],
      sizeTextStyles[size],
      disabled && styles.disabledText,
      textStyle,
    ],
    [variant, size, isPressed, disabled, textStyle],
  );

  const gradientColors = useMemo(() => {
    if (isPressed) {
      return [theme.colors.primary, theme.colors.primary] as const;
    }
    return [theme.colors.primaryLight, theme.colors.primary] as const;
  }, [isPressed]);

  // Use LinearGradient for default variant, TouchableOpacity for others
  if (variant === "default") {
    return (
      <LinearGradient colors={gradientColors} style={buttonStyle}>
        <TouchableOpacity
          style={[styles.baseButtonContent, styles.gradientButtonContent]}
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled}
          activeOpacity={1}
        >
          {Icon && <Icon size={16} />}
          <Text style={textStyles}>{children}</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  return (
    <TouchableOpacity
      style={[buttonStyle, styles.baseButtonContent]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      activeOpacity={1}
    >
      {Icon && <Icon size={16} color={iconColors[variant]} />}
      <Text style={textStyles}>{children}</Text>
    </TouchableOpacity>
  );
}

export const Button = memo(ButtonComponent);

const styles = StyleSheet.create({
  baseText: {
    fontSize: theme.fontSize.sm,
    fontFamily: theme.fontFamily.regular,
    textAlign: "center",
  } as TextStyle,

  baseButtonContent: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,

  gradientButtonContent: {
    flex: 1,
  } as ViewStyle,

  disabled: {
    opacity: 0.5,
  } as ViewStyle,

  disabledText: {
    opacity: 0.5,
  } as TextStyle,
});

export { BaseButtonProps as ButtonProps };
