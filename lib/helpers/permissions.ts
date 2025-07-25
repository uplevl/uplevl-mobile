/**
 * Device permissions utilities
 */
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export async function requestImagePickerPermissions(): Promise<boolean> {
  const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();

  if (mediaLibraryStatus !== "granted" || cameraStatus !== "granted") {
    Alert.alert("Permission Required", "We need camera and photo library permissions to let you select images.", [
      { text: "OK" },
    ]);
    return false;
  }
  return true;
}

export interface ImagePickerOptions {
  allowsEditing?: boolean;
  aspect?: [number, number];
  quality?: number;
}

export const defaultImagePickerOptions: ImagePickerOptions = {
  allowsEditing: true,
  aspect: [4, 5],
  quality: 0.8,
};
