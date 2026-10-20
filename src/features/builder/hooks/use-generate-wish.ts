import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createWish } from "@/lib/api";
import { saveWishToken } from "@/lib/wish-tokens";
import { trackWishCreated } from "@/lib/analytics";
import type { BuilderState } from "../types";

interface Created {
  url: string;
  slug: string;
}

export function useGenerateWish(onCreated: (created: Created) => void) {
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: (payload: BuilderState) => {
      setError("");
      return createWish(payload);
    },
    onSuccess: (data, variables) => {
      saveWishToken(data.slug, data.deleteToken, {
        recipientName: variables.recipientName.trim(),
        occasion: variables.occasion,
        templateId: variables.templateId,
      });
      onCreated({ url: data.url, slug: data.slug });
      trackWishCreated({ occasion: variables.occasion, template: variables.templateId });
    },
    onError: (err) => {
      setError(err.message || "An error occurred while creating your Wishlet.");
    },
  });

  return { generate: mutation.mutate, isPending: mutation.isPending, error };
}
