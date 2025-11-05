import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
}

export default function MetricCard({ title, value, icon: Icon, trend, subtitle }: MetricCardProps) {
  return (
    <Card data-testid={`card-metric-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="mt-2">
            <h3 className="text-3xl font-bold" data-testid={`text-value-${title.toLowerCase().replace(/\s+/g, '-')}`}>
              {value}
            </h3>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </CardHeader>
      {trend && (
        <CardContent>
          <div className="flex items-center gap-1 text-xs">
            <span className={trend.isPositive ? "text-green-600" : "text-red-600"}>
              {trend.isPositive ? "+" : ""}{trend.value}%
            </span>
            <span className="text-muted-foreground">vs mes anterior</span>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
