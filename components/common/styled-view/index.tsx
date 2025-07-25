import { StyleSheet, View, ViewProps } from "react-native";

import theme from "@/constants/theme";

export default function StyledView({ children, ...props }: ViewProps) {
  return (
    <View {...props} style={[styles.container, props.style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
