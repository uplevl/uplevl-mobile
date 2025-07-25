import { Plus } from "lucide-react-native";
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

import theme from "@/constants/theme";

export interface FloatingActionButtonProps {
  onPress: () => void;
  size?: number;
  bottom?: number;
  right?: number;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function FloatingActionButton({
  onPress,
  size = 56,
  bottom = 90, // Above tab bar
  right = 20,
}: FloatingActionButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  function handlePressIn() {
    scale.value = withSpring(0.9, { damping: 15, stiffness: 300 });
  }

  function handlePressOut() {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  }

  function handlePress() {
    onPress();
  }

  return (
    <AnimatedTouchableOpacity
      style={[
        styles.fab,
        animatedStyle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          bottom,
          right,
        },
      ]}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1} // We handle opacity with scale animation
    >
      <Plus size={24} color={theme.colors.white} strokeWidth={2} />
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: theme.colors.neutral800,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1000,
  },
});
