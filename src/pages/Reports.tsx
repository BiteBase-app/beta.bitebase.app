
import React from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer } from "@/components/ui/chart";
import {
  Search,
  Download,
  Share2,
  ChevronRight,
  FileSpreadsheet,
  FileText,
  BarChart2,
  FileBarChart,
  PlusCircle,
  Calendar,
  Filter,
  PieChart
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { TierRestriction } from "@/components/TierRestriction";

const Reports = () => {
  const reportCategories = [
    { name: "Market Analysis", count: 5 },
    { name: "Competitor Insights", count: 3 },
    { name: "Consumer Reports", count: 4 },
    { name: "Location Analytics", count: 2 },
    { name: "Financial Forecasts", count: 3 }
  ];

  return (
    <DashboardLayout>
      <div className="container py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Reports</h1>
            <p className="text-muted-foreground">Generate and manage market research reports</p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> New Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="col-span-1 md:col-span-3">
            <CardHeader className="pb-3">
              <div className="flex justify-between">
                <CardTitle>Reports Library</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="mr-2 h-4 w-4" /> Date Range
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" /> Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reports by name, date, or keywords..."
                  className="pl-10"
                />
              </div>

              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Reports</TabsTrigger>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="shared">Shared with Me</TabsTrigger>
                  <TabsTrigger value="templates">Templates</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                  <div className="space-y-4">
                    {[
                      {
                        name: "Q3 Market Analysis Report",
                        type: "PDF",
                        icon: <FileText className="h-5 w-5 text-red-500" />,
                        date: "September 12, 2023",
                        author: "Alex Thompson"
                      },
                      {
                        name: "Competitor Price Analysis",
                        type: "Spreadsheet",
                        icon: <FileSpreadsheet className="h-5 w-5 text-green-500" />,
                        date: "September 5, 2023",
                        author: "Jamie Chen"
                      },
                      {
                        name: "Customer Demographics Overview",
                        type: "Chart",
                        icon: <PieChart className="h-5 w-5 text-blue-500" />,
                        date: "August 28, 2023",
                        author: "Sam Rodriguez"
                      },
                      {
                        name: "Location Traffic Analysis",
                        type: "Dashboard",
                        icon: <BarChart2 className="h-5 w-5 text-purple-500" />,
                        date: "August 15, 2023",
                        author: "Taylor Kim"
                      },
                      {
                        name: "Annual Market Trends",
                        type: "Report",
                        icon: <FileBarChart className="h-5 w-5 text-amber-500" />,
                        date: "July 22, 2023",
                        author: "Alex Thompson"
                      }
                    ].map((report, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-muted/40 rounded-lg hover:bg-muted/60 transition cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-lg bg-background flex items-center justify-center">
                            {report.icon}
                          </div>
                          <div>
                            <p className="font-medium">{report.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {report.type} • {report.date} • {report.author}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex justify-center">
                    <Button variant="outline">Load More</Button>
                  </div>
                </TabsContent>

                <TabsContent value="recent">
                  <div className="flex items-center justify-center h-64 border border-dashed rounded-lg">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-2">Your recent reports will appear here</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="shared">
                  <div className="flex items-center justify-center h-64 border border-dashed rounded-lg">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-2">No shared reports yet</p>
                      <Button size="sm">Share a Report</Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="templates">
                  <div className="flex items-center justify-center h-64 border border-dashed rounded-lg">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-2">Report templates coming soon</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Report Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {reportCategories.map((category, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center py-2 px-3 rounded-md hover:bg-muted cursor-pointer"
                  >
                    <span>{category.name}</span>
                    <span className="text-xs bg-muted px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="ghost" size="sm" className="w-full">
                  Manage Categories
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { name: "Create Report", icon: <FileText className="h-4 w-4" /> },
                  { name: "Import Data", icon: <Download className="h-4 w-4" /> },
                  { name: "Schedule Report", icon: <Calendar className="h-4 w-4" /> }
                ].map((action, i) => (
                  <Button key={i} variant="outline" className="w-full justify-start">
                    {action.icon}
                    <span className="ml-2">{action.name}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Automated Report Generation</CardTitle>
            <CardDescription>Schedule recurring reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Weekly Performance",
                  description: "Automated report sent every Monday at 9am",
                  icon: <BarChart2 className="h-10 w-10 text-primary" />
                },
                {
                  title: "Monthly Market Analysis",
                  description: "Comprehensive market review on 1st of each month",
                  icon: <PieChart className="h-10 w-10 text-primary" />
                },
                {
                  title: "Custom Schedule",
                  description: "Create your own automated reporting schedule",
                  icon: <Calendar className="h-10 w-10 text-primary" />
                }
              ].map((item, i) => (
                <div key={i} className="border rounded-lg p-6 text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-medium mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  <Button className="w-full">Setup</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
