@AGENTS.md

# Frontend (Next.js App Router)

- Pages: `src/app/` (`/` landing, `/w/[slug]` public viewer + OG image). Keep pages thin; logic goes in features.
- Features: `src/features/{landing,builder,viewer,templates}/` with `components/` and `types/` inside each.
- Shared: `src/components/` (providers, GA), `src/lib/` (`utils.ts` has `cn()`, `analytics.ts` has GA4 events).
- Server state: TanStack Query. Local UI state: React state. No global store.
- Imports use the `@/` alias for `src/`.

## Templates (plugins)

- Each template is one file in `src/features/templates/templates/<id>.tsx` with a default export taking `TemplateProps` (`src/features/templates/types/index.ts`).
- Register it in `src/features/templates/registry/index.ts` with `lazy(() => import(...))`.
- Reuse `components/animations/` (AmbientGlow, FloatingParticles) and `WishletBranding`.
- Use `/new-template` to add one.

## Next.js 16 note

APIs differ from older versions (async `params`, etc.). When unsure, grep `node_modules/next/dist/docs/` for the specific API instead of guessing.
