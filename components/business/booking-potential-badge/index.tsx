import { PhoneIcon } from "lucide-react-native";
import { StyleSheet, View } from "react-native";

import theme from "@/constants/theme";

export interface BookingPotentialBadgeProps {
  size?: "sm" | "md";
}

export default function BookingPotentialBadge({ size = "sm" }: BookingPotentialBadgeProps) {
  const isSmall = size === "sm";

  return (
    <View style={[styles.badge, isSmall ? styles.badgeSmall : styles.badgeMedium]}>
      <PhoneIcon size={isSmall ? 16 : 20} color={theme.colors.white} />
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 12,
    backgroundColor: theme.colors.success,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeSmall: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeMedium: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
});
