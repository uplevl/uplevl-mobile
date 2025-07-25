/**
 * Custom hook for image picker functionality
 */
import * as ImagePicker from "expo-image-picker";
import { useCallback } from "react";
import { Alert } from "react-native";

import {
  ImagePickerOptions,
  defaultImagePickerOptions,
  requestImagePickerPermissions,
} from "@/lib/helpers/permissions";

export interface UseImagePickerReturn {
  takePhoto: (options?: ImagePickerOptions) => Promise<string | null>;
  selectFromLibrary: (options?: ImagePickerOptions) => Promise<string | null>;
  requestPermissions: () => Promise<boolean>;
}

export function useImagePicker(): UseImagePickerReturn {
  const requestPermissions = useCallback(async () => {
    return await requestImagePickerPermissions();
  }, []);

  const takePhoto = useCallback(
    async (options: ImagePickerOptions = defaultImagePickerOptions) => {
      const hasPermission = await requestPermissions();
      if (!hasPermission) return null;

      try {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: options.allowsEditing ?? defaultImagePickerOptions.allowsEditing,
          aspect: options.aspect ?? defaultImagePickerOptions.aspect,
          quality: options.quality ?? defaultImagePickerOptions.quality,
        });

        if (!result.canceled && result.assets[0]) {
          return result.assets[0].uri;
        }
        return null;
      } catch (error) {
        console.error("Error taking photo:", error);
        Alert.alert("Error", "Failed to take photo. Please try again.");
        return null;
      }
    },
    [requestPermissions],
  );

  const selectFromLibrary = useCallback(
    async (options: ImagePickerOptions = defaultImagePickerOptions) => {
      const hasPermission = await requestPermissions();
      if (!hasPermission) return null;

      try {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: options.allowsEditing ?? false, // Usually false for library selection
          aspect: options.aspect ?? defaultImagePickerOptions.aspect,
          quality: options.quality ?? defaultImagePickerOptions.quality,
        });

        if (!result.canceled && result.assets[0]) {
          return result.assets[0].uri;
        }
        return null;
      } catch (error) {
        console.error("Error selecting from library:", error);
        Alert.alert("Error", "Failed to select image. Please try again.");
        return null;
      }
    },
    [requestPermissions],
  );

  return {
    takePhoto,
    selectFromLibrary,
    requestPermissions,
  };
}
