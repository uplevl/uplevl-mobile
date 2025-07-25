import { useHeaderHeight } from "@react-navigation/elements";
import { Stack, useLocalSearchParams } from "expo-router";
import { Eye, Heart, MessageCircle } from "lucide-react-native";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";

import mockAICommentsData from "@/assets/mocks/ai-comments.json";
import mockPostsData from "@/assets/mocks/posts.json";

import theme from "@/constants/theme";

import BookingPotentialBadge from "@/components/business/booking-potential-badge";
import SocialPlatformBadge from "@/components/business/social-platform-badge";
import DetailRow from "@/components/common/detail-row";
import EngagementMetric from "@/components/common/engagement-metric";
import StatusBadge from "@/components/common/status-badge";
import StyledView from "@/components/common/styled-view";
import AICommentCard from "@/components/post/ai-comment-card";

import type { Post } from "@/contexts/posts-context";
import { processTextForDisplay } from "@/lib/helpers/text";

// Load mock data from JSON files
const mockPosts: Post[] = mockPostsData as Post[];

// Types for AI comments
interface AIComment {
  id: string;
  customerComment: string;
  customerName: string;
  aiResponse: string;
  timestamp: string;
  isBookingInterest: boolean;
}

// Load AI comments data from JSON file
const mockAIComments: Record<string, AIComment[]> = mockAICommentsData as Record<string, AIComment[]>;

// Helper function to get post status badge info
const statusBadgeMap = {
  draft: { label: "Draft", variant: "draft" as const },
  scheduled: { label: "Scheduled", variant: "scheduled" as const },
  published: { label: "Published", variant: "published" as const },
  archived: { label: "Archived", variant: "archived" as const },
};

const statusColorMap = {
  draft: theme.colors.mutedForeground,
  scheduled: theme.colors.chart1,
  published: theme.colors.success,
  archived: theme.colors.mutedForeground,
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Helper function to check if a post has booking potential
function hasBookingPotential(postId: string): boolean {
  const comments = mockAIComments[postId];
  return comments ? comments.some((comment) => comment.isBookingInterest) : false;
}

interface PostContentDisplayProps {
  content: string;
  hashtags: string | null | undefined;
}

function PostContentDisplay({ content, hashtags }: PostContentDisplayProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpanded = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  // Use a higher character limit for detail view since we have more space
  const CHARACTER_LIMIT = 300;
  const textData = processTextForDisplay(content, hashtags, CHARACTER_LIMIT, isExpanded);

  if (isExpanded || !textData.shouldShowMore) {
    // Show full text, with hashtags in light blue
    return (
      <Text style={styles.postContent}>
        <Text>{textData.content}</Text>
        {textData.hashtags && <Text style={styles.hashtagText}> {textData.hashtags}</Text>}
        {textData.shouldShowMore && (
          <TouchableOpacity onPress={handleToggleExpanded}>
            <Text style={styles.moreButton}> Show less</Text>
          </TouchableOpacity>
        )}
      </Text>
    );
  }

  // Show truncated text with "more" button
  return (
    <Text style={styles.postContent}>
      <Text>{textData.content}</Text>
      {textData.hashtags && <Text style={styles.hashtagText}> {textData.hashtags}</Text>}
      <TouchableOpacity onPress={handleToggleExpanded}>
        <Text style={styles.moreButton}>... Show more</Text>
      </TouchableOpacity>
    </Text>
  );
}

export default function PostDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const headerHeight = useHeaderHeight();

  if (!id) {
    return (
      <StyledView>
        <Text>Post not found</Text>
      </StyledView>
    );
  }

  const post = mockPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <StyledView>
        <Text>Post not found</Text>
      </StyledView>
    );
  }

  return (
    <StyledView style={styles.container}>
      <ScrollView style={[styles.scrollView, { paddingTop: headerHeight }]} showsVerticalScrollIndicator={false}>
        {/* Status Badge */}
        <Stack.Screen
          options={{
            headerLeft: () => <SocialPlatformBadge platform="instagram" followerCount={1250} />,
            headerRight: () => (
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <StatusBadge label={statusBadgeMap[post.status].label} variant={statusBadgeMap[post.status].variant} />
                {hasBookingPotential(post.id) && <BookingPotentialBadge />}
              </View>
            ),
          }}
        />

        {/* Post Image */}
        {post.imageUrl && (
          <View style={styles.imageContainer}>
            <Animated.Image
              source={{ uri: post.imageUrl }}
              style={styles.postImage}
              sharedTransitionTag={`image-${post.id}`}
            />
          </View>
        )}

        {/* Post Content - Instagram Style */}
        <View style={styles.contentContainer}>
          <PostContentDisplay content={post.content} hashtags={post.hashtags} />
        </View>

        {/* Engagement Stats */}
        {post.status === "published" && (
          <View style={styles.statsContainer}>
            <EngagementMetric icon={Heart} count={post.likes || 0} label="Likes" iconColor={theme.colors.destructive} />
            <EngagementMetric
              icon={MessageCircle}
              count={post.comments || 0}
              label="Comments"
              iconColor={theme.colors.primary}
            />
            <EngagementMetric
              icon={Eye}
              count={post.views || 0}
              label="Views"
              iconColor={theme.colors.mutedForeground}
            />
          </View>
        )}

        {/* Post Details */}
        <View style={styles.detailsContainer}>
          <DetailRow label="Created" value={formatDate(post.createdAt)} />
          {post.scheduledAt && <DetailRow label="Scheduled" value={formatDate(post.scheduledAt)} />}
          <DetailRow
            label="Status"
            value={statusBadgeMap[post.status].label}
            valueColor={statusColorMap[post.status]}
          />
          <DetailRow
            label="Review Status"
            value={post.reviewStatus.charAt(0).toUpperCase() + post.reviewStatus.slice(1)}
            valueColor={
              post.reviewStatus === "approved"
                ? theme.colors.success
                : post.reviewStatus === "rejected"
                  ? theme.colors.destructive
                  : theme.colors.mutedForeground
            }
            showDivider={false}
          />
        </View>

        {/* AI Comments Section */}
        {mockAIComments[post.id] && mockAIComments[post.id].length > 0 && (
          <View style={styles.commentsSection}>
            <Text style={styles.sectionTitle}>AI Comments & Responses</Text>
            {mockAIComments[post.id].map((comment) => (
              <AICommentCard key={comment.id} comment={comment} />
            ))}
          </View>
        )}
      </ScrollView>
    </StyledView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: theme.colors.background,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Geist-SemiBold",
    color: theme.colors.text,
    flex: 1,
    textAlign: "center",
    marginHorizontal: 16,
  },
  headerSpacer: {
    width: 40, // Adjust as needed for spacing
  },
  scrollView: {
    flex: 1,
  },
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  platformBadgeContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    marginBottom: 16,
    // borderRadius: 12,
    overflow: "hidden",
  },
  postImage: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  postContent: {
    fontSize: 16,
    fontFamily: "Geist",
    color: theme.colors.text,
    lineHeight: 24,
  },
  hashtagText: {
    fontSize: 16,
    fontFamily: "Geist",
    color: "#4a9eff", // Light blue color for hashtags, matching Instagram style
    lineHeight: 24,
  },
  moreButton: {
    fontSize: 16,
    fontFamily: "Geist",
    color: theme.colors.mutedForeground,
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  detailsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  commentsSection: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Geist-SemiBold",
    color: theme.colors.text,
    marginBottom: 12,
  },
});
