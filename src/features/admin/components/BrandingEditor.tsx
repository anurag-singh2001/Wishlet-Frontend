"use client";

import React, { useState } from "react";
import { Button, Field, Input } from "@/components/ui";
import type { Branding } from "@/features/site-config/types";
import { useSaveBranding } from "../hooks/use-admin";
import { blankToNull } from "../lib/catalog";
import { BrandingPreview } from "./BrandingPreview";
import { LogoUpload } from "./LogoUpload";
import { Notice, type NoticeState } from "./Notice";
import { Toggle } from "./Toggle";

const COLOR_FIELDS = [
  ["primary", "Primary color"],
  ["accent", "Accent color"],
  ["bg", "Background color"],
] as const;

export function BrandingEditor({ initial }: { initial: Branding }): React.ReactElement {
  const [b, setB] = useState<Branding>(initial);
  const [notice, setNotice] = useState<NoticeState | null>(null);
  const save = useSaveBranding();

  const patch = (p: Partial<Branding>): void => setB((prev) => ({ ...prev, ...p }));

  const onSave = (): void => {
    setNotice(null);
    save.mutate(b, {
      onSuccess: () =>
        setNotice({ tone: "success", text: "Saved. Reload to see colors site-wide." }),
      onError: (e) => setNotice({ tone: "error", text: e.message }),
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <Field id="br-name" label="App name">
        <Input
          id="br-name"
          value={b.appName}
          maxLength={40}
          onChange={(e) => patch({ appName: e.target.value })}
        />
      </Field>
      <LogoUpload
        logoUrl={b.logoUrl}
        appName={b.appName}
        onChange={(logoUrl, logoPublicId) => patch({ logoUrl, logoPublicId })}
      />
      <Field id="br-fav" label="Favicon URL" hint="Leave empty for the default icon.">
        <Input
          id="br-fav"
          type="url"
          hasHint
          value={b.faviconUrl ?? ""}
          onChange={(e) => patch({ faviconUrl: blankToNull(e.target.value) })}
        />
      </Field>
      <div className="grid grid-cols-3 gap-3">
        {COLOR_FIELDS.map(([key, label]) => (
          <Field key={key} id={`br-${key}`} label={label}>
            <Input
              id={`br-${key}`}
              type="color"
              className="p-1"
              value={b.colors[key]}
              onChange={(e) => patch({ colors: { ...b.colors, [key]: e.target.value } })}
            />
          </Field>
        ))}
      </div>
      <BrandingPreview branding={b} />
      <fieldset className="flex flex-col gap-3 rounded-card border border-hairline p-4">
        <legend className="px-1 text-sm font-bold text-ink">Announcement banner</legend>
        <Toggle
          label="Show banner"
          checked={b.banner.enabled}
          onChange={(enabled) => patch({ banner: { ...b.banner, enabled } })}
        />
        <Field id="br-btext" label="Text">
          <Input
            id="br-btext"
            maxLength={140}
            value={b.banner.text}
            onChange={(e) => patch({ banner: { ...b.banner, text: e.target.value } })}
          />
        </Field>
        <Field id="br-blink" label="Link (optional)">
          <Input
            id="br-blink"
            type="url"
            value={b.banner.link ?? ""}
            onChange={(e) => patch({ banner: { ...b.banner, link: blankToNull(e.target.value) } })}
          />
        </Field>
      </fieldset>
      <Field id="br-feedback" label="Feedback URL" hint="Leave empty for the default form.">
        <Input
          id="br-feedback"
          type="url"
          hasHint
          value={b.feedbackUrl ?? ""}
          onChange={(e) => patch({ feedbackUrl: blankToNull(e.target.value) })}
        />
      </Field>
      <div className="sticky bottom-0 flex items-center gap-3 bg-ground py-3">
        <Button loading={save.isPending} onClick={onSave}>
          Save
        </Button>
        <Notice notice={notice} />
      </div>
    </div>
  );
}
