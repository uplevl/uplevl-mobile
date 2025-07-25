import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import OAuthSignInButton from "./index";

export default function OAuthSignInExample() {
  const router = useRouter();

  const handleSuccess = () => {
    console.log("Authentication successful!");
    // Navigate to the dashboard or main app screen
    router.replace("/(app)/stats");
  };

  const handleError = (error: any) => {
    console.error("Authentication failed:", error);
    // Handle error (e.g., show toast, log analytics event)
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sign in to your account</Text>
      <Text style={styles.subtitle}>Choose your preferred sign-in method</Text>

      <View style={styles.buttonContainer}>
        <OAuthSignInButton strategy="oauth_google" onSuccess={handleSuccess} onError={handleError} />

        <OAuthSignInButton strategy="oauth_facebook" onSuccess={handleSuccess} onError={handleError} />

        <OAuthSignInButton strategy="oauth_instagram" onSuccess={handleSuccess} onError={handleError} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#1f1f1f",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32,
    color: "#6b7280",
  },
  buttonContainer: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
});
