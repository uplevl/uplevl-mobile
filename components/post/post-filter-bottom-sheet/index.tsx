import { Check } from "lucide-react-native";
import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import theme from "@/constants/theme";

import { type PostTabType } from "@/components/post/posts-tabs";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const BOTTOM_SHEET_MAX_HEIGHT = SCREEN_HEIGHT * 0.4;

interface PostFilterBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  activeFilter: PostTabType;
  onFilterChange: (filter: PostTabType) => void;
  postCounts: {
    published: number;
    draft: number;
    archived: number;
  };
}

const filterOptions: { key: PostTabType; label: string; description: string }[] = [
  { key: "draft", label: "Draft", description: "Posts waiting for review" },
  { key: "published", label: "Published", description: "Live posts on your social media" },
  { key: "archived", label: "Archived", description: "Removed or outdated posts" },
];

export default function PostFilterBottomSheet({
  visible,
  onClose,
  activeFilter,
  onFilterChange,
  postCounts,
}: PostFilterBottomSheetProps) {
  const translateY = useRef(new Animated.Value(BOTTOM_SHEET_MAX_HEIGHT)).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return gestureState.dy > 5 && Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
    },
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dy > 0) {
        translateY.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > BOTTOM_SHEET_MAX_HEIGHT * 0.3 || gestureState.vy > 0.5) {
        closeBottomSheet();
      } else {
        openBottomSheet();
      }
    },
  });

  const openBottomSheet = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeBottomSheet = () => {
    Animated.timing(translateY, {
      toValue: BOTTOM_SHEET_MAX_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  useEffect(() => {
    if (visible) {
      openBottomSheet();
    } else {
      translateY.setValue(BOTTOM_SHEET_MAX_HEIGHT);
    }
  }, [visible]);

  const handleFilterSelect = (filter: PostTabType) => {
    onFilterChange(filter);
    closeBottomSheet();
  };

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={closeBottomSheet}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.bottomSheet,
                {
                  transform: [{ translateY }],
                },
              ]}
              {...panResponder.panHandlers}
            >
              {/* Handle bar */}
              <View style={styles.handle} />

              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.title}>Filter Posts</Text>
                <Text style={styles.subtitle}>Choose which posts to display</Text>
              </View>

              {/* Filter options */}
              <View style={styles.optionsContainer}>
                {filterOptions.map((option) => {
                  const count = postCounts[option.key];
                  const isActive = activeFilter === option.key;

                  return (
                    <TouchableOpacity
                      key={option.key}
                      style={[styles.option, isActive && styles.activeOption]}
                      onPress={() => handleFilterSelect(option.key)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.optionContent}>
                        <View style={styles.optionText}>
                          <Text style={[styles.optionLabel, isActive && styles.activeOptionLabel]}>{option.label}</Text>
                          <Text style={[styles.optionDescription, isActive && styles.activeOptionDescription]}>
                            {option.description}
                          </Text>
                        </View>
                        <View style={styles.optionRight}>
                          {count > 0 && (
                            <View style={[styles.badge, isActive && styles.activeBadge]}>
                              <Text style={[styles.badgeText, isActive && styles.activeBadgeText]}>{count}</Text>
                            </View>
                          )}
                          {isActive && <Check size={20} color={theme.colors.primary} style={styles.checkIcon} />}
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: theme.colors.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: BOTTOM_SHEET_MAX_HEIGHT,
    paddingBottom: 20,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: theme.colors.border,
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    fontSize: 20,
    fontFamily: "Geist-SemiBold",
    color: theme.colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Geist",
    color: theme.colors.mutedForeground,
  },
  optionsContainer: {
    paddingTop: 8,
  },
  option: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  activeOption: {
    backgroundColor: theme.colors.muted,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionText: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    fontFamily: "Geist-SemiBold",
    color: theme.colors.text,
    marginBottom: 2,
  },
  activeOptionLabel: {
    color: theme.colors.primary,
  },
  optionDescription: {
    fontSize: 13,
    fontFamily: "Geist",
    color: theme.colors.mutedForeground,
  },
  activeOptionDescription: {
    color: theme.colors.primary,
  },
  optionRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  badge: {
    backgroundColor: theme.colors.mutedForeground,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  activeBadge: {
    backgroundColor: theme.colors.primary,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: "Geist-SemiBold",
    color: theme.colors.background,
  },
  activeBadgeText: {
    color: theme.colors.background,
  },
  checkIcon: {
    marginLeft: 4,
  },
});
