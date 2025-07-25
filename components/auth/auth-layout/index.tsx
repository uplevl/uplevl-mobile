import { memo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import theme from "@/constants/theme";

export interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

function AuthLayoutComponent({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/icon.png")} style={styles.icon} />
      <View style={styles.header}>
        <Text style={styles.headline}>{title}</Text>
        <Text style={styles.subheading}>{subtitle}</Text>
      </View>
      {children}
    </View>
  );
}

export default memo(AuthLayoutComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 32,
    gap: 10,
  },
  icon: {
    width: 75,
    height: 75,
    alignSelf: "center",
    resizeMode: "contain",
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
  },
  headline: {
    fontSize: 24,
    fontFamily: "Geist-SemiBold",
    textAlign: "center",
    marginBottom: 6,
  },
  subheading: {
    fontSize: 14,
    fontFamily: "Geist",
    textAlign: "center",
    color: theme.colors.neutral600,
  },
});
