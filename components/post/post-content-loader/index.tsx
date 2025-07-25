import ContentLoader, { Rect } from "react-content-loader/native";
import { StyleSheet, Text, View } from "react-native";

import theme from "@/constants/theme";

export default function PostContentLoader() {
  return (
    <View style={styles.container}>
      <Text style={styles.loadingText}>Generating your post...</Text>
      <ContentLoader
        speed={2}
        width="100%"
        height={80}
        viewBox="0 0 300 80"
        backgroundColor={theme.colors.neutral100}
        foregroundColor={theme.colors.neutral200}
        style={styles.loader}
      >
        {/* First line of content */}
        <Rect x="0" y="0" rx="4" ry="4" width="280" height="12" />
        {/* Second line of content */}
        <Rect x="0" y="20" rx="4" ry="4" width="240" height="12" />
        {/* Third line of content */}
        <Rect x="0" y="40" rx="4" ry="4" width="200" height="12" />
        {/* Hashtag simulation */}
        <Rect x="0" y="60" rx="4" ry="4" width="160" height="10" />
      </ContentLoader>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  loadingText: {
    fontSize: 12,
    fontFamily: "Geist",
    color: theme.colors.mutedForeground,
    marginBottom: 8,
    textAlign: "center",
  },
  loader: {
    width: "100%",
  },
});
