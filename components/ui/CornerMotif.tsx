type CornerMotifProps = {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
};

export function CornerMotif({
  position = "top-left",
  className = "",
}: CornerMotifProps) {
  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4 rotate-90",
    "bottom-left": "bottom-4 left-4 -rotate-90",
    "bottom-right": "bottom-4 right-4 rotate-180",
  };

  return (
    <svg
      className={`pointer-events-none absolute h-16 w-16 text-accent-500 opacity-20 md:h-24 md:w-24 ${positionClasses[position]} ${className}`}
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden
    >
      <path
        d="M0 0C20 0 40 5 60 20C75 35 80 55 80 80"
        stroke="currentColor"
        strokeWidth="0.75"
      />
      <path
        d="M0 20C15 20 30 25 45 35C55 45 60 60 60 80"
        stroke="currentColor"
        strokeWidth="0.5"
      />
      <circle cx="8" cy="8" r="2" fill="currentColor" opacity="0.5" />
      <path
        d="M15 5C18 8 20 12 18 16"
        stroke="currentColor"
        strokeWidth="0.5"
      />
    </svg>
  );
}
