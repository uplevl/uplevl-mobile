<p align="center">
   <a href="https://uplevl.ai?utem_source=github" target="_blank" rel="noopener noreferrer">
      <img src="https://raw.githubusercontent.com/uplevl/uplevl/refs/heads/main/src/assets/logo.svg" alt="Uplevl Logo" height="46">
   </a>
</p>
<div align="center">
   <h1>Uplevl Mobile</h1>
   <p>
      <strong>The mobile app for Uplevl - AI-powered marketing automation platform built for small businesses.</strong>
   </p>
   <p>
      This is the primary mobile interface where business owners upload content, generate AI-powered posts, review performance, and automate their social media marketing workflow.
   </p>
</div>

---

## 🔎 Overview

Uplevl Mobile is the core touchpoint for business owners using the Uplevl platform. The app provides a streamlined, mobile-first experience for content creation and marketing automation. Business owners can quickly snap photos of their work, upload them through the app, and let Uplevl's AI technology transform these uploads into high-quality social media content.

The mobile app handles the entire content creation workflow, from photo capture to AI-generated captions, hashtag suggestions, and automated scheduling. This allows service-based businesses to maintain a consistent, professional social media presence without the time investment typically required for social media management.

## 🚀 How It Works

1. **📱 Quick Content Capture**  
   Business owners open the app, take photos or select from their gallery, and optionally add brief descriptions about their work.

2. **🤖 AI Post Generation**  
   The app sends content to Uplevl's AI engine, which generates engaging captions, suggests relevant hashtags, and creates professional-looking posts in the business's voice.

3. **📋 Review & Approve**  
   Users can preview generated posts, make edits if needed, and approve content for scheduling across their connected social media platforms.

4. **📅 Automated Scheduling**  
   Approved posts are automatically scheduled as drip campaigns, ensuring consistent visibility without manual posting.

5. **📊 Performance Insights**  
   The app provides simple, actionable analytics showing engagement metrics, follower growth, and booking conversions.

## 🎁 Core Features

- **Quick Photo Upload**: Seamless camera integration and gallery access
- **AI Caption Generation**: Smart, voice-consistent captions for every post
- **Hashtag Suggestions**: Relevant, industry-specific hashtag recommendations
- **Batch Content Creation**: Upload multiple photos for drip-fed posting
- **Content Preview**: Review and edit AI-generated posts before publishing
- **Scheduling Dashboard**: Visual timeline of upcoming posts
- **Performance Analytics**: Simple metrics for engagement and growth
- **Social Platform Integration**: Connect and manage Instagram and other platforms
- **Mobile-Optimized UX**: Fast, intuitive interface designed for busy business owners

## 😎 Who It's For

This mobile app is designed for service-based small business owners — such as med spas, barbershops, dentists, repair shops, fitness studios, salons, and many more — who want to grow their online presence but don't have time to manage social media manually.

The app is specifically built for business owners who:

- Work primarily from their mobile devices
- Want to post about their work immediately after completing it
- Need professional-looking content without design skills
- Value speed and simplicity over complex features

## 🧑‍💻 Tech Stack

- **Mobile Framework**: React Native with Expo
- **Runtime**: Bun (for development and scripts)
- **Authentication**: Clerk
- **File Uploads**: UploadThing
- **State Management**: React Context
- **Navigation**: Expo Router (file-based routing)
- **Styling**: React Native StyleSheet with custom theme system
- **Image Handling**: Expo ImagePicker
- **Platform**: Cross-platform (iOS & Android)

## 🚀 Getting Started

1. **Install dependencies**

   ```bash
   bun install
   ```

2. **Start the development server**

   ```bash
   bunx expo start
   ```

3. **Run on device/simulator**

   In the output, you'll find options to open the app in:
   - [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
   - [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
   - [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
   - [Expo Go](https://expo.dev/go) for quick testing

## 📱 Development

This project uses:

- **File-based routing** with Expo Router
- **Bun** as the package manager and runtime
- **TypeScript** for type safety
- **Expo** for cross-platform mobile development

### Key Commands

```bash
# Start development server
bunx expo start

# Run on iOS simulator
bunx expo start --ios

# Run on Android emulator
bunx expo start --android

# Type checking
bun run type-check

# Linting
bun run lint

# Formatting
bun run format
```

### Project Structure

- `app/` - File-based routing with Expo Router
- `components/` - Reusable UI components organized by feature
- `constants/` - App-wide constants and theme configuration
- `contexts/` - React Context providers for state management
- `lib/` - Utility functions, helpers, and custom hooks
- `assets/` - Images, fonts, and static assets

## 🌐 Related

This mobile app is part of the larger Uplevl ecosystem:

- **Web Dashboard**: Advanced analytics and business management
- **AI Agents**: Comment engagement and website assistance
- **Integration Platform**: Social media and booking system connections

## 📝 License

Uplevl Mobile is licensed under the [Business Source License 1.1](../LICENSE).  
You may use the code for non-commercial purposes or internal business use.  
Starting June 13, 2028, the license will convert to Apache 2.0.
