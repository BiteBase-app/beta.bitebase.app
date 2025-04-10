
import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Layers, Filter, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapMetric } from "./types";
import MapMetricsDisplay from "./MapMetricsDisplay";

// Set the Mapbox token - in production, this should come from environment variables
const MAPBOX_TOKEN = "pk.eyJ1Ijoia2hpd25pdGkiLCJhIjoiY203cm1oaWtyMWI4ejJpcHVuN2U2bHB6MiJ9.w9KWAvFEvF7bCdX-8Povkg";

interface MapContainerProps {
  formData: any;
  metrics: MapMetric[];
}

const MapContainer = ({ formData, metrics }: MapContainerProps) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    
    // Initialize the map
    mapboxgl.accessToken = MAPBOX_TOKEN;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-73.9857, 40.7484], // Default to NYC
      zoom: 12
    });
    
    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true
    }), 'top-right');
    
    // Add a marker for the restaurant location if address is provided
    if (formData.streetAddress && formData.city) {
      // In production, use a geocoding API here
      // For now we'll use a placeholder marker
      new mapboxgl.Marker()
        .setLngLat([-73.9857, 40.7484])
        .addTo(map);
    }
    
    mapRef.current = map;
    
    return () => {
      map.remove();
    };
  }, [formData.streetAddress, formData.city]);

  return (
    <div className="md:col-span-3 relative">
      <div className="w-full h-full rounded-lg overflow-hidden border border-border shadow-md">
        <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
        
        {/* Map Controls */}
        <div className="absolute top-4 left-4 z-10">
          <Card className="shadow-md border border-border">
            <CardContent className="p-3 flex gap-2 flex-wrap">
              <Button variant="outline" size="sm">
                <Layers className="h-4 w-4 mr-1" />
                Layers
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Ruler className="h-4 w-4 mr-1" />
                Measure
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Floating Metrics */}
        <MapMetricsDisplay metrics={metrics} />
      </div>
    </div>
  );
};

export default MapContainer;
