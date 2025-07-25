import { BlurView } from "expo-blur";
import { Link } from "expo-router";
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

import theme from "@/constants/theme";

import { Button } from "../common/button";

export default function WelcomeScreen() {
  return (
    <ImageBackground source={require("@/assets/images/welcome.png")} style={styles.backgroundImage} resizeMode="cover">
      <Animated.View entering={FadeIn.duration(600)} style={styles.container}>
        <Image source={require("@/assets/images/logo.png")} style={styles.logo} />
        <Text style={styles.headline}>Grow your business while we post for you.</Text>
        <View style={styles.imagePlaceholder} />
        <View style={styles.buttons}>
          <Button size="lg" onPress={() => {}}>
            Get Started
          </Button>
          <BlurView intensity={15} style={styles.signInButton}>
            <Link href="/sign-in" asChild>
              <TouchableOpacity style={styles.signInButtonContent}>
                <Text style={styles.signInButtonText}>Sign In</Text>
              </TouchableOpacity>
            </Link>
          </BlurView>
        </View>
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 24,
    paddingTop: 46,
    paddingHorizontal: 32,
  },
  logo: {
    width: 150,
    height: 100,
    resizeMode: "contain",
  },
  headline: {
    fontSize: 20,
    textAlign: "center",
    color: theme.colors.text,
    maxWidth: "65%",
    fontFamily: "Geist",
    letterSpacing: -0.25,
  },
  welcomeSubtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    color: theme.colors.text,
  },
  imagePlaceholder: {
    height: "50%",
  },
  buttons: {
    flexDirection: "column",
    gap: 12,
    width: "100%",
  },
  signInButton: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },
  signInButtonContent: {
    padding: 16,
  },
  signInButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Geist-SemiBold",
  },
});
