import { useHeaderHeight } from "@react-navigation/elements";
import { Stack, useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import { memo, useCallback, useEffect, useMemo } from "react";
import { Alert, FlatList, ListRenderItem, StyleSheet } from "react-native";

import mockAICommentsData from "@/assets/mocks/ai-comments.json";

import { Button } from "@/components/common/button";
import EmptyState from "@/components/common/empty-state";
import { SegmentedControl, SegmentedControlOption } from "@/components/common/segmented-control";
import StickyActionBar from "@/components/common/sticky-action-bar";
import StyledView from "@/components/common/styled-view";
import PostItem from "@/components/post/post-item";
import { PostTabType } from "@/components/post/posts-tabs";

import { type Post, usePosts } from "@/contexts/posts-context";

// Types for AI comments (matching the detail view)
interface AIComment {
  id: string;
  customerComment: string;
  customerName: string;
  aiResponse: string;
  timestamp: string;
  isBookingInterest: boolean;
}

// Load AI comments data from JSON file - moved outside component to prevent recreation
const mockAIComments: Record<string, AIComment[]> = mockAICommentsData as Record<string, AIComment[]>;

// Helper function to check if a post has booking potential - pure function
function hasBookingPotential(postId: string): boolean {
  const comments = mockAIComments[postId];
  return comments ? comments.some((comment) => comment.isBookingInterest) : false;
}

// Memoized filter options to prevent recreation
const filterOptions: SegmentedControlOption[] = [
  { label: "Draft", value: "draft" },
  { label: "Published", value: "published" },
];

interface PostItemWrapperProps {
  post: Post;
  onPress: (post: Post) => void;
  onApprove: (postId: string) => void;
  onEdit: (postId: string) => void;
  onReject: (postId: string) => void;
}

// Memoized post item wrapper to prevent unnecessary re-renders
function PostItemWrapper({ post, onPress, onApprove, onEdit, onReject }: PostItemWrapperProps) {
  return (
    <PostItem
      post={post}
      hasBookingPotential={hasBookingPotential(post.id)}
      onPress={onPress}
      onApprove={onApprove}
      onEdit={onEdit}
      onReject={onReject}
    />
  );
}

const PostItemWrapperMemo = memo(PostItemWrapper);

interface EmptyStateWrapperProps {
  activeFilter: PostTabType;
}

function EmptyStateWrapper({ activeFilter }: EmptyStateWrapperProps) {
  const emptyStateText = useMemo(() => {
    switch (activeFilter) {
      case "published":
        return {
          title: "No published posts yet",
          description: "Your published posts will appear here",
        };
      case "draft":
        return {
          title: "No draft posts yet",
          description: "Create your first post to see drafts here",
        };
      case "archived":
        return {
          title: "No archived posts yet",
          description: "Archived posts will appear here",
        };
      default:
        return {
          title: "No posts yet",
          description: "Create your first post to get started",
        };
    }
  }, [activeFilter]);

  return <EmptyState title={emptyStateText.title} description={emptyStateText.description} />;
}

const EmptyStateWrapperMemo = memo(EmptyStateWrapper);

function PostsScreen() {
  const router = useRouter();
  const { filteredPosts, activeFilter, setActiveFilter, setPosts, posts } = usePosts();
  const headerHeight = useHeaderHeight();

  // Automatically switch to draft tab when a new generating post is added
  useEffect(() => {
    const hasGenerating = posts.some((post) => post.isGenerating && post.status === "draft");
    if (hasGenerating && activeFilter !== "draft") {
      setActiveFilter("draft");
    }
  }, [posts, activeFilter, setActiveFilter]);

  const handlePostPress = useCallback(
    (post: Post) => {
      console.log("Post pressed:", post.id);
      router.push({
        pathname: "/(app)/posts/[id]",
        params: { id: post.id },
      });
    },
    [router],
  );

  const handleAddPost = useCallback(() => {
    console.log("Navigate to create new post");
    router.push("/(app)/posts/add-post");
  }, [router]);

  const handleApprovePost = useCallback(
    async (postId: string) => {
      try {
        // Update the post status to published and review status to approved
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  status: "published" as const,
                  reviewStatus: "approved" as const,
                  scheduledAt: new Date().toISOString(),
                }
              : post,
          ),
        );

        Alert.alert("Success", "Post approved and published!");

        // TODO: Call actual API to approve post
        // await approvePost(postId);
      } catch (error) {
        console.error("Failed to approve post:", error);
        Alert.alert("Error", "Failed to approve post. Please try again.");
      }
    },
    [setPosts],
  );

  const handleEditPost = useCallback((postId: string) => {
    console.log("Edit post:", postId);
    Alert.alert("Edit Post", "Edit functionality will be implemented soon!");
    // TODO: Navigate to edit screen or show edit modal
  }, []);

  const handleRejectPost = useCallback(
    async (postId: string) => {
      try {
        Alert.alert("Reject Post", "Are you sure you want to reject this post?", [
          { text: "Cancel", style: "cancel" },
          {
            text: "Reject",
            style: "destructive",
            async onPress() {
              // Update the post review status to rejected
              setPosts((prevPosts) =>
                prevPosts.map((post) => (post.id === postId ? { ...post, reviewStatus: "rejected" as const } : post)),
              );

              Alert.alert("Success", "Post rejected!");

              // TODO: Call actual API to reject post
              // await rejectPost(postId);
            },
          },
        ]);
      } catch (error) {
        console.error("Failed to reject post:", error);
        Alert.alert("Error", "Failed to reject post. Please try again.");
      }
    },
    [setPosts],
  );

  const handleFilterOptionPress = useCallback(
    (option: string) => {
      setActiveFilter(option as PostTabType);
    },
    [setActiveFilter],
  );

  // Memoized render item function to prevent recreation
  const renderItem: ListRenderItem<Post> = useCallback(
    ({ item }) => (
      <PostItemWrapperMemo
        post={item}
        onPress={handlePostPress}
        onApprove={handleApprovePost}
        onEdit={handleEditPost}
        onReject={handleRejectPost}
      />
    ),
    [handlePostPress, handleApprovePost, handleEditPost, handleRejectPost],
  );

  // Memoized key extractor
  const keyExtractor = useCallback((item: Post) => item.id, []);

  // Memoized getItemLayout for better performance (assuming fixed item height)
  const getItemLayout = useCallback(
    (data: ArrayLike<Post> | null | undefined, index: number) => ({
      length: 200, // Approximate item height - adjust based on your actual item height
      offset: 200 * index,
      index,
    }),
    [],
  );

  // Memoized content container style
  const contentContainerStyle = useMemo(
    () => ({
      paddingTop: headerHeight,
      paddingBottom: 70,
    }),
    [headerHeight],
  );

  // Memoized empty component
  const renderEmptyComponent = useCallback(() => <EmptyStateWrapperMemo activeFilter={activeFilter} />, [activeFilter]);

  return (
    <StyledView>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <SegmentedControl
              options={filterOptions}
              selectedOption={activeFilter}
              onOptionPress={handleFilterOptionPress}
            />
          ),
        }}
      />
      <FlatList
        data={filteredPosts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={contentContainerStyle}
        ListEmptyComponent={renderEmptyComponent}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={5}
        updateCellsBatchingPeriod={50}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
          autoscrollToTopThreshold: 1,
        }}
      />

      <StickyActionBar>
        <Button variant="default" onPress={handleAddPost} icon={Plus} style={{ flex: 1 }}>
          Add New Post
        </Button>
      </StickyActionBar>
    </StyledView>
  );
}

export default memo(PostsScreen);

const styles = StyleSheet.create({
  // Removed empty state styles since they're now in the EmptyState component
});
