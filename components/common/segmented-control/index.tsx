import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";

import theme from "@/constants/theme";

export interface SegmentedControlOption {
  label: string;
  value: string;
}

interface SegmentedControlProps {
  options: SegmentedControlOption[];
  selectedOption: string;
  onOptionPress: (option: string) => void;
}

function SegmentedControl({ options, selectedOption, onOptionPress }: SegmentedControlProps) {
  const internalPadding = 6;
  const segmentedControlWidth = 180;

  const itemWidth = (segmentedControlWidth - internalPadding) / options.length;

  const rStyle = useAnimatedStyle(() => {
    return {
      left: withTiming(
        itemWidth * options.findIndex((option) => option.value === selectedOption) + internalPadding / 2,
      ),
    };
  }, [selectedOption, options, itemWidth]);

  return (
    <View
      style={[
        styles.container,
        {
          width: segmentedControlWidth,
          borderRadius: 7,
          paddingLeft: internalPadding / 2,
        },
      ]}
    >
      <Animated.View
        style={[
          {
            width: itemWidth,
          },
          rStyle,
          styles.activeBox,
        ]}
      />
      {options.map((option) => {
        return (
          <TouchableOpacity
            onPress={() => onOptionPress(option.value)}
            key={option.value}
            style={[
              {
                width: itemWidth,
              },
              styles.labelContainer,
            ]}
          >
            <Text style={styles.label}>{option.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: theme.colors.neutral200,
  },
  activeBox: {
    position: "absolute",
    borderRadius: 6,
    height: "80%",
    top: "10%",
    backgroundColor: theme.colors.card,
  },
  labelContainer: { justifyContent: "center", alignItems: "center", paddingVertical: 8 },
  label: {
    fontFamily: "Geist",
    fontSize: 14,
  },
});

export { SegmentedControl };
