
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

export function FeatureCard({ title, description, icon: Icon, className }: FeatureCardProps) {
  return (
    <Card className={cn("card-hover border border-border/50", className)}>
      <CardHeader className="pb-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-bitebase-green-100">
          <Icon className="h-6 w-6 text-bitebase-green-600" />
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}
