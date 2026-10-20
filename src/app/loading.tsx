import { Logo } from "@/components/ui";

export default function Loading(): React.JSX.Element {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="flex min-h-[100dvh] items-center justify-center bg-ground"
    >
      <div className="motion-safe:animate-pulse">
        <Logo size={48} wordmark={false} />
      </div>
    </div>
  );
}
