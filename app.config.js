module.exports = {
  scheme: "com.herbyosbourne.apartments",
  extra: {
    fact: "kittens are cool",
  },
  ios: {
    supportsTablet: true,
    usesAppleSignIn: true,
    bundleIdentifier: "com.herbyosbourne.apartments",
  },
  android: {
    package: "com.herbyosbourne.apartments",
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
  ],
};