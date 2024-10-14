require("dotenv").config();

module.exports = {
  scheme: "com.herbyosbourne.apartments",
  extra: {
    GOOGLE_IOS_CLIENT_ID: process.env.GOOGLE_IOS_CLIENT_ID,
    eas: {
      projectId: "05968cf2-083c-45b5-974a-6bcd0cf3b60e",
    },
  },
  ios: {
    supportsTablet: true,
    usesAppleSignIn: true,
    bundleIdentifier: "com.herbyosbourne.apartments",
    config: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY_IOS,
    },
  },
  android: {
    package: "com.herbyosbourne.apartments",
    config: {
      googleMaps: {
        apiKey: process.env.GOOGLE_MAPS_API_KEY,
      },
    },
  },
  plugins: [
    "expo-router",
    "expo-apple-authentication",
    "expo-secure-store",
    [
      "react-native-fbsdk-next",
      {
        appID: process.env.FACEBOOK_APP_ID,
        clientToken: process.env.FACEBOOK_CLIENT_TOKEN,
        displayName: "Apartments Login",
        scheme: `fb${process.env.FACEBOOK_APP_ID}`,
        advertiserIDCollectionEnabled: false,
        autoLogAppEventsEnabled: false,
        isAutoInitEnabled: true,
        iosUserTrackingPermission:
          "This identifier will be used to deliver personalized ads to you.",
      },
    ],
    [
      "expo-tracking-transparency",
      {
        userTrackingPermission:
          "This identifier will be used to deliver personalized ads to you.",
      },
    ],
    [
      "@react-native-google-signin/google-signin",
      {
        iosUrlScheme: `${process.env.GOOGLE_IOS_URL_SCHEME}`,
      },
    ],
  ],
};
