import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { useCameraPermissions } from "expo-camera";
import { useFonts } from "expo-font";
import * as MediaLibrary from "expo-media-library";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { isSignedIn, isLoaded: isAuthLoaded } = useAuth();
  const [fontsLoaded] = useFonts({
    Geist: require("../assets/fonts/Geist-Regular.ttf"),
    "Geist-SemiBold": require("../assets/fonts/Geist-SemiBold.ttf"),
  });

  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [permissionsRequested, setPermissionsRequested] = useState(false);

  const isAppReady = fontsLoaded && isAuthLoaded && permissionsRequested;

  useEffect(() => {
    async function requestPermissions() {
      try {
        // Request camera permission
        if (!cameraPermission?.granted) {
          const cameraResult = await requestCameraPermission();
          console.log("Camera permission:", cameraResult?.status);
        }

        // Request media library permission
        const mediaResult = await MediaLibrary.requestPermissionsAsync();
        console.log("Media library permission:", mediaResult.status);

        // Request notification permission
        const notificationPermission = await Notifications.requestPermissionsAsync({
          ios: {
            allowAlert: true,
            allowBadge: true,
            allowSound: true,
          },
        });
        console.log("Notification permission:", notificationPermission.status);

        setPermissionsRequested(true);
      } catch (error) {
        console.error("Error requesting permissions:", error);
        // Still allow app to continue even if permissions fail
        setPermissionsRequested(true);
      }
    }

    if (fontsLoaded && isAuthLoaded) {
      requestPermissions();
    }
  }, [fontsLoaded, isAuthLoaded, cameraPermission, requestCameraPermission]);

  useEffect(() => {
    if (isAppReady) {
      SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return null;
  }

  return (
    <Stack>
      {isSignedIn ? (
        // User is signed in, show the app
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      ) : (
        // User is not signed in, show onboarding/auth flow
        <>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </>
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <RootLayoutNav />
    </ClerkProvider>
  );
}
