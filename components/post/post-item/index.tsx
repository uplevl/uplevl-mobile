import { CheckIcon, PencilIcon, XIcon } from "lucide-react-native";
import { memo, useCallback, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";

import theme from "@/constants/theme";

import BookingPotentialBadge from "@/components/business/booking-potential-badge";
import SocialPlatformBadge from "@/components/business/social-platform-badge";
import { Button } from "@/components/common/button";
import ImageCarousel from "@/components/common/image-carousel";
import StatusBadge from "@/components/common/status-badge";
import PostContentLoader from "@/components/post/post-content-loader";

import type { Post } from "@/contexts/posts-context";
import { containerStyles } from "@/lib/constants/styles";
import { formatRelativeDate } from "@/lib/helpers/date";
import { processTextForDisplay } from "@/lib/helpers/text";

export interface PostItemProps {
  post: Post;
  hasBookingPotential?: boolean;
  onPress?: (post: Post) => void;
  onApprove?: (postId: string) => void;
  onEdit?: (postId: string) => void;
  onReject?: (postId: string) => void;
}

const statusBadgeMap = {
  draft: { label: "Draft", variant: "draft" as const },
  scheduled: { label: "Scheduled", variant: "scheduled" as const },
  published: { label: "Published", variant: "published" as const },
  archived: { label: "Archived", variant: "archived" as const },
} as const;

const CHARACTER_LIMIT = 125;

interface PostTextProps {
  content: string;
  hashtags: string | null | undefined;
  isExpanded: boolean;
  onToggleExpanded: () => void;
}

function PostText({ content, hashtags, isExpanded, onToggleExpanded }: PostTextProps) {
  const textData = processTextForDisplay(content, hashtags, CHARACTER_LIMIT, isExpanded);

  if (isExpanded || !textData.shouldShowMore) {
    // Show full text, with hashtags in light blue
    return (
      <Text style={styles.postText}>
        <Text>{textData.content}</Text>
        {textData.hashtags && <Text style={styles.hashtagText}> {textData.hashtags}</Text>}
        {textData.shouldShowMore && (
          <Text onPress={onToggleExpanded} style={styles.moreButton}>
            {" "}
            less
          </Text>
        )}
      </Text>
    );
  }

  // Show truncated text with "more" button
  return (
    <Text style={styles.postText}>
      <Text>{textData.content}</Text>
      {textData.hashtags && <Text style={styles.hashtagText}> {textData.hashtags}</Text>}
      <Text onPress={onToggleExpanded} style={styles.moreButton}>
        ... more
      </Text>
    </Text>
  );
}

const PostTextMemo = memo(PostText);

function PostItemComponent({ post, hasBookingPotential, onPress, onApprove, onEdit, onReject }: PostItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const isDraft = post.status === "draft";

  const handlePress = useCallback(() => {
    if (onPress) {
      onPress(post);
    }
  }, [onPress, post]);

  const handleToggleExpanded = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  const handleApprove = useCallback(() => {
    if (onApprove) {
      onApprove(post.id);
    }
  }, [onApprove, post.id]);

  const handleEdit = useCallback(() => {
    if (onEdit) {
      onEdit(post.id);
    }
  }, [onEdit, post.id]);

  const handleReject = useCallback(() => {
    if (onReject) {
      onReject(post.id);
    }
  }, [onReject, post.id]);

  const dateText =
    post.status === "published" && post.scheduledAt
      ? `Published ${formatRelativeDate(post.scheduledAt)}`
      : `Created ${formatRelativeDate(post.createdAt)}`;

  const hasEngagement =
    (post.status === "published" || post.status === "archived") &&
    (post.likes !== undefined || post.comments !== undefined);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchableContent}
        onPress={handlePress}
        activeOpacity={0.95}
        disabled={isDraft} // Disable main press for drafts since we have action buttons
      >
        {/* Header with platform and status */}
        <View style={styles.header}>
          <SocialPlatformBadge platform="instagram" followerCount={1250} />
          <View style={styles.headerBadges}>
            <StatusBadge label={statusBadgeMap[post.status].label} variant={statusBadgeMap[post.status].variant} />
            {hasBookingPotential && <BookingPotentialBadge />}
          </View>
        </View>

        {/* Main content */}
        <View style={styles.content}>
          {post.images && post.images.length > 0 ? (
            <ImageCarousel images={post.images} />
          ) : post.imageUrl ? (
            <Animated.Image
              sharedTransitionTag={`post-image-${post.id}`}
              source={{ uri: post.imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : null}

          <View style={styles.textContent}>
            <View style={styles.postTextContainer}>
              {post.isGenerating ? (
                <PostContentLoader />
              ) : (
                <PostTextMemo
                  content={post.content}
                  hashtags={post.hashtags}
                  isExpanded={isExpanded}
                  onToggleExpanded={handleToggleExpanded}
                />
              )}
            </View>

            <View style={styles.metaRow}>
              <Text style={styles.dateText}>{dateText}</Text>

              {/* Show engagement metrics for published and archived posts */}
              {hasEngagement && (
                <View style={styles.engagementRow}>
                  {post.likes !== undefined && (
                    <View style={styles.engagementItem}>
                      <Text style={styles.engagementIcon}>❤️</Text>
                      <Text style={styles.engagementText}>{post.likes.toLocaleString()}</Text>
                    </View>
                  )}
                  {post.comments !== undefined && (
                    <View style={styles.engagementItem}>
                      <Text style={styles.engagementIcon}>💬</Text>
                      <Text style={styles.engagementText}>{post.comments.toLocaleString()}</Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* Action buttons for draft posts */}
      {isDraft && (
        <View style={styles.actionBar}>
          <Button variant="default" size="sm" style={styles.actionButton} onPress={handleApprove} icon={CheckIcon}>
            Approve
          </Button>
          <Button variant="outline" size="sm" style={styles.actionButton} onPress={handleEdit} icon={PencilIcon}>
            Edit
          </Button>
          <Button
            variant="destructive-outline"
            size="sm"
            style={styles.actionButton}
            onPress={handleReject}
            icon={XIcon}
          >
            Reject
          </Button>
        </View>
      )}
    </View>
  );
}

export default memo(PostItemComponent);

const styles = StyleSheet.create({
  container: {
    ...containerStyles.card,
    padding: 0,
    margin: 8,
    marginHorizontal: 16,
  },
  touchableContent: {
    // No additional styles needed, inherits container shape
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    paddingBottom: 8,
  },
  headerBadges: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  content: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 12,
  },
  textContent: {
    gap: 6,
  },
  postTextContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  postText: {
    fontSize: 14,
    fontFamily: "Geist",
    color: theme.colors.text,
    lineHeight: 20,
    flexShrink: 1,
  },
  hashtagText: {
    fontSize: 14,
    fontFamily: "Geist",
    color: "#4a9eff", // Light blue color for hashtags
    lineHeight: 20,
  },
  moreButton: {
    fontSize: 14,
    fontFamily: "Geist",
    color: theme.colors.mutedForeground,
  },
  dateText: {
    fontSize: 12,
    fontFamily: "Geist",
    color: theme.colors.mutedForeground,
    marginTop: 4,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  engagementRow: {
    flexDirection: "row",
    gap: 12,
  },
  engagementItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  engagementIcon: {
    fontSize: 12,
  },
  engagementText: {
    fontSize: 12,
    fontFamily: "Geist",
    color: theme.colors.mutedForeground,
  },
  actionBar: {
    flexDirection: "row",
    gap: 8,
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  actionButton: {
    flex: 1,
  },
});
