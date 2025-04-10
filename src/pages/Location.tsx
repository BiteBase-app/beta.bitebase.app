import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Building, Target, TrendingUp, Users, MapPin, DollarSign, Clock, Car, ShoppingBag, Utensils, Home, Briefcase, School, Bus } from "lucide-react";
import LocationMap from "@/components/LocationMap";
import LocationFeatures from "@/components/LocationFeatures";

const Location = () => {
  const locationFeatures = [
    {
      name: "Foot Traffic",
      value: "18.2K",
      icon: <Users className="h-4 w-4" />,
      description: "Weekly average pedestrians",
      score: 82,
    },
    {
      name: "Parking Availability",
      value: "High",
      icon: <Car className="h-4 w-4" />,
      description: "Public parking within 500ft",
      score: 90,
    },
    {
      name: "Public Transportation",
      value: "3 Lines",
      icon: <Bus className="h-4 w-4" />,
      description: "Bus and subway access",
      score: 75,
    },
    {
      name: "Residential Density",
      value: "12,400",
      icon: <Home className="h-4 w-4" />,
      description: "Residents within 1 mile",
      score: 68,
      tier: "pro" as "pro"
    },
    {
      name: "Business District",
      value: "4,200",
      icon: <Briefcase className="h-4 w-4" />,
      description: "Office workers within 0.5 miles",
      score: 85,
      tier: "pro" as "pro"
    },
    {
      name: "Competitor Analysis",
      value: "Detailed",
      icon: <Building className="h-4 w-4" />,
      description: "Full competitive landscape",
      score: 92,
      tier: "enterprise" as "enterprise"
    }
  ];

  return (
    <DashboardLayout>
      <div className="container py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Location Intelligence</h1>
            <p className="text-muted-foreground">Analyze and optimize your restaurant locations</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button variant="outline">
              Export Data
            </Button>
            <Button>
              New Analysis
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="map" className="mt-8">
          <TabsList className="mb-4">
            <TabsTrigger value="map">Interactive Map</TabsTrigger>
            <TabsTrigger value="analysis">Competitive Analysis</TabsTrigger>
            <TabsTrigger value="features">Features Overview</TabsTrigger>
          </TabsList>
          
          <TabsContent value="map" className="mt-0">
            <Card className="mb-6 shadow-md border border-border">
              <CardHeader>
                <CardTitle>Location Analysis</CardTitle>
                <CardDescription>
                  Interactive map to explore your restaurant's location potential
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LocationMap />
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card className="shadow-md border border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Foot Traffic</p>
                      <h3 className="text-3xl font-bold mt-1">18.2K</h3>
                      <p className="text-sm mt-2 text-muted-foreground">Weekly average</p>
                    </div>
                    <div className="h-12 w-12 bg-bitebase-green-100 rounded-lg flex items-center justify-center text-bitebase-green-600">
                      <Users className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-md border border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Direct Competitors</p>
                      <h3 className="text-3xl font-bold mt-1">5</h3>
                      <p className="text-sm mt-2 text-muted-foreground">Within 1 mile radius</p>
                    </div>
                    <div className="h-12 w-12 bg-bitebase-green-100 rounded-lg flex items-center justify-center text-bitebase-green-600">
                      <Building className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-md border border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Target Demographics</p>
                      <h3 className="text-3xl font-bold mt-1">72%</h3>
                      <p className="text-sm mt-2 text-muted-foreground">Match to ideal customers</p>
                    </div>
                    <div className="h-12 w-12 bg-bitebase-green-100 rounded-lg flex items-center justify-center text-bitebase-green-600">
                      <Target className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-md border border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Growth Potential</p>
                      <h3 className="text-3xl font-bold mt-1">High</h3>
                      <p className="text-sm mt-2 text-muted-foreground">Based on market trends</p>
                    </div>
                    <div className="h-12 w-12 bg-bitebase-green-100 rounded-lg flex items-center justify-center text-bitebase-green-600">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-md border border-border">
                <CardHeader>
                  <CardTitle>Foot Traffic Analysis</CardTitle>
                  <CardDescription>
                    Hourly and daily patterns around your location
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Hourly Traffic Pattern</h4>
                      <div className="h-48 flex items-end space-x-1">
                        {[6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map((hour) => {
                          const height = hour < 12 ? 
                                         20 + (hour - 6) * 10 : 
                                         hour === 12 ? 80 : 
                                         hour < 18 ? 60 - (hour - 13) * 5 : 
                                         hour < 21 ? 60 + (hour - 18) * 10 : 
                                         90 - (hour - 21) * 30;
                          
                          return (
                            <div key={hour} className="flex flex-col items-center flex-1">
                              <div 
                                className="w-full bg-bitebase-green-500 rounded-t-sm" 
                                style={{ 
                                  height: `${height}%`, 
                                  opacity: 0.2 + (height / 125),
                                  backgroundColor: (hour >= 11 && hour <= 14) || (hour >= 18 && hour <= 21) ? '#4CAF50' : undefined
                                }}
                              ></div>
                              <span className="text-xs text-muted-foreground mt-2">
                                {hour > 12 ? `${hour-12}pm` : hour === 12 ? '12pm' : `${hour}am`}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Weekly Pattern</h4>
                      <div className="grid grid-cols-7 gap-2 h-24 items-end">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                          const heights = [60, 50, 55, 65, 85, 100, 80];
                          return (
                            <div key={day} className="flex flex-col items-center">
                              <div 
                                className="w-full bg-bitebase-green-400 rounded-t-sm" 
                                style={{ 
                                  height: `${heights[index]}%`,
                                  backgroundColor: index >= 4 ? '#4CAF50' : undefined
                                }}
                              ></div>
                              <span className="text-xs text-muted-foreground mt-2">{day}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-md border border-border">
                <CardHeader>
                  <CardTitle>Demographic Insights</CardTitle>
                  <CardDescription>
                    Key demographic data for your location
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Age Distribution</h4>
                      <div className="grid grid-cols-5 gap-2 h-32 items-end">
                        <div className="flex flex-col items-center">
                          <div className="w-full bg-bitebase-green-300 rounded-t-sm" style={{ height: "30%" }}></div>
                          <span className="text-xs text-muted-foreground mt-2">18-24</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-full bg-bitebase-green-400 rounded-t-sm" style={{ height: "75%" }}></div>
                          <span className="text-xs text-muted-foreground mt-2">25-34</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-full bg-bitebase-green-500 rounded-t-sm" style={{ height: "90%" }}></div>
                          <span className="text-xs text-muted-foreground mt-2">35-44</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-full bg-bitebase-green-400 rounded-t-sm" style={{ height: "60%" }}></div>
                          <span className="text-xs text-muted-foreground mt-2">45-54</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-full bg-bitebase-green-300 rounded-t-sm" style={{ height: "25%" }}></div>
                          <span className="text-xs text-muted-foreground mt-2">55+</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Income Distribution</h4>
                      <div className="grid grid-cols-4 gap-2 h-24 items-end">
                        <div className="flex flex-col items-center">
                          <div className="w-full bg-bitebase-green-300 rounded-t-sm" style={{ height: "30%" }}></div>
                          <span className="text-xs text-muted-foreground mt-2">$0-40K</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-full bg-bitebase-green-400 rounded-t-sm" style={{ height: "50%" }}></div>
                          <span className="text-xs text-muted-foreground mt-2">$40-80K</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-full bg-bitebase-green-500 rounded-t-sm" style={{ height: "100%" }}></div>
                          <span className="text-xs text-muted-foreground mt-2">$80-120K</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-full bg-bitebase-green-300 rounded-t-sm" style={{ height: "40%" }}></div>
                          <span className="text-xs text-muted-foreground mt-2">$120K+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="analysis" className="mt-0">
            <Card className="mb-6 shadow-md border border-border">
              <CardHeader>
                <CardTitle>Competitive Landscape</CardTitle>
                <CardDescription>
                  Analysis of competitors in your area
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="relative h-[400px] border rounded-md overflow-hidden bg-neutral-50">
                      <div className="absolute inset-0 bg-bitebase-green-50">
                        <div className="w-full h-full opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>
                      </div>
                      
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="h-8 w-8 rounded-full bg-bitebase-green-500 flex items-center justify-center text-white shadow-lg">
                          <Building className="h-4 w-4" />
                        </div>
                        <div className="absolute -inset-1 rounded-full border-4 border-bitebase-green-500 opacity-20 animate-ping"></div>
                      </div>
                      
                      {Array(8).fill(0).map((_, i) => {
                        const angle = (i / 8) * Math.PI * 2;
                        const distance = 100 + Math.random() * 50;
                        const x = Math.cos(angle) * distance;
                        const y = Math.sin(angle) * distance;
                        
                        return (
                          <div 
                            key={i}
                            className="absolute h-6 w-6 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center shadow-md"
                            style={{ 
                              top: `calc(50% + ${y}px)`, 
                              left: `calc(50% + ${x}px)`,
                              transform: 'translate(-50%, -50%)'
                            }}
                          >
                            <Building className="h-3 w-3 text-gray-500" />
                          </div>
                        );
                      })}
                      
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-40 w-40 rounded-full border border-bitebase-green-300 opacity-60" />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-80 w-80 rounded-full border border-bitebase-green-300 opacity-40" />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-120 w-120 rounded-full border border-bitebase-green-300 opacity-20" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Competitor Analysis</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Competitor Density</h4>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Direct Competitors</span>
                          <span className="font-medium">5 within 1 mile</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Indirect Competitors</span>
                          <span className="font-medium">12 within 1 mile</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Saturation Level</span>
                          <span className="font-medium text-amber-600">Moderate</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Market Positioning</h4>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Price Point vs. Competitors</span>
                          <span className="font-medium">8% higher</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Menu Uniqueness</span>
                          <span className="font-medium text-bitebase-green-600">High</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Service Model Difference</span>
                          <span className="font-medium text-bitebase-green-600">Significant</span>
                        </div>
                      </div>
                      
                      <Button className="w-full mt-4">
                        View Detailed Competitor Report
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-md border border-border">
              <CardHeader>
                <CardTitle>Strategic Recommendations</CardTitle>
                <CardDescription>
                  Based on competitive analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="shadow-md border border-border">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-full bg-bitebase-green-100 flex items-center justify-center">
                          <Target className="h-5 w-5 text-bitebase-green-600" />
                        </div>
                        <h3 className="font-medium">Differentiation Strategy</h3>
                      </div>
                      <p className="text-sm">Focus on unique menu items that competitors don't offer, especially plant-based options which are underrepresented in your area.</p>
                      <Button variant="outline" size="sm" className="mt-3 w-full">
                        Menu Strategy <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-md border border-border">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-full bg-bitebase-green-100 flex items-center justify-center">
                          <Users className="h-5 w-5 text-bitebase-green-600" />
                        </div>
                        <h3 className="font-medium">Target Customer Focus</h3>
                      </div>
                      <p className="text-sm">Your location has a high concentration of 35-44 year old professionals with above-average income, who are underserved by current offerings.</p>
                      <Button variant="outline" size="sm" className="mt-3 w-full">
                        Demographic Deep Dive <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-md border border-border">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-full bg-bitebase-green-100 flex items-center justify-center">
                          <TrendingUp className="h-5 w-5 text-bitebase-green-600" />
                        </div>
                        <h3 className="font-medium">Growth Opportunity</h3>
                      </div>
                      <p className="text-sm">Consider extending hours to capture the evening crowd (8-10pm) which shows strong foot traffic but limited dining options in the area.</p>
                      <Button variant="outline" size="sm" className="mt-3 w-full">
                        Opportunity Analysis <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="features" className="mt-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Location Features Analysis</h2>
              <p className="text-muted-foreground">
                Explore detailed metrics about this location and its suitability for your restaurant concept.
              </p>
            </div>
            
            <LocationFeatures features={locationFeatures} showScores={true} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Location;
