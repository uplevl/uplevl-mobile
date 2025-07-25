const theme = {
  colors: {
    primaryDarker: "#996b00",
    primaryDark: "#af7c00",
    primary: "#ffba00",
    primaryLight: "#ffd96b",
    primaryLighter: "#fffbe3",
    primaryForeground: "#262626",
    text: "#262626",
    background: "#f7f7f7",

    card: "#ffffff",
    cardForeground: "#262626",

    popover: "#ffffff",
    popoverForeground: "#262626",

    muted: "#f7f7f7",
    mutedForeground: "#8e8e8e",

    border: "#ebebeb",
    input: "#ebebeb",
    inputBorder: "#d4d4d8",
    inputBackground: "#ffffff",
    inputError: "#ef4444",
    inputPlaceholder: "#9ca3af",
    inputShadow: "#000",

    destructive: "#dc2626",
    destructiveLight: "#fecaca",
    destructiveDark: "#dc2626",
    destructiveForeground: "#dc2626",

    success: "#16a34a",
    successLight: "#dcfce7",
    successBorder: "#86efac",
    successDark: "#15803d",

    chart1: "#dc9441",
    chart2: "#6ba3b8",
    chart3: "#5a6470",
    chart4: "#ffcc33",
    chart5: "#e6a855",

    sidebar: "#ffffff",
    sidebarForeground: "#262626",
    sidebarPrimary: "#343434",
    sidebarPrimaryForeground: "#fafafa",
    sidebarAccent: "#f7f7f7",
    sidebarAccentForeground: "#343434",
    sidebarBorder: "#ebebeb",
    sidebarRing: "#b5b5b5",

    neutral50: "#fafafa",
    neutral100: "#f5f5f5",
    neutral200: "#e5e5e5",
    neutral300: "#d4d4d4",
    neutral400: "#a1a1a1",
    neutral500: "#71717b",
    neutral600: "#525252",
    neutral800: "#262626",

    secondary: "#e5e5e5",
    secondaryDark: "#525252",
    secondaryForeground: "#262626",

    accent: "#f1f5f9",
    accentForeground: "#334155",

    ring: "#b5b5b5",
    white: "#ffffff",
    transparent: "transparent",
  },

  borderRadius: {
    none: 0,
    sm: 4,
    md: 8, // Default for inputs
    lg: 12, // Default for cards
    xl: 16,
    xxl: 20,
    full: 9999,
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 12, // Default horizontal padding
    lg: 16, // Default vertical margins
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },

  fontSize: {
    xs: 12,
    sm: 14,
    md: 16, // Default for inputs/body text
    lg: 18, // Default for section titles
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },

  fontFamily: {
    regular: "Geist",
    semiBold: "Geist-SemiBold",
  },

  shadows: {
    sm: {
      // Default for inputs
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 1,
      elevation: 1,
    },
    md: {
      // Default for cards
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    lg: {
      // Default for modals
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    xl: {
      // For prominent elements
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
  },
} as const;

export default theme;
