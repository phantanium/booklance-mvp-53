import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Heart, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { formatRupiah } from "@/lib/utils";

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  freelancerName: string;
  freelancerAvatar?: string;
  freelancerLevel: string;
  rating: number;
  reviewCount: number;
  priceFrom: number;
  imageUrl: string;
  tags?: string[];
  isVerified?: boolean;
}

export const ServiceCard = ({
  id,
  title,
  description,
  freelancerName,
  freelancerAvatar,
  freelancerLevel,
  rating,
  reviewCount,
  priceFrom,
  imageUrl,
  tags = [],
  isVerified = false,
}: ServiceCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <Link to={`/services/${id}`} className="block">
        <div className="relative aspect-video overflow-hidden bg-muted">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsFavorited(!isFavorited);
            }}
            className="absolute top-2 right-2 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
          >
            <Heart
              className={`h-4 w-4 ${
                isFavorited ? "fill-red-500 text-red-500" : "text-foreground"
              }`}
            />
          </button>
        </div>
      </Link>

      <CardContent className="p-4">
        <Link to={`/services/${id}`}>
          <div className="flex items-center gap-2 mb-3">
            <Avatar className="h-6 w-6">
              <AvatarImage src={freelancerAvatar} />
              <AvatarFallback>{freelancerName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">{freelancerName}</span>
              {isVerified && (
                <CheckCircle2 className="h-4 w-4 text-cyan-500 fill-cyan-500" />
              )}
            </div>
            <Badge variant="secondary" className="text-xs ml-auto">
              {freelancerLevel}
            </Badge>
          </div>

          <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {description}
          </h3>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </Link>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-sm">{rating.toFixed(1)}</span>
          <span className="text-sm text-muted-foreground">({reviewCount})</span>
        </div>
        <div className="text-right">
          <span className="text-xs text-muted-foreground">Mulai dari</span>
          <p className="font-bold text-lg">{formatRupiah(priceFrom)}</p>
        </div>
      </CardFooter>
    </Card>
  );
};
