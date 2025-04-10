
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { TierRestriction } from "@/components/TierRestriction";
import mapboxgl from "mapbox-gl";
import { Search, MapPin, Layers, Filter, Ruler, Building, Users, DollarSign, TrendingUp, ShoppingBag } from "lucide-react";
import "mapbox-gl/dist/mapbox-gl.css";

// Set the Mapbox token - in production, this should come from environment variables
const MAPBOX_TOKEN = "pk.eyJ1Ijoia2hpd25pdGkiLCJhIjoiY203cm1oaWtyMWI4ejJpcHVuN2U2bHB6MiJ9.w9KWAvFEvF7bCdX-8Povkg";

interface MapMetric {
  id: string;
  title: string;
  value: string | null;
  change: number | null;
  icon: React.ReactNode;
}

const LocationMap = () => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [location, setLocation] = useState("");
  const [radius, setRadius] = useState([1]); // km
  const [cuisine, setCuisine] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [viewState, setViewState] = useState({
    longitude: -73.9857,
    latitude: 40.7484,
    zoom: 12
  });
  const [metrics, setMetrics] = useState<MapMetric[]>([
    {
      id: "foot-traffic",
      title: "Foot Traffic",
      value: null,
      change: null,
      icon: <Users className="h-5 w-5 text-muted-foreground" />
    },
    {
      id: "competition",
      title: "Competition",
      value: null,
      change: null,
      icon: <Building className="h-5 w-5 text-muted-foreground" />
    },
    {
      id: "rent-avg",
      title: "Avg. Rent",
      value: null,
      change: null,
      icon: <DollarSign className="h-5 w-5 text-muted-foreground" />
    },
    {
      id: "growth",
      title: "Market Growth",
      value: null,
      change: null,
      icon: <TrendingUp className="h-5 w-5 text-muted-foreground" />
    },
    {
      id: "demand",
      title: "Cuisine Demand",
      value: null,
      change: null,
      icon: <ShoppingBag className="h-5 w-5 text-muted-foreground" />
    },
  ]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize the map
    mapboxgl.accessToken = MAPBOX_TOKEN;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [viewState.longitude, viewState.latitude],
      zoom: viewState.zoom
    });

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true
    }), 'top-right');

    mapRef.current = map;

    return () => {
      map.remove();
    };
  }, []);

  const startAnalysis = async () => {
    if (!location) return;

    setIsAnalyzing(true);

    try {
      // In production, this would be an API call to analyze location
      console.log("Starting analysis for:", { location, radius: radius[0], cuisine });

      // In production, replace with real API call
      // const response = await fetch('/api/analyze-location', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ location, radius: radius[0], cuisine })
      // });
      // const data = await response.json();

      // For now, set placeholder "loading" state
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: "Awaiting data",
        change: null
      })));

    } catch (error) {
      console.error("Analysis error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full h-[700px]">
      {/* Left Sidebar - Analysis Controls */}
      <div className="md:col-span-1 p-4 space-y-6 border border-border rounded-lg shadow-md bg-card">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Location Analysis</h3>
          <p className="text-sm text-muted-foreground">Configure parameters for your market analysis.</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                placeholder="Enter address or area"
                className="pl-8"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="radius">Search Radius</Label>
              <span className="text-sm text-muted-foreground">{radius[0]} km</span>
            </div>
            <Slider
              id="radius"
              min={0.5}
              max={5}
              step={0.5}
              value={radius}
              onValueChange={setRadius}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cuisine">Cuisine Type</Label>
            <Input
              id="cuisine"
              placeholder="e.g. Italian, Thai"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
            />
          </div>

          <Button
            className="w-full"
            onClick={startAnalysis}
            disabled={isAnalyzing || !location}
          >
            {isAnalyzing ? "Analyzing..." : "Start Analysis"}
          </Button>
        </div>

        <Separator />

        <div className="space-y-3">
          <h4 className="text-sm font-medium">Advanced Analysis</h4>
          <Button variant="outline" className="w-full flex items-center justify-start">
            <Users className="mr-2 h-4 w-4" />
            <span>Demographics Analysis</span>
          </Button>

          <Button variant="outline" className="w-full flex items-center justify-start">
            <TrendingUp className="mr-2 h-4 w-4" />
            <span>Competitive Analysis</span>
          </Button>
        </div>
      </div>

      {/* Main content - Map and visualization */}
      <div className="md:col-span-3 relative">
        {/* Map Container */}
        <div className="w-full h-full rounded-lg overflow-hidden border border-border shadow-md">
          <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />

          {/* Map Controls */}
          <div className="absolute top-4 left-4 z-10">
            <Card className="w-full max-w-xs shadow-md border border-border">
              <CardHeader className="p-3">
                <CardTitle className="text-base">Map Controls</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0 flex gap-2 flex-wrap">
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
        </div>
      </div>
    </div>
  );
};

export default LocationMap;
