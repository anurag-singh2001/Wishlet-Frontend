import { Button, Logo } from "@/components/ui";

export default function NotFound(): React.JSX.Element {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 bg-ground p-6 text-center">
      <Logo size={48} wordmark={false} />
      <h1 className="font-display text-2xl font-extrabold text-ink">This page isn&apos;t here</h1>
      <p className="max-w-sm text-muted">The link may be mistyped or the page was removed.</p>
      <Button href="/" size="lg">
        Back to Wishlet
      </Button>
    </main>
  );
}
