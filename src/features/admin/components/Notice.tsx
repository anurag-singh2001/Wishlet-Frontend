import React from "react";

export interface NoticeState {
  tone: "success" | "error";
  text: string;
}

export function Notice({ notice }: { notice: NoticeState | null }): React.ReactElement | null {
  if (!notice) return null;
  return (
    <p
      role={notice.tone === "error" ? "alert" : "status"}
      className={`text-sm font-semibold ${notice.tone === "error" ? "text-danger" : "text-success"}`}
    >
      {notice.text}
    </p>
  );
}
