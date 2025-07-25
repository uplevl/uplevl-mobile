import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

import theme from "@/constants/theme";

export interface DetailRowProps {
  label: string;
  value: string;
  valueColor?: string;
  showDivider?: boolean;
}

function DetailRowComponent({ label, value, valueColor, showDivider = true }: DetailRowProps) {
  return (
    <>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={[styles.detailValue, valueColor && { color: valueColor }]}>{value}</Text>
      </View>
      {showDivider && <View style={styles.divider} />}
    </>
  );
}

export default memo(DetailRowComponent);

const styles = StyleSheet.create({
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: "Geist",
    color: theme.colors.mutedForeground,
  },
  detailValue: {
    fontSize: 14,
    fontFamily: "Geist-SemiBold",
    color: theme.colors.text,
    flex: 1,
    textAlign: "right",
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginHorizontal: -4,
  },
});
