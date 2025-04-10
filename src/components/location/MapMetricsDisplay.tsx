
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapMetric } from "./types";

interface MapMetricsDisplayProps {
  metrics: MapMetric[];
}

const MapMetricsDisplay = ({ metrics }: MapMetricsDisplayProps) => {
  return (
    <div className="absolute bottom-4 left-4 right-4 z-10 flex gap-3 overflow-x-auto pb-2">
      {metrics.map((metric) => (
        <Card key={metric.id} className="min-w-[150px] max-w-[200px] flex-shrink-0 shadow-md border border-border">
          <CardContent className="p-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium">{metric.title}</p>
                <p className="text-xl font-bold">{metric.value || "—"}</p>
              </div>
              <div className="mt-1">{metric.icon}</div>
            </div>
            {metric.change !== null && (
              <div className={`text-xs mt-1 ${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change >= 0 ? `+${metric.change}%` : `${metric.change}%`} vs. avg
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MapMetricsDisplay;
