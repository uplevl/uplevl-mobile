import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import theme from "@/constants/theme";

export type PostTabType = "published" | "draft" | "archived";

export interface PostTabsProps {
  activeTab: PostTabType;
  onTabChange: (tab: PostTabType) => void;
  postCounts?: {
    published: number;
    draft: number;
    archived: number;
  };
}

const tabs: { key: PostTabType; label: string }[] = [
  { key: "draft", label: "Draft" },
  { key: "published", label: "Published" },
  { key: "archived", label: "Archived" },
];

// Helper function to determine default active tab
export function getDefaultActiveTab(postCounts?: { published: number; draft: number; archived: number }): PostTabType {
  // If there are draft posts, default to Draft tab
  if (postCounts?.draft && postCounts.draft > 0) {
    return "draft";
  }
  // Otherwise, default to Published tab
  return "published";
}

export default function PostTabs({ activeTab, onTabChange, postCounts }: PostTabsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.tabsWrapper}>
        {tabs.map((tab) => {
          const count = postCounts?.[tab.key] ?? 0;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, activeTab === tab.key && styles.activeTab]}
              onPress={() => onTabChange(tab.key)}
              activeOpacity={0.8}
            >
              <View style={styles.tabContent}>
                <Text style={[styles.tabText, activeTab === tab.key && styles.activeTabText]}>{tab.label}</Text>
                {count > 0 && (
                  <View style={[styles.badge, activeTab === tab.key && styles.activeBadge]}>
                    <Text style={[styles.badgeText, activeTab === tab.key && styles.activeBadgeText]}>{count}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 8,
    backgroundColor: theme.colors.background,
  },
  tabsWrapper: {
    flexDirection: "row",
    backgroundColor: theme.colors.muted,
    borderRadius: 10,
    padding: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: theme.colors.card,
    shadowColor: theme.colors.neutral800,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontFamily: "Geist",
    color: theme.colors.mutedForeground,
    textAlign: "center",
  },
  activeTabText: {
    color: theme.colors.text,
    fontFamily: "Geist-SemiBold",
  },
  tabContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  badge: {
    backgroundColor: theme.colors.mutedForeground,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  activeBadge: {
    backgroundColor: theme.colors.primary,
  },
  badgeText: {
    fontSize: 11,
    fontFamily: "Geist-SemiBold",
    color: theme.colors.background,
  },
  activeBadgeText: {
    color: theme.colors.background,
  },
});
