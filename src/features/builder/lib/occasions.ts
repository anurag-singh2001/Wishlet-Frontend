import { templateRegistry } from "@/features/templates/registry";
import type { ApiTemplate } from "../types";

export interface OccasionInfo {
  id: string;
  label: string;
  tint: string;
}

export const OCCASIONS: OccasionInfo[] = [
  { id: "birthday", label: "Birthday", tint: "#FFF1EC" },
  { id: "anniversary", label: "Anniversary", tint: "#FDEBF3" },
  { id: "thank-you", label: "Thank you", tint: "#EAF7EF" },
  { id: "congratulations", label: "Congratulations", tint: "#FFF6DC" },
  { id: "sorry", label: "Sorry", tint: "#ECEFFB" },
];

export function occasionLabel(id: string | undefined): string {
  return OCCASIONS.find((o) => o.id === id)?.label ?? "";
}

/** Local fallback so the gallery works even if the templates API is down. */
export const DEFAULT_TEMPLATES: ApiTemplate[] = Object.values(templateRegistry).map((t) => ({
  id: t.id,
  name: t.name,
  occasion: t.occasion,
  description: t.description,
}));

export function templatesFor(templates: ApiTemplate[], occasion: string): ApiTemplate[] {
  return templates.filter((t) => t.occasion === occasion && templateRegistry[t.id]);
}

export function templateName(id: string | undefined): string {
  return (id && templateRegistry[id]?.name) || "";
}
