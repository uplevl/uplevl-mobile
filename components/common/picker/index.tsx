import { StyleSheet } from "react-native";
import RNPickerSelect, { PickerSelectProps } from "react-native-picker-select";

import theme from "@/constants/theme";

interface PickerProps extends Omit<PickerSelectProps, "style"> {
  variant?: "default" | "error";
}

export function Picker({ variant = "default", ...props }: PickerProps) {
  const inputStyle = {
    ...styles.input,
    ...(variant === "error" && styles.inputError),
  };

  return (
    <RNPickerSelect
      useNativeAndroidPickerStyle={false}
      style={{
        inputIOSContainer: {
          pointerEvents: "none" as const,
        },
        inputIOS: inputStyle,
        inputAndroid: inputStyle,
        placeholder: {
          color: theme.colors.inputPlaceholder,
          fontSize: theme.fontSize.md,
          fontFamily: theme.fontFamily.regular,
        },
        iconContainer: {
          top: 12,
          right: theme.spacing.md,
        },
      }}
      {...props}
    />
  );
}

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
    fontSize: theme.fontSize.md,
    fontFamily: theme.fontFamily.regular,
    color: theme.colors.text,
    ...theme.shadows.sm,
    paddingRight: 40, // Space for dropdown arrow
  },
  inputError: {
    borderColor: theme.colors.inputError,
    borderWidth: 1,
  },
});
