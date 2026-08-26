type OrnamentalDividerProps = {
  className?: string;
};

export function OrnamentalDivider({ className = "" }: OrnamentalDividerProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="ornamental-divider flex-1" />
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="text-accent-500 opacity-70"
        aria-hidden
      >
        <path
          d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z"
          fill="currentColor"
        />
      </svg>
      <div className="ornamental-divider flex-1" />
    </div>
  );
}
