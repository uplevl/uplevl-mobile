import { forwardRef, memo } from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

import theme from "@/constants/theme";

import { textStyles } from "@/lib/constants/styles";

interface InputProps extends TextInputProps {
  variant?: "default" | "error";
}

const InputComponent = forwardRef<TextInput, InputProps>(({ style, variant = "default", ...props }, ref) => {
  return (
    <TextInput
      ref={ref}
      style={[styles.input, variant === "error" && styles.inputError, style]}
      placeholderTextColor={theme.colors.inputPlaceholder}
      selectionColor={theme.colors.primary}
      {...props}
    />
  );
});

InputComponent.displayName = "Input";

export const Input = memo(InputComponent);

const styles = StyleSheet.create({
  input: {
    width: "100%",
    minWidth: 0,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
    backgroundColor: theme.colors.inputBackground,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm + 2, // 10px
    ...textStyles.body,
    ...theme.shadows.sm,
  },
  inputError: {
    borderColor: theme.colors.inputError,
    borderWidth: 1,
  },
});
