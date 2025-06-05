import { cn } from "@/lib/utils";

interface BiteBaseLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "white" | "gradient";
}

export function BiteBaseLogo({ 
  className, 
  size = "md", 
  variant = "default" 
}: BiteBaseLogoProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  const getColor = () => {
    switch (variant) {
      case "white":
        return "#ffffff";
      case "gradient":
        return "url(#bitebase-gradient)";
      default:
        return "#10B981"; // emerald-500
    }
  };

  return (
    <svg
      viewBox="0 0 100 100"
      className={cn(sizeClasses[size], className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {variant === "gradient" && (
        <defs>
          <linearGradient id="bitebase-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#0D9488" />
          </linearGradient>
        </defs>
      )}
      
      {/* Main vertical bar (left) */}
      <rect
        x="15"
        y="10"
        width="12"
        height="80"
        fill={getColor()}
        rx="2"
      />
      
      {/* Top horizontal bar */}
      <rect
        x="15"
        y="10"
        width="55"
        height="12"
        fill={getColor()}
        rx="2"
      />
      
      {/* Middle horizontal bar */}
      <rect
        x="15"
        y="44"
        width="45"
        height="12"
        fill={getColor()}
        rx="2"
      />
      
      {/* Bottom horizontal bar */}
      <rect
        x="15"
        y="78"
        width="70"
        height="12"
        fill={getColor()}
        rx="2"
      />
      
      {/* Right vertical bar (top) */}
      <rect
        x="58"
        y="10"
        width="12"
        height="46"
        fill={getColor()}
        rx="2"
      />
      
      {/* Right vertical bar (bottom) */}
      <rect
        x="73"
        y="44"
        width="12"
        height="46"
        fill={getColor()}
        rx="2"
      />
    </svg>
  );
}

// Alternative simplified version for very small sizes
export function BiteBaseLogoSimple({ 
  className, 
  size = "md", 
  variant = "default" 
}: BiteBaseLogoProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8",
    xl: "w-10 h-10"
  };

  const getColor = () => {
    switch (variant) {
      case "white":
        return "#ffffff";
      case "gradient":
        return "url(#bitebase-gradient-simple)";
      default:
        return "#10B981";
    }
  };

  return (
    <svg
      viewBox="0 0 24 24"
      className={cn(sizeClasses[size], className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {variant === "gradient" && (
        <defs>
          <linearGradient id="bitebase-gradient-simple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#0D9488" />
          </linearGradient>
        </defs>
      )}
      
      {/* Simplified B shape */}
      <path
        d="M4 2h8a4 4 0 0 1 0 8h-2a4 4 0 0 1 0 8H4V2z M8 2v8h4a2 2 0 1 0 0-4H8z M8 10v8h2a2 2 0 1 0 0-4H8z"
        fill={getColor()}
      />
    </svg>
  );
}