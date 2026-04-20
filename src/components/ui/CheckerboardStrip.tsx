const BROWN = "#4B2C20";

type CheckerboardStripProps = {
  className?: string;
  /** Tile size in px (smaller = finer checkerboard, e.g. 10 for header) */
  cellSize?: number;
  heightClass?: string;
};

export default function CheckerboardStrip({
  className = "",
  cellSize = 18,
  heightClass = "h-5",
}: CheckerboardStripProps) {
  return (
    <div
      className={`${heightClass} w-full ${className}`}
      style={{
        background: `repeating-conic-gradient(${BROWN} 0% 25%, #ffffff 0% 50%) 50% / ${cellSize}px ${cellSize}px`,
      }}
      aria-hidden
    />
  );
}
