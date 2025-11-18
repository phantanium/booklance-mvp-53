import { Star } from "lucide-react";

interface RatingBadgeProps {
  rating: number;
  count?: number;
  size?: "sm" | "md" | "lg";
}

export const RatingBadge = ({ rating, count, size = "md" }: RatingBadgeProps) => {
  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const iconSize = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <div className={`flex items-center gap-1 ${sizeClasses[size]}`}>
      <Star className={`${iconSize[size]} fill-yellow-400 text-yellow-400`} />
      <span className="font-medium">{rating.toFixed(1)}</span>
      {count !== undefined && (
        <span className="text-muted-foreground">({count})</span>
      )}
    </div>
  );
};
