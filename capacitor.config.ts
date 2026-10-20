import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.wishlet.app",
  appName: "Wishlet",
  webDir: "mobile-shell",
  server: {
    // Set CAP_SERVER_URL to the production site URL before `npx cap sync android`.
    url: process.env.CAP_SERVER_URL ?? "https://YOUR-PRODUCTION-URL",
  },
  android: { allowMixedContent: false, appendUserAgent: "WishletApp" },
};

export default config;
