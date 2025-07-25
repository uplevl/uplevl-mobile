# OAuth Sign-In Button Component

A React Native component for OAuth authentication using Clerk, featuring native-style buttons for Google, Facebook, and Instagram.

## Features

- ✅ **Native-style buttons** with platform-appropriate colors and styling
- ✅ **Loading states** with activity indicators during authentication
- ✅ **Comprehensive error handling** with user-friendly alerts
- ✅ **TypeScript support** with proper type definitions
- ✅ **Clerk integration** following official documentation best practices
- ✅ **Accessibility support** with proper button states and feedback

## Installation

This component requires the following dependencies:

```bash
npm install @clerk/clerk-expo expo-auth-session expo-web-browser
```

## Usage

### Basic Usage

```tsx
import OAuthSignInButton from "./components/oauth-sign-in-button";

export default function SignInScreen() {
  return (
    <OAuthSignInButton
      strategy="oauth_google"
      onSuccess={() => console.log("Success!")}
      onError={(error) => console.error("Error:", error)}
    />
  );
}
```

### Multiple Providers

```tsx
import OAuthSignInButton from "./components/oauth-sign-in-button";

export default function SignInScreen() {
  const handleSuccess = () => {
    // Navigate to dashboard or main app
    router.replace("/dashboard");
  };

  const handleError = (error) => {
    // Handle authentication error
    console.error("Auth failed:", error);
  };

  return (
    <View>
      <OAuthSignInButton strategy="oauth_google" onSuccess={handleSuccess} onError={handleError} />
      <OAuthSignInButton strategy="oauth_facebook" onSuccess={handleSuccess} onError={handleError} />
      <OAuthSignInButton strategy="oauth_instagram" onSuccess={handleSuccess} onError={handleError} />
    </View>
  );
}
```

## Props

| Prop        | Type                   | Required | Description                                                                       |
| ----------- | ---------------------- | -------- | --------------------------------------------------------------------------------- |
| `strategy`  | `OAuthStrategy`        | ✅       | The OAuth provider strategy (`oauth_google`, `oauth_facebook`, `oauth_instagram`) |
| `onSuccess` | `() => void`           | ❌       | Callback fired when authentication succeeds                                       |
| `onError`   | `(error: any) => void` | ❌       | Callback fired when authentication fails                                          |

## Supported OAuth Strategies

- **Google** (`oauth_google`) - White button with Google branding
- **Facebook** (`oauth_facebook`) - Blue button with Facebook branding
- **Instagram** (`oauth_instagram`) - Pink/red button with Instagram branding

## Button Styles

Each provider has native-inspired styling:

### Google

- White background with gray border
- Dark text
- Clean, minimal design

### Facebook

- Facebook blue background (#1877F2)
- White text
- Official Facebook brand colors

### Instagram

- Instagram pink/red background (#E4405F)
- White text
- Official Instagram brand colors

## Error Handling

The component handles various authentication scenarios:

- **Network errors** - Shows generic error message
- **Clerk API errors** - Shows specific error from Clerk
- **Missing requirements** - Alerts user about additional steps needed
- **Second factor authentication** - Prompts for MFA completion

## Loading States

- Shows activity indicator during authentication
- Disables button to prevent multiple requests
- Color-matched spinner for each provider

## Browser Warm-up

The component automatically:

- Preloads the browser on Android for faster authentication
- Cleans up browser resources when component unmounts
- Handles auth session completion

## Requirements

- Expo SDK 49+
- React Native 0.70+
- Clerk account with OAuth providers configured
- Proper redirect URLs configured in Clerk dashboard

## Configuration

Make sure your Clerk instance is configured with the OAuth providers you want to use:

1. Go to your Clerk dashboard
2. Navigate to "Social Connections"
3. Enable and configure the desired providers
4. Set up proper redirect URLs for your mobile app

## Troubleshooting

### Authentication not working

- Verify OAuth providers are enabled in Clerk dashboard
- Check redirect URLs are properly configured
- Ensure app scheme matches Clerk configuration

### Styling issues

- Verify React Native version compatibility
- Check for conflicting styles in parent components
- Ensure proper import of component

### TypeScript errors

- Update `@clerk/types` to latest version
- Verify `OAuthStrategy` type is properly imported
