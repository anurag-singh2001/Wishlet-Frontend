const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.45  0 0 0 0 0.3  0 0 0 0 0.15  0 0 0 0.35 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

/** Warm paper: cream base, soft vignette, fine grain. No images. */
export function Paper(): React.JSX.Element {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 35%, #fffaf0 0%, #fbf0dc 60%, #f1e0c0 100%)",
        }}
      />
      <div className="absolute inset-0 opacity-50" style={{ backgroundImage: GRAIN }} />
    </div>
  );
}
