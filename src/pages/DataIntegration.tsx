
import React from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { TierRestriction } from "@/components/TierRestriction";
import {
  Database,
  FileText,
  Lock,
  ExternalLink,
  Check,
  RefreshCw,
  ChevronRight,
  UploadCloud,
  Terminal,
  Info,
  AlertTriangle,
  Globe
} from "lucide-react";

const DataIntegration = () => {
  const externalSources = [
    {
      name: "Restaurant Database API",
      description: "Connect to restaurant industry database",
      icon: <Database className="h-6 w-6" />,
      status: "connected",
      tier: "free"
    },
    {
      name: "Census Data",
      description: "Access demographic data by location",
      icon: <FileText className="h-6 w-6" />,
      status: "available",
      tier: "free"
    },
    {
      name: "Yelp Business API",
      description: "Import competitor data from Yelp",
      icon: <ExternalLink className="h-6 w-6" />,
      status: "available",
      tier: "pro"
    },
    {
      name: "Google Places API",
      description: "Location insights and traffic data",
      icon: <Globe className="h-6 w-6" />,
      status: "available",
      tier: "pro"
    },
    {
      name: "Property Value Database",
      description: "Commercial real estate valuations",
      icon: <Lock className="h-6 w-6" />,
      status: "locked",
      tier: "enterprise"
    },
    {
      name: "Custom Data Source",
      description: "Connect your own data sources via API",
      icon: <Terminal className="h-6 w-6" />,
      status: "available",
      tier: "enterprise"
    }
  ];

  return (
    <DashboardLayout>
      <div className="container py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Data Integration</h1>
            <p className="text-muted-foreground">Connect external data sources to enhance your market research</p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" /> Refresh Connections
            </Button>
            <TierRestriction requiredTier="pro">
              <Button>
                <UploadCloud className="mr-2 h-4 w-4" /> Upload Data
              </Button>
            </TierRestriction>
          </div>
        </div>

        <Tabs defaultValue="datasources">
          <TabsList className="mb-6">
            <TabsTrigger value="datasources">Data Sources</TabsTrigger>
            <TabsTrigger value="imports">Data Imports</TabsTrigger>
            <TabsTrigger value="exports">Data Exports</TabsTrigger>
            <TabsTrigger value="settings">Integration Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="datasources">
            <Card className="mb-6">
              <CardHeader className="pb-3">
                <CardTitle>Available Data Sources</CardTitle>
                <CardDescription>
                  Connect to external data sources to enhance your market research
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {externalSources.map((source, i) => (
                    <Card key={i} className={source.status === "locked" ? "opacity-70" : ""}>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            {source.icon}
                          </div>
                          <Badge
                            variant={
                              source.status === "connected" ? "default" :
                              source.status === "available" ? "outline" :
                              "secondary"
                            }
                          >
                            {source.status === "connected" ? (
                              <><Check className="mr-1 h-3 w-3" /> Connected</>
                            ) : source.status === "available" ? (
                              "Available"
                            ) : (
                              <><Lock className="mr-1 h-3 w-3" /> Locked</>
                            )}
                          </Badge>
                        </div>
                        <CardTitle className="mt-4">{source.name}</CardTitle>
                        <CardDescription>{source.description}</CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-between border-t pt-4">
                        <Badge variant="outline">{source.tier.charAt(0).toUpperCase() + source.tier.slice(1)} Tier</Badge>
                        <Button
                          variant={source.status === "connected" ? "outline" : "default"}
                          size="sm"
                          disabled={source.status === "locked"}
                        >
                          {source.status === "connected" ? "Configure" : "Connect"}
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <TierRestriction requiredTier="pro">
              <Card>
                <CardHeader>
                  <CardTitle>Custom API Integration</CardTitle>
                  <CardDescription>Connect custom API endpoints as data sources</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <label className="text-sm font-medium mb-1 block">API Endpoint URL</label>
                        <Input placeholder="https://api.example.com/data" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Authentication Type</label>
                        <select className="w-full px-3 py-2 rounded-lg border border-input">
                          <option>API Key</option>
                          <option>OAuth 2.0</option>
                          <option>Basic Auth</option>
                          <option>No Auth</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">API Key Name</label>
                        <Input placeholder="X-API-Key" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">API Key</label>
                        <Input type="password" placeholder="Enter your API key" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="test-connection" />
                        <label htmlFor="test-connection" className="text-sm">Test connection before saving</label>
                      </div>
                      <Button>Connect API</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TierRestriction>
          </TabsContent>

          <TabsContent value="imports">
            <Card className="mb-6">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Data Import History</CardTitle>
                    <CardDescription>Recently imported data from external sources</CardDescription>
                  </div>
                  <Button>
                    <UploadCloud className="mr-2 h-4 w-4" /> Import Data
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-64 border border-dashed rounded-lg">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-2">No data has been imported yet</p>
                    <Button size="sm" variant="outline">Import Data</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Supported Import Formats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[
                    { name: "CSV Files", format: ".csv", supported: true },
                    { name: "Excel Spreadsheets", format: ".xlsx, .xls", supported: true },
                    { name: "JSON Data", format: ".json", supported: true },
                    { name: "XML Files", format: ".xml", supported: false },
                    { name: "GeoJSON", format: ".geojson", supported: true },
                    { name: "Database Exports", format: ".sql", supported: false },
                    { name: "Text Files", format: ".txt", supported: true },
                    { name: "API Responses", format: "REST/JSON", supported: true }
                  ].map((format, i) => (
                    <Card key={i}>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <p className="font-medium">{format.name}</p>
                          <p className="text-xs text-muted-foreground">{format.format}</p>
                        </div>
                        {format.supported ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <Check className="mr-1 h-3 w-3" /> Supported
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                            Coming Soon
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exports">
            <TierRestriction requiredTier="pro">
              <Card>
                <CardHeader>
                  <CardTitle>Export Data</CardTitle>
                  <CardDescription>Export your market research data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        {
                          title: "Reports Export",
                          description: "Export all reports as PDF or Excel",
                          icon: <FileText className="h-6 w-6 text-primary" />
                        },
                        {
                          title: "Raw Data Export",
                          description: "Export data in CSV or JSON format",
                          icon: <Database className="h-6 w-6 text-primary" />
                        },
                        {
                          title: "Scheduled Exports",
                          description: "Automate regular data exports",
                          icon: <RefreshCw className="h-6 w-6 text-primary" />
                        }
                      ].map((item, i) => (
                        <Card key={i}>
                          <CardContent className="p-6 text-center">
                            <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                              {item.icon}
                            </div>
                            <h3 className="font-medium mb-2">{item.title}</h3>
                            <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                            <Button variant="outline" className="w-full">Configure</Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <Card className="border-dashed border-amber-300 bg-amber-50/50">
                      <CardContent className="p-4 flex items-start gap-4">
                        <div className="p-2 rounded-full bg-amber-100">
                          <AlertTriangle className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-amber-800 mb-1">Data Export Limitations</h4>
                          <p className="text-sm text-amber-700">
                            Please note that some data exports may be limited based on your subscription tier and the source data licensing agreements.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TierRestriction>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Integration Settings</CardTitle>
                <CardDescription>Configure data integration preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Data Refresh Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          title: "Auto-refresh Connected Data",
                          description: "Automatically sync data from connected sources",
                          checked: true
                        },
                        {
                          title: "Real-time Updates",
                          description: "Receive real-time data updates when available",
                          checked: false
                        },
                        {
                          title: "Background Processing",
                          description: "Process data imports in the background",
                          checked: true
                        },
                        {
                          title: "Data Change Notifications",
                          description: "Receive alerts when external data changes",
                          checked: false
                        }
                      ].map((setting, i) => (
                        <div key={i} className="flex items-start justify-between p-4 bg-muted/40 rounded-lg">
                          <div>
                            <p className="font-medium">{setting.title}</p>
                            <p className="text-sm text-muted-foreground">{setting.description}</p>
                          </div>
                          <Switch checked={setting.checked} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="h-[1px] w-full bg-border my-6" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">API Rate Limits</h3>
                      <div className="flex items-center">
                        <Info className="h-4 w-4 text-muted-foreground mr-2" />
                        <span className="text-sm text-muted-foreground">Set by your plan</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[
                        { name: "Restaurant Database API", limit: "1000 requests/day", used: 123 },
                        { name: "Census Data", limit: "500 requests/day", used: 48 },
                        { name: "Yelp Business API", limit: "Pro tier required", used: 0 },
                      ].map((api, i) => (
                        <div key={i} className="p-4 bg-muted/40 rounded-lg">
                          <div className="flex justify-between mb-2">
                            <span className="font-medium">{api.name}</span>
                            <span className="text-sm">{api.limit}</span>
                          </div>
                          {typeof api.used === "number" ? (
                            <>
                              <div className="w-full bg-muted rounded-full h-2.5 mb-1">
                                <div
                                  className="bg-primary h-2.5 rounded-full"
                                  style={{ width: `${(api.used / parseInt(api.limit)) * 100}%` }}
                                />
                              </div>
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>{api.used} used</span>
                                <span>{parseInt(api.limit) - api.used} remaining</span>
                              </div>
                            </>
                          ) : (
                            <p className="text-sm text-muted-foreground">Not available on current plan</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button>Save Settings</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DataIntegration;
