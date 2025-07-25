/**
 * Custom hook for responsive dimensions
 */
import { useEffect, useState } from "react";
import { Dimensions, ScaledSize } from "react-native";

export interface UseDimensionsReturn {
  window: ScaledSize;
  screen: ScaledSize;
  isLandscape: boolean;
  isPortrait: boolean;
}

export function useDimensions(): UseDimensionsReturn {
  const [dimensions, setDimensions] = useState(() => ({
    window: Dimensions.get("window"),
    screen: Dimensions.get("screen"),
  }));

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window, screen }) => {
      setDimensions({ window, screen });
    });

    return () => subscription?.remove();
  }, []);

  const isLandscape = dimensions.window.width > dimensions.window.height;
  const isPortrait = !isLandscape;

  return {
    window: dimensions.window,
    screen: dimensions.screen,
    isLandscape,
    isPortrait,
  };
}
