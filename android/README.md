# Wishlet Android (Capacitor, remote-URL mode)

The app is a WebView that loads the production site; `mobile-shell/` is only the offline fallback.

1. Set the site URL: `CAP_SERVER_URL=https://your-site.com` (shell env) before syncing.
2. Put your Facebook App ID in `app/src/main/res/values/strings.xml` (`facebook_app_id`; free app
   at developers.facebook.com, no review needed).
3. From the frontend root: `npx cap sync android && npx cap open android`.
4. Run from Android Studio (JDK 21) on a real phone with Instagram installed. Without Instagram
   the share falls back to the system share sheet.

Kotlin is enabled for `InstagramStoriesPlugin.kt` (registered in `MainActivity.java`).
`app/build/` and generated assets are git-ignored.
