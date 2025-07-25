import { useRouter } from "expo-router";

import StyledView from "@/components/common/styled-view";
import AddPostForm from "@/components/post/add-post-form";

import { usePosts } from "@/contexts/posts-context";

export default function AddPostPage() {
  const router = useRouter();
  const { addDraftPost } = usePosts();

  function handleGeneratePost(images: string[], description: string) {
    // Create draft post immediately
    const newPostId = addDraftPost(images, description);

    console.log("Created draft post:", newPostId);

    // Close modal and navigate back to posts list
    router.back();
  }

  return (
    <StyledView>
      <AddPostForm onGeneratePost={handleGeneratePost} isGenerating={false} maxImages={5} />
    </StyledView>
  );
}
