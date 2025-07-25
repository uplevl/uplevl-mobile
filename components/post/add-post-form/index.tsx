import { useHeaderHeight } from "@react-navigation/elements";
import { Sparkles } from "lucide-react-native";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";

import theme from "@/constants/theme";

import ActionBar from "@/components/common/action-bar";
import { Button } from "@/components/common/button";
import DescriptionInput from "@/components/common/description-input";
import ImagePickerComponent from "@/components/common/image-picker";
import ImagePreview from "@/components/common/image-preview";

export interface AddPostFormProps {
  onGeneratePost: (images: string[], description: string) => void;
  isGenerating?: boolean;
  maxImages?: number;
}

export default function AddPostForm({ onGeneratePost, isGenerating = false, maxImages = 5 }: AddPostFormProps) {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const headerHeight = useHeaderHeight();

  function handleImageSelected(imageUri: string) {
    if (selectedImages.length >= maxImages) {
      Alert.alert("Maximum Images", `You can only add up to ${maxImages} images per post.`);
      return;
    }

    setSelectedImages((prev) => [...prev, imageUri]);
  }

  function handleRemoveImage(index: number) {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  }

  function handleGeneratePost() {
    if (selectedImages.length === 0) {
      Alert.alert("No Images", "Please add at least one image to generate a post.");
      return;
    }

    onGeneratePost(selectedImages, description.trim());
  }

  const canGenerate = selectedImages.length > 0;

  return (
    <View style={[styles.container, { paddingTop: headerHeight }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ImagePickerComponent
          onImageSelected={handleImageSelected}
          maxImages={maxImages}
          currentImageCount={selectedImages.length}
        />

        <ImagePreview images={selectedImages} onRemoveImage={handleRemoveImage} maxImages={maxImages} />

        <DescriptionInput
          value={description}
          onChangeText={setDescription}
          placeholder="Describe your content... (optional)"
        />

        {/* Add bottom padding to account for action bar */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      <ActionBar>
        <Button
          variant="default"
          onPress={handleGeneratePost}
          disabled={!canGenerate || isGenerating}
          style={styles.generateButton}
          icon={Sparkles}
        >
          {isGenerating ? "Generating..." : "Generate Post"}
        </Button>
      </ActionBar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  generateButton: {
    flex: 1,
  },
  bottomPadding: {
    height: 80,
  },
});
