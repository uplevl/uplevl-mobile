import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from "react";

import mockPostsData from "@/assets/mocks/posts.json";

// Import the PostTabType from the tabs component
import { type PostTabType, getDefaultActiveTab } from "@/components/post/posts-tabs";

import { BasePost } from "@/lib/types/common";

export interface Post extends BasePost {}

// Helper function to calculate post counts by status - moved outside component to prevent recreation
function calculatePostCounts(posts: Post[]) {
  return posts.reduce(
    (counts, post) => {
      // Only count posts that we track in our tabs
      if (post.status === "published" || post.status === "draft" || post.status === "archived") {
        counts[post.status] = (counts[post.status] || 0) + 1;
      }
      return counts;
    },
    {
      published: 0,
      draft: 0,
      archived: 0,
    },
  );
}

// Helper function to filter posts by status
function filterPostsByStatus(posts: Post[], status: PostTabType): Post[] {
  return posts.filter((post) => post.status === status);
}

interface PostsContextType {
  posts: Post[];
  addDraftPost: (images: string[], description: string) => string;
  updatePost: (postId: string, updates: Partial<Post>) => void;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  // Filter state
  activeFilter: PostTabType;
  setActiveFilter: (filter: PostTabType) => void;
  postCounts: { published: number; draft: number; archived: number };
  filteredPosts: Post[];
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

interface PostsProviderProps {
  children: ReactNode;
}

export function PostsProvider({ children }: PostsProviderProps) {
  // Load mock data from JSON file - memoized to prevent recreating on each render
  const initialPosts = useMemo(() => mockPostsData as Post[], []);

  const [posts, setPosts] = useState<Post[]>(initialPosts);

  // Memoize post counts calculation
  const postCounts = useMemo(() => calculatePostCounts(posts), [posts]);

  const [activeFilter, setActiveFilter] = useState<PostTabType>(() => getDefaultActiveTab(postCounts));

  // Memoize filtered posts calculation
  const filteredPosts = useMemo(() => filterPostsByStatus(posts, activeFilter), [posts, activeFilter]);

  const addDraftPost = useCallback((images: string[], description: string): string => {
    const newPostId = Date.now().toString();
    const newPost: Post = {
      id: newPostId,
      images,
      content: "", // Will be filled by AI
      hashtags: "", // Will be filled by AI
      status: "draft",
      reviewStatus: "pending",
      createdAt: new Date().toISOString(),
      scheduledAt: null,
      isGenerating: true,
      originalDescription: description,
    };

    setPosts((prevPosts) => [newPost, ...prevPosts]);

    // Simulate AI generation
    const timeoutId = setTimeout(() => {
      const generatedContent = description
        ? `${description}\n\nOur expert team is here to help you look and feel your best!`
        : "Check out our latest work! Our expert team is here to help you look and feel your best!";

      const generatedHashtags = "#beauty #selfcare #professional #transformation #confidence";

      updatePost(newPostId, {
        content: generatedContent,
        hashtags: generatedHashtags,
        isGenerating: false,
      });
    }, 3000);

    // Store timeout ID for potential cleanup
    (newPost as any)._timeoutId = timeoutId;

    return newPostId;
  }, []);

  const updatePost = useCallback((postId: string, updates: Partial<Post>) => {
    setPosts((prevPosts) => prevPosts.map((post) => (post.id === postId ? { ...post, ...updates } : post)));
  }, []);

  const setActiveFilterCallback = useCallback((filter: PostTabType) => {
    setActiveFilter(filter);
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      posts,
      addDraftPost,
      updatePost,
      setPosts,
      activeFilter,
      setActiveFilter: setActiveFilterCallback,
      postCounts,
      filteredPosts,
    }),
    [posts, addDraftPost, updatePost, activeFilter, setActiveFilterCallback, postCounts, filteredPosts],
  );

  return <PostsContext.Provider value={contextValue}>{children}</PostsContext.Provider>;
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (context === undefined) {
    throw new Error("usePosts must be used within a PostsProvider");
  }
  return context;
}
