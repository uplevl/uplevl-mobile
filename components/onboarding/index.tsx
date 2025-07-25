import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import theme from "@/constants/theme";

import WelcomeScreen from "./welcome-screen";

export default function Onboarding() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/(app)/posts/list");
    }
  }, [isSignedIn, router]);

  function renderContent() {
    if (currentStep === 0) {
      return <WelcomeScreen />;
    }

    return null;
  }

  return <View style={styles.container}>{renderContent()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
