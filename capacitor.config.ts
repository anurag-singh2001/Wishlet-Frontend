import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.wishlet.app",
  appName: "Wishlet",
  webDir: "mobile-shell",
  server: {
    // The live frontend, opened at the app home. Change it here and push to rebuild the APK.
    url: "https://wishlet-frontend.vercel.app/app",
    // Shown (from webDir) when the site cannot be reached.
    errorPath: "index.html",
  },
  android: { allowMixedContent: false, appendUserAgent: "WishletApp" },
  plugins: {
    SplashScreen: { launchAutoHide: false, backgroundColor: "#4F46E5", showSpinner: false },
    StatusBar: { style: "LIGHT", backgroundColor: "#4F46E5", overlaysWebView: false },
  },
};

export default config;
