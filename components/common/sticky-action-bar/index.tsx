import { BlurView } from "expo-blur";
import { StyleSheet, View } from "react-native";

export interface StickyActionBarProps {
  children: React.ReactNode;
}

export default function StickyActionBar({ children }: StickyActionBarProps) {
  return (
    <View style={styles.container}>
      <BlurView intensity={15} style={styles.blurView}>
        <View style={styles.content}>{children}</View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  blurView: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(235, 235, 235, 0.3)", // Semi-transparent border
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Fallback background
  },
  content: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
});
