import { useSSO } from "@clerk/clerk-expo";
import { OAuthStrategy } from "@clerk/types";
import { FontAwesome } from "@expo/vector-icons";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";

import { Button } from "../../common/button";

export function useWarmUpBrowser() {
  useEffect(() => {
    // Preloads the browser for Android devices to reduce authentication load time
    // See: https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync();
    };
  }, []);
}

// Handle any pending authentication sessions
WebBrowser.maybeCompleteAuthSession();

interface OAuthSignInButtonProps {
  strategy: OAuthStrategy;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export default function OAuthSignInButton({ strategy, onSuccess, onError }: OAuthSignInButtonProps) {
  useWarmUpBrowser();
  const [isLoading, setIsLoading] = useState(false);

  // Use the `useSSO()` hook to access the `startSSOFlow()` method
  const { startSSOFlow } = useSSO();

  async function onPress() {
    if (isLoading) return;

    setIsLoading(true);

    try {
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
        strategy, // Use the passed strategy prop instead of hardcoded value
        // For web, defaults to current path
        // For native, you must pass a scheme, like AuthSession.makeRedirectUri({ scheme, path })
        // For more info, see https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturioptions
        redirectUrl: AuthSession.makeRedirectUri(),
      });

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        onSuccess?.();
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // Use the `signIn` or `signUp` returned from `startSSOFlow`
        // to handle next steps
        console.warn("Authentication incomplete - additional steps required");

        // Handle the incomplete authentication based on status
        if (signIn?.status === "needs_second_factor") {
          Alert.alert("Additional Verification Required", "Please complete the second factor authentication.");
        } else if (signUp?.status === "missing_requirements") {
          Alert.alert("Additional Information Required", "Please complete your profile setup.");
        }
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error("OAuth authentication error:", JSON.stringify(err, null, 2));

      const errorMessage = err?.errors?.[0]?.message || "Authentication failed. Please try again.";

      Alert.alert("Authentication Error", errorMessage);
      onError?.(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button variant="outline" onPress={onPress} disabled={isLoading} style={styles.button}>
      <View style={styles.buttonContent}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#1f1f1f" style={styles.loader} />
        ) : (
          <>
            <SocialIcon strategy={strategy} />
          </>
        )}
      </View>
    </Button>
  );
}

// Simple icon component for social media platforms
const SocialIcon = ({ strategy }: { strategy: OAuthStrategy }) => {
  const getIconConfig = () => {
    switch (strategy) {
      case "oauth_facebook":
        return { iconName: "facebook" as const, color: "#1877F2", label: "Facebook" };
      case "oauth_instagram":
        return { iconName: "instagram" as const, color: "#E4405F", label: "Instagram" };
      case "oauth_google":
        return { iconName: "google" as const, color: "#4285F4", label: "Google" };
      default:
        return { iconName: "question" as const, color: "#6B7280", label: "Question" };
    }
  };

  const { iconName, color, label } = getIconConfig();

  return (
    <View style={styles.iconWrapper}>
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <FontAwesome name={iconName} size={20} color="#FFFFFF" />
      </View>
      <Text style={styles.buttonText}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 8,
    flex: 1,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Geist",
    color: "#1f1f1f",
    textAlign: "center",
  },
  iconWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  iconContainer: {
    width: 26,
    height: 26,
    borderRadius: 13,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    marginRight: 8,
  },
});
