import { View } from "react-native";

import theme from "@/constants/theme";

import Onboarding from "@/components/onboarding";

export default function Index() {
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Onboarding />
    </View>
  );
}
