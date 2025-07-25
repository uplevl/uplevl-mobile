/**
 * Image processing and manipulation utilities
 */
import { Dimensions } from "react-native";

export function getOptimalImageDimensions(
  aspectRatio: number = 1,
  margin: number = 56,
): {
  width: number;
  height: number;
} {
  const screenWidth = Dimensions.get("window").width;
  const imageWidth = screenWidth - margin;

  return {
    width: imageWidth,
    height: imageWidth / aspectRatio,
  };
}

export function generateImageKey(uri: string, index: number): string {
  return `${uri}-${index}`;
}

/**
 * Validates if an image URI is valid
 */
export function isValidImageUri(uri: string): boolean {
  if (!uri || typeof uri !== "string") return false;

  // Basic URI validation
  return uri.startsWith("http") || uri.startsWith("file://") || uri.startsWith("data:");
}
