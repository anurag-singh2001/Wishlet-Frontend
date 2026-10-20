"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import { TemplateRenderer } from "./TemplateRenderer";

/** Full-screen template render for iframes (see TemplateFrame). No chrome, no tracking. */
export function PreviewClient(): React.JSX.Element {
  const sp = useSearchParams();
  const photo = sp.get("photo");
  return (
    <TemplateRenderer
      templateId={sp.get("t") ?? ""}
      props={{
        recipientName: sp.get("to") ?? "",
        senderName: sp.get("from") ?? "",
        message: sp.get("msg") ?? "",
        occasion: sp.get("occasion") ?? "birthday",
        photos: photo ? [photo] : [],
        content: {},
        autoOpen: true,
      }}
    />
  );
}
