import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.wishlet.app",
  appName: "Wishlet",
  webDir: "mobile-shell",
  server: {
    // The live frontend. Single source of truth for the app; change it here and push to rebuild the APK.
    url: "https://wishlet-frontend.vercel.app",
  },
  android: { allowMixedContent: false, appendUserAgent: "WishletApp" },
};

export default config;
