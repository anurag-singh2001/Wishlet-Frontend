# Wishlet Android (Capacitor, remote-URL mode)

The app is a WebView that loads the production site (`server.url` in `capacitor.config.ts`, currently https://wishlet-frontend.vercel.app); `mobile-shell/` is only
the offline fallback. Web deploys to `main` show up in the app on next launch, no new APK needed.
A new APK is only needed when native things change (plugin, icon/splash, Capacitor version,
`capacitor.config.ts`, `android/`); GitHub Actions (`android.yml`) builds it on those pushes.

## One-time GitHub setup (repo Settings > Secrets and variables > Actions)
1. Site URL: edit `server.url` in `capacitor.config.ts` (no GitHub variable needed).
2. Create a release keystore (keep it OUTSIDE the repo):
   `keytool -genkeypair -v -keystore wishlet-release.jks -alias wishlet -keyalg RSA -keysize 2048 -validity 10000`
3. Base64 it (PowerShell): `[Convert]::ToBase64String([IO.File]::ReadAllBytes("wishlet-release.jks"))`
4. Secrets: `ANDROID_KEYSTORE_BASE64` (step 3 output), `ANDROID_KEYSTORE_PASSWORD`,
   `ANDROID_KEY_ALIAS` (`wishlet`), `ANDROID_KEY_PASSWORD`.

BACK UP the `.jks` and its passwords. If lost, users must uninstall the app to get updates.

## Build and download
Actions > "Android APK" > Run workflow (or push a native change to `main`).
Download: https://github.com/anurag-singh2001/Wishlet-Frontend/releases/tag/app-latest

Local: `npx cap sync android`, then open in Android Studio
(JDK 21). Without the signing env vars, release builds use the debug key.
