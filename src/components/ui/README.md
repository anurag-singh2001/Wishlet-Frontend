# UI kit (`@/components/ui`)

Import from the barrel: `import { Button, Field, Input } from "@/components/ui";`

## Tokens (Tailwind classes, defined in `src/app/globals.css`)
- Colours: `brand` (+`-hover`, `-deep`, `-soft`), `violet`, `party`, `sunshine`, `ink`, `muted`,
  `ground`, `hairline`, `surface`, `danger`, `danger-border`, `success`
  (e.g. `bg-brand`, `text-muted`, `border-hairline`).
- Radii: `rounded-control` (14px), `rounded-card` (24px), `rounded-phone` (20px), `rounded-full`.
- Fonts: `font-display` (Bricolage, headings 700-800), `font-sans` (Manrope, body default).
- Breakpoint `xs:` = 400px. Utilities: `scrollbar-hide`, `animate-fade-in`, `safe-top`,
  `safe-bottom`. Body is ground bg + ink text. No dark mode.

## Components
- `Button` - `variant` primary|secondary|ghost|danger, `size` sm(44 min)|md(52)|lg(56),
  `href` (renders next/link), `loading`, `fullWidth`.
  `<Button href="/build" size="lg" fullWidth>Create a wish</Button>`
- `Field` - `id`, `label`, `hint?`, `error?`, wraps a control. `Input`/`Textarea` take the same
  `id`, `error?`, `hasHint?` (wires aria-invalid/aria-describedby; red border on error).
  ```tsx
  <Field id="to" label="To" error={errors.to}>
    <Input id="to" error={errors.to} value={to} onChange={...} />
  </Field>
  ```
- `Card` - `as` div|article|section|li; add padding/gap via `className`.
- `Logo` - `size` (px, default 32), `wordmark` (default true).
- `Sheet` - `open`, `onClose`, `title`, children. Bottom sheet on phones, dialog at 640px+.
  Esc/scrim close, focus moved in, body scroll locked.
- `Badge` - `tone` brand|neutral|party. `<Badge>12 views</Badge>`,
  `<Badge tone="neutral">Not opened</Badge>`.
- `Skeleton` - sized via className: `<Skeleton className="h-24 w-full" />`.
- Toast - `ToastProvider` is already mounted in the root layout.
  `const toast = useToast(); toast("Link copied");` (dark pill, 2.5s, role=status).
