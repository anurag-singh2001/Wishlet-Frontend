import { Capacitor } from "@capacitor/core";

/** True inside the Android app (Capacitor WebView). */
export function isNative(): boolean {
  return Capacitor.isNativePlatform();
}

/** Opens the system share sheet with text and a link. */
export async function shareTextNative({ text, url }: { text: string; url: string }): Promise<void> {
  const { Share } = await import("@capacitor/share");
  await Share.share({ text, url });
}

/** Writes base64 data to the app cache and returns its file URI. */
export async function writeCacheFile(base64: string, fileName: string): Promise<string> {
  const { Filesystem, Directory } = await import("@capacitor/filesystem");
  const { uri } = await Filesystem.writeFile({
    path: fileName,
    data: base64,
    directory: Directory.Cache,
  });
  return uri;
}

/** Writes a file to the cache and opens the system share sheet with it. */
export async function shareFileNative(base64: string, fileName: string): Promise<void> {
  const uri = await writeCacheFile(base64, fileName);
  const { Share } = await import("@capacitor/share");
  await Share.share({ files: [uri] });
}
