import { cn } from "@/lib/utils/cn";

interface MarkProps extends React.SVGAttributes<SVGSVGElement> {
  variant?: "on-light" | "on-dark";
}

export function Mark({ variant = "on-light", className, ...props }: MarkProps) {
  const stroke = variant === "on-dark" ? "#fff" : "#0a0a0a";
  const wheelFill = variant === "on-dark" ? "#fff" : "#0a0a0a";
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Tajir Point"
      className={cn("h-8 w-8", className)}
      {...props}
    >
      <circle cx="78" cy="42" r="6" fill="#00d27a" />
      <circle cx="98" cy="42" r="6" fill="#00d27a" />
      <path d="M158 62 L158 110" stroke={stroke} strokeWidth="11" strokeLinecap="round" fill="none" />
      <path d="M158 62 L42 62" stroke={stroke} strokeWidth="11" strokeLinecap="round" fill="none" />
      <path d="M42 62 Q 22 62 22 96" stroke={stroke} strokeWidth="11" strokeLinecap="round" fill="none" />
      <path
        d="M30 80 Q 30 132 80 134 L130 134 Q 168 132 168 96"
        stroke={stroke}
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M48 100 L150 100" stroke={stroke} strokeWidth="3" strokeLinecap="round" opacity="0.35" />
      <path d="M58 116 L142 116" stroke={stroke} strokeWidth="3" strokeLinecap="round" opacity="0.35" />
      <circle cx="62" cy="160" r="14" fill={wheelFill} />
      <circle cx="62" cy="160" r="5" fill="#00d27a" />
      <circle cx="138" cy="160" r="14" fill={wheelFill} />
      <circle cx="138" cy="160" r="5" fill="#00d27a" />
    </svg>
  );
}
