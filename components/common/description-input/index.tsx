import { memo, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import theme from "@/constants/theme";

import { Input } from "@/components/common/input";

import { containerStyles } from "@/lib/constants/styles";

export interface DescriptionInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  maxLength?: number;
}

function DescriptionInputComponent({
  value,
  onChangeText,
  placeholder = "Describe your post...",
  maxLength = 500,
}: DescriptionInputProps) {
  const characterCount = value.length;

  const characterStatus = useMemo(() => {
    const isNearLimit = characterCount > maxLength * 0.8;
    const isAtLimit = characterCount >= maxLength;

    return {
      isNearLimit,
      isAtLimit,
      count: characterCount,
    };
  }, [characterCount, maxLength]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Description (Optional)</Text>
        <Text
          style={[
            styles.characterCount,
            characterStatus.isNearLimit && styles.characterCountWarning,
            characterStatus.isAtLimit && styles.characterCountError,
          ]}
        >
          {characterStatus.count}/{maxLength}
        </Text>
      </View>

      <Input
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        multiline
        numberOfLines={4}
        maxLength={maxLength}
        style={styles.textInput}
        textAlignVertical="top"
      />

      <Text style={styles.hint}>
        Adding a description helps our AI generate more personalized and engaging social media posts.
      </Text>
    </View>
  );
}

export default memo(DescriptionInputComponent);

const styles = StyleSheet.create({
  container: {
    ...containerStyles.card,
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontFamily: "Geist-SemiBold",
    color: theme.colors.text,
  },
  characterCount: {
    fontSize: 12,
    fontFamily: "Geist",
    color: theme.colors.mutedForeground,
  },
  characterCountWarning: {
    color: theme.colors.chart1, // Orange-ish color for warning
  },
  characterCountError: {
    color: theme.colors.destructive,
  },
  textInput: {
    minHeight: 100,
    paddingTop: 12,
  },
  hint: {
    fontSize: 12,
    fontFamily: "Geist",
    color: theme.colors.mutedForeground,
    marginTop: 8,
    lineHeight: 16,
  },
});
