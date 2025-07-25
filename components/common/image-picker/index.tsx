import { Camera, Image } from "lucide-react-native";
import { memo, useCallback } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import theme from "@/constants/theme";

import { Button } from "@/components/common/button";

import { containerStyles } from "@/lib/constants/styles";
import { useImagePicker } from "@/lib/hooks";

export interface ImagePickerComponentProps {
  onImageSelected: (imageUri: string) => void;
  maxImages?: number;
  currentImageCount?: number;
}

function ImagePickerComponent({ onImageSelected, maxImages = 5, currentImageCount = 0 }: ImagePickerComponentProps) {
  const { takePhoto, selectFromLibrary } = useImagePicker();

  const checkImageLimit = useCallback(() => {
    if (currentImageCount >= maxImages) {
      Alert.alert("Maximum Images", `You can only add up to ${maxImages} images per post.`);
      return false;
    }
    return true;
  }, [currentImageCount, maxImages]);

  const handleTakePhoto = useCallback(async () => {
    if (!checkImageLimit()) return;

    const uri = await takePhoto();
    if (uri) {
      onImageSelected(uri);
    }
  }, [checkImageLimit, takePhoto, onImageSelected]);

  const handleSelectFromLibrary = useCallback(async () => {
    if (!checkImageLimit()) return;

    const uri = await selectFromLibrary();
    if (uri) {
      onImageSelected(uri);
    }
  }, [checkImageLimit, selectFromLibrary, onImageSelected]);

  const isAtLimit = currentImageCount >= maxImages;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Add Images</Text>
        <Text style={styles.subtitle}>
          {currentImageCount}/{maxImages} images added
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button variant="outline" onPress={handleTakePhoto} style={styles.button} disabled={isAtLimit} icon={Camera}>
          Take Photo
        </Button>

        <Button
          variant="outline"
          onPress={handleSelectFromLibrary}
          style={styles.button}
          disabled={isAtLimit}
          icon={Image}
        >
          Photo Library
        </Button>
      </View>

      {isAtLimit && <Text style={styles.limitText}>Maximum number of images reached</Text>}
    </View>
  );
}

export default memo(ImagePickerComponent);

const styles = StyleSheet.create({
  container: {
    ...containerStyles.card,
    marginBottom: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: "Geist-SemiBold",
    color: theme.colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Geist",
    color: theme.colors.mutedForeground,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
  },
  limitText: {
    fontSize: 12,
    fontFamily: "Geist",
    color: theme.colors.mutedForeground,
    textAlign: "center",
    marginTop: 8,
  },
});
