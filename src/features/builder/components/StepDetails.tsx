import React from "react";
import { Field, Input, Textarea } from "@/components/ui";
import { usePhotoUpload } from "../hooks/use-photo-upload";
import { MESSAGE_MAX, type DetailErrors } from "../lib/validation";
import { useVoiceRecorder } from "../hooks/use-voice-recorder";
import { MessageSuggestions } from "./MessageSuggestions";
import { PhotoField } from "./PhotoField";
import { ReactionsToggle } from "./ReactionsToggle";
import { VoiceField } from "./VoiceField";
import type { BuilderState } from "../types";

interface StepDetailsProps {
  state: BuilderState;
  errors: DetailErrors;
  update: (updates: Partial<BuilderState>) => void;
  onUploadingChange: (uploading: boolean) => void;
}

export function StepDetails({
  state,
  errors,
  update,
  onUploadingChange,
}: StepDetailsProps): React.ReactElement {
  const { isUploading, uploadError, handleUpload, removePhoto } = usePhotoUpload(update);
  const voice = useVoiceRecorder(update);
  const busy = isUploading || voice.busy;
  React.useEffect(() => onUploadingChange(busy), [busy, onUploadingChange]);

  return (
    <div className="flex flex-col gap-3.5">
      <h1 className="font-display text-[28px] font-extrabold text-ink">Make it personal</h1>
      <Field id="b-to" label="Who is it for?" error={errors.recipientName}>
        <Input
          id="b-to"
          value={state.recipientName}
          error={errors.recipientName}
          maxLength={60}
          autoComplete="off"
          placeholder="e.g. Priya"
          onChange={(e) => update({ recipientName: e.target.value })}
        />
      </Field>
      <Field id="b-msg" label="Your message" error={errors.message}>
        <Textarea
          id="b-msg"
          rows={4}
          value={state.message}
          error={errors.message}
          placeholder="Write something nice..."
          onChange={(e) => update({ message: e.target.value })}
        />
        <span className="self-end text-[13px] text-[#4B4766]">
          {state.message.length} / {MESSAGE_MAX}
        </span>
      </Field>
      <MessageSuggestions
        occasion={state.occasion}
        message={state.message}
        onPick={(text) => update({ message: text })}
      />
      <Field id="b-from" label="From" error={errors.senderName}>
        <Input
          id="b-from"
          value={state.senderName}
          error={errors.senderName}
          maxLength={60}
          autoComplete="given-name"
          placeholder="Your name"
          onChange={(e) => update({ senderName: e.target.value })}
        />
      </Field>
      <PhotoField
        photoUrl={state.photos[0]}
        isUploading={isUploading}
        error={uploadError}
        onUpload={handleUpload}
        onRemove={removePhoto}
      />
      <VoiceField recorder={voice} />
      <ReactionsToggle
        enabled={state.reactionsEnabled ?? true}
        onChange={(reactionsEnabled) => update({ reactionsEnabled })}
      />
      <p className="text-center text-[13px] text-[#4B4766]">Your link works for 24 hours.</p>
    </div>
  );
}
