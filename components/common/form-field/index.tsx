import { memo } from "react";
import { StyleSheet, Text, TextInputProps, View } from "react-native";

import theme from "@/constants/theme";

import { Input } from "@/components/common/input";

export interface FormFieldProps extends TextInputProps {
  label: string;
  error?: string;
  required?: boolean;
}

function FormFieldComponent({ label, error, required, style, ...inputProps }: FormFieldProps) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>
        {label}
        {required && " *"}
      </Text>
      <Input {...inputProps} variant={error ? "error" : "default"} style={style} />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

export default memo(FormFieldComponent);

const styles = StyleSheet.create({
  fieldGroup: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontFamily: "Geist-SemiBold",
    color: theme.colors.text,
    marginBottom: 6,
  },
  errorText: {
    fontSize: 12,
    fontFamily: "Geist",
    color: theme.colors.destructive,
    marginTop: 4,
    marginLeft: 4,
  },
});
