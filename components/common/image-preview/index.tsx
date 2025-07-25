import { X } from "lucide-react-native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import theme from "@/constants/theme";

export interface ImagePreviewProps {
  images: string[];
  onRemoveImage: (index: number) => void;
  maxImages?: number;
}

export default function ImagePreview({ images, onRemoveImage, maxImages = 5 }: ImagePreviewProps) {
  if (images.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Selected Images</Text>
        <Text style={styles.subtitle}>
          {images.length}/{maxImages} images
        </Text>
      </View>

      <View style={styles.imageGrid}>
        {images.map((imageUri, index) => (
          <View key={`${imageUri}-${index}`} style={styles.imageContainer}>
            <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
            <TouchableOpacity style={styles.removeButton} onPress={() => onRemoveImage(index)} activeOpacity={0.8}>
              <X color={theme.colors.white} size={16} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: theme.colors.neutral800,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
  subtitle: {
    fontSize: 14,
    fontFamily: "Geist",
    color: theme.colors.mutedForeground,
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  imageContainer: {
    position: "relative",
    width: 80,
    height: 80,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  removeButton: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: theme.colors.destructive,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: theme.colors.neutral800,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
});
