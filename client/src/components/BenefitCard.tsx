import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Calendar } from "lucide-react";

interface BenefitCardProps {
  title: string;
  description: string;
  points: number;
  validUntil: string;
  commerce: string;
  imageUrl?: string;
}

export default function BenefitCard({ title, description, points, validUntil, commerce, imageUrl }: BenefitCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer" data-testid={`card-benefit-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <Award className="h-16 w-16 text-primary/40" />
        )}
      </div>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{commerce}</p>
          </div>
          <Badge variant="secondary" className="ml-2">
            <Award className="h-3 w-3 mr-1" />
            {points} pts
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>Válido hasta {validUntil}</span>
        </div>
        <Button size="sm" onClick={() => console.log('Benefit clicked:', title)} data-testid="button-view-benefit">
          Ver detalles
        </Button>
      </CardFooter>
    </Card>
  );
}
