
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, TrendingUp, Coffee, PieChart, Clock, DollarSign, Star } from "lucide-react";

const Insights = () => {
  return (
    <Layout>
      <div className="container py-10">
        <h1 className="text-4xl font-bold mb-2">Consumer Insights</h1>
        <p className="text-muted-foreground mb-8">Understand customer preferences, trends, and behavior patterns.</p>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-4 sm:mb-0">
            <Select defaultValue="Downtown">
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Downtown">Downtown</SelectItem>
                <SelectItem value="Midtown">Midtown</SelectItem>
                <SelectItem value="Uptown">Uptown</SelectItem>
                <SelectItem value="Bayside">Bayside</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="last-year">
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Select time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="last-quarter">Last Quarter</SelectItem>
                <SelectItem value="last-year">Last Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button>Generate Report</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Target Audience Size</p>
                  <h3 className="text-3xl font-bold mt-1">42.8K</h3>
                  <p className="text-sm mt-2 text-bite-600">+12% from last year</p>
                </div>
                <div className="h-12 w-12 bg-bite-100 rounded-lg flex items-center justify-center text-bite-600">
                  <Users className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Dining Frequency</p>
                  <h3 className="text-3xl font-bold mt-1">2.4x</h3>
                  <p className="text-sm mt-2 text-bite-600">Per month average</p>
                </div>
                <div className="h-12 w-12 bg-bite-100 rounded-lg flex items-center justify-center text-bite-600">
                  <Coffee className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Spending</p>
                  <h3 className="text-3xl font-bold mt-1">$38</h3>
                  <p className="text-sm mt-2 text-bite-600">Per customer visit</p>
                </div>
                <div className="h-12 w-12 bg-bite-100 rounded-lg flex items-center justify-center text-bite-600">
                  <DollarSign className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="demographics">
          <TabsList className="mb-4">
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="behavior">Dining Behavior</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>
          
          <TabsContent value="demographics" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Age Distribution</CardTitle>
                  <CardDescription>Customer segments by age group</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4 h-64">
                    <div className="flex flex-col items-center flex-1">
                      <div className="h-16 bg-bite-200 w-full rounded-t-sm"></div>
                      <p className="text-xs text-muted-foreground mt-2">18-24</p>
                      <p className="text-sm font-medium">15%</p>
                    </div>
                    <div className="flex flex-col items-center flex-1">
                      <div className="h-32 bg-bite-300 w-full rounded-t-sm"></div>
                      <p className="text-xs text-muted-foreground mt-2">25-34</p>
                      <p className="text-sm font-medium">30%</p>
                    </div>
                    <div className="flex flex-col items-center flex-1">
                      <div className="h-48 bg-bite-400 w-full rounded-t-sm"></div>
                      <p className="text-xs text-muted-foreground mt-2">35-44</p>
                      <p className="text-sm font-medium">45%</p>
                    </div>
                    <div className="flex flex-col items-center flex-1">
                      <div className="h-24 bg-bite-300 w-full rounded-t-sm"></div>
                      <p className="text-xs text-muted-foreground mt-2">45-54</p>
                      <p className="text-sm font-medium">25%</p>
                    </div>
                    <div className="flex flex-col items-center flex-1">
                      <div className="h-8 bg-bite-200 w-full rounded-t-sm"></div>
                      <p className="text-xs text-muted-foreground mt-2">55+</p>
                      <p className="text-sm font-medium">10%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Income Level</CardTitle>
                  <CardDescription>Economic distribution of target market</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center">
                    <div className="w-56 h-56 relative rounded-full overflow-hidden">
                      <div className="absolute inset-0 bg-bite-200" style={{ clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 50% 100%)' }}></div>
                      <div className="absolute inset-0 bg-bite-300" style={{ clipPath: 'polygon(50% 50%, 100% 100%, 0 100%)' }}></div>
                      <div className="absolute inset-0 bg-bite-400" style={{ clipPath: 'polygon(50% 50%, 0 100%, 0 0, 50% 0)' }}></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center text-xs font-medium">Income</div>
                      </div>
                      <div className="absolute top-1/4 right-1/4 transform translate-x-1/4 -translate-y-1/4 text-xs font-medium">High 40%</div>
                      <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 translate-y-1/4 text-xs font-medium">Medium 35%</div>
                      <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium">Low 25%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Geographic Distribution</CardTitle>
                  <CardDescription>Where your customers live</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-64 border border-dashed border-muted-foreground/25 rounded-lg">
                    <p className="text-muted-foreground text-center">Geographic Map Visualization<br />Coming Soon</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Occupation</CardTitle>
                  <CardDescription>Professional backgrounds of target audience</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Professionals</span>
                        <span>42%</span>
                      </div>
                      <div className="h-2 w-full bg-bite-100 rounded-full">
                        <div className="h-2 bg-bite-500 rounded-full" style={{ width: "42%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Service Industry</span>
                        <span>18%</span>
                      </div>
                      <div className="h-2 w-full bg-bite-100 rounded-full">
                        <div className="h-2 bg-bite-500 rounded-full" style={{ width: "18%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Creative/Arts</span>
                        <span>15%</span>
                      </div>
                      <div className="h-2 w-full bg-bite-100 rounded-full">
                        <div className="h-2 bg-bite-500 rounded-full" style={{ width: "15%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Students</span>
                        <span>12%</span>
                      </div>
                      <div className="h-2 w-full bg-bite-100 rounded-full">
                        <div className="h-2 bg-bite-500 rounded-full" style={{ width: "12%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Education</span>
                        <span>8%</span>
                      </div>
                      <div className="h-2 w-full bg-bite-100 rounded-full">
                        <div className="h-2 bg-bite-500 rounded-full" style={{ width: "8%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Other</span>
                        <span>5%</span>
                      </div>
                      <div className="h-2 w-full bg-bite-100 rounded-full">
                        <div className="h-2 bg-bite-500 rounded-full" style={{ width: "5%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="preferences" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cuisine Preferences</CardTitle>
                  <CardDescription>Popular food types in your area</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Italian</span>
                        <span>28%</span>
                      </div>
                      <div className="h-2 w-full bg-bite-100 rounded-full">
                        <div className="h-2 bg-bite-500 rounded-full" style={{ width: "28%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Asian Fusion</span>
                        <span>22%</span>
                      </div>
                      <div className="h-2 w-full bg-bite-100 rounded-full">
                        <div className="h-2 bg-bite-500 rounded-full" style={{ width: "22%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Mexican</span>
                        <span>18%</span>
                      </div>
                      <div className="h-2 w-full bg-bite-100 rounded-full">
                        <div className="h-2 bg-bite-500 rounded-full" style={{ width: "18%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>American</span>
                        <span>15%</span>
                      </div>
                      <div className="h-2 w-full bg-bite-100 rounded-full">
                        <div className="h-2 bg-bite-500 rounded-full" style={{ width: "15%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Mediterranean</span>
                        <span>10%</span>
                      </div>
                      <div className="h-2 w-full bg-bite-100 rounded-full">
                        <div className="h-2 bg-bite-500 rounded-full" style={{ width: "10%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Other</span>
                        <span>7%</span>
                      </div>
                      <div className="h-2 w-full bg-bite-100 rounded-full">
                        <div className="h-2 bg-bite-500 rounded-full" style={{ width: "7%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Dietary Preferences</CardTitle>
                  <CardDescription>Special dietary needs and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-64 border border-dashed border-muted-foreground/25 rounded-lg">
                    <p className="text-muted-foreground text-center">Dietary Preferences Chart<br />Coming Soon</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Price Sensitivity</CardTitle>
                  <CardDescription>Customer willingness to pay</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-64 border border-dashed border-muted-foreground/25 rounded-lg">
                    <p className="text-muted-foreground text-center">Price Sensitivity Analysis<br />Coming Soon</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="behavior" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Peak Hours</CardTitle>
                  <CardDescription>When customers visit most frequently</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <div className="grid grid-cols-7 h-48 items-end gap-2">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                        <div key={day} className="flex flex-col items-center">
                          <div className="w-full flex flex-col-reverse">
                            <div className="bg-bite-200 h-6 w-full rounded-sm" style={{ opacity: 0.5 }}></div>
                            <div className="bg-bite-300 h-8 w-full"></div>
                            <div className="bg-bite-400 h-12 w-full"></div>
                            <div className="bg-bite-500 h-8 w-full rounded-t-sm"></div>
                          </div>
                          <span className="text-xs text-muted-foreground mt-2">{day}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-4">
                      <span>Morning</span>
                      <span>Lunch</span>
                      <span>Dinner</span>
                      <span>Late</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Visit Duration</CardTitle>
                  <CardDescription>How long customers stay</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 my-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Less than 30 min</span>
                        <span>15%</span>
                      </div>
                      <div className="h-2 w-full bg-bite-100 rounded-full">
                        <div className="h-2 bg-bite-500 rounded-full" style={{ width: "15%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>30-60 min</span>
                        <span>45%</span>
                      </div>
                      <div className="h-2 w-full bg-bite-100 rounded-full">
                        <div className="h-2 bg-bite-500 rounded-full" style={{ width: "45%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>1-1.5 hours</span>
                        <span>30%</span>
                      </div>
                      <div className="h-2 w-full bg-bite-100 rounded-full">
                        <div className="h-2 bg-bite-500 rounded-full" style={{ width: "30%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>More than 1.5 hours</span>
                        <span>10%</span>
                      </div>
                      <div className="h-2 w-full bg-bite-100 rounded-full">
                        <div className="h-2 bg-bite-500 rounded-full" style={{ width: "10%" }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-8">
                    <div>
                      <p className="text-2xl font-bold">58 min</p>
                      <p className="text-sm text-muted-foreground">Average visit</p>
                    </div>
                    <div className="h-12 w-12 bg-bite-100 rounded-lg flex items-center justify-center text-bite-600">
                      <Clock className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Order Patterns</CardTitle>
                  <CardDescription>What and how customers order</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-border rounded-lg p-4">
                      <div className="text-2xl font-bold">2.7</div>
                      <p className="text-sm text-muted-foreground">Items per order</p>
                    </div>
                    
                    <div className="border border-border rounded-lg p-4">
                      <div className="text-2xl font-bold">38%</div>
                      <p className="text-sm text-muted-foreground">Include beverage</p>
                    </div>
                    
                    <div className="border border-border rounded-lg p-4">
                      <div className="text-2xl font-bold">22%</div>
                      <p className="text-sm text-muted-foreground">Order dessert</p>
                    </div>
                    
                    <div className="border border-border rounded-lg p-4">
                      <div className="text-2xl font-bold">45%</div>
                      <p className="text-sm text-muted-foreground">Share appetizers</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Dining Companions</CardTitle>
                  <CardDescription>Who customers dine with</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <div className="flex items-end h-48 space-x-6">
                      <div className="flex flex-col items-center">
                        <div className="bg-bite-200 w-16 rounded-t-sm" style={{ height: "15%" }}></div>
                        <p className="text-xs text-muted-foreground mt-2">Solo</p>
                        <p className="text-sm font-medium">15%</p>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className="bg-bite-300 w-16 rounded-t-sm" style={{ height: "40%" }}></div>
                        <p className="text-xs text-muted-foreground mt-2">Couples</p>
                        <p className="text-sm font-medium">40%</p>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className="bg-bite-400 w-16 rounded-t-sm" style={{ height: "30%" }}></div>
                        <p className="text-xs text-muted-foreground mt-2">Family</p>
                        <p className="text-sm font-medium">30%</p>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className="bg-bite-500 w-16 rounded-t-sm" style={{ height: "15%" }}></div>
                        <p className="text-xs text-muted-foreground mt-2">Groups</p>
                        <p className="text-sm font-medium">15%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="trends" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Emerging Food Trends</CardTitle>
                  <CardDescription>Growing popularity in your market</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center">
                        <TrendingUp className="h-5 w-5 text-bite-600 mr-3" />
                        <span>Plant-based options</span>
                      </div>
                      <div className="text-sm font-medium">+45% YoY</div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center">
                        <TrendingUp className="h-5 w-5 text-bite-600 mr-3" />
                        <span>Fusion cuisine</span>
                      </div>
                      <div className="text-sm font-medium">+32% YoY</div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center">
                        <TrendingUp className="h-5 w-5 text-bite-600 mr-3" />
                        <span>Local ingredients</span>
                      </div>
                      <div className="text-sm font-medium">+28% YoY</div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center">
                        <TrendingUp className="h-5 w-5 text-bite-600 mr-3" />
                        <span>Gluten-free options</span>
                      </div>
                      <div className="text-sm font-medium">+24% YoY</div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center">
                        <TrendingUp className="h-5 w-5 text-bite-600 mr-3" />
                        <span>Craft beverages</span>
                      </div>
                      <div className="text-sm font-medium">+18% YoY</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Customer Reviews</CardTitle>
                  <CardDescription>Sentiment analysis from online platforms</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-end">
                      <span className="text-4xl font-bold">4.3</span>
                      <span className="text-muted-foreground ml-1">/5</span>
                    </div>
                    <div className="flex text-yellow-500">
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 text-muted stroke-current fill-none" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <div className="flex items-center text-sm">
                        <span className="w-10">5 ★</span>
                        <div className="flex-1 ml-2">
                          <div className="h-2 w-full bg-muted rounded-full">
                            <div className="h-2 bg-yellow-500 rounded-full" style={{ width: "55%" }}></div>
                          </div>
                        </div>
                        <span className="w-10 text-right">55%</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center text-sm">
                        <span className="w-10">4 ★</span>
                        <div className="flex-1 ml-2">
                          <div className="h-2 w-full bg-muted rounded-full">
                            <div className="h-2 bg-yellow-500 rounded-full" style={{ width: "30%" }}></div>
                          </div>
                        </div>
                        <span className="w-10 text-right">30%</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center text-sm">
                        <span className="w-10">3 ★</span>
                        <div className="flex-1 ml-2">
                          <div className="h-2 w-full bg-muted rounded-full">
                            <div className="h-2 bg-yellow-500 rounded-full" style={{ width: "10%" }}></div>
                          </div>
                        </div>
                        <span className="w-10 text-right">10%</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center text-sm">
                        <span className="w-10">2 ★</span>
                        <div className="flex-1 ml-2">
                          <div className="h-2 w-full bg-muted rounded-full">
                            <div className="h-2 bg-yellow-500 rounded-full" style={{ width: "3%" }}></div>
                          </div>
                        </div>
                        <span className="w-10 text-right">3%</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center text-sm">
                        <span className="w-10">1 ★</span>
                        <div className="flex-1 ml-2">
                          <div className="h-2 w-full bg-muted rounded-full">
                            <div className="h-2 bg-yellow-500 rounded-full" style={{ width: "2%" }}></div>
                          </div>
                        </div>
                        <span className="w-10 text-right">2%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-2">
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="flex justify-between mb-1">
                        <div className="text-sm font-medium">Food Quality</div>
                        <div className="text-sm font-medium">4.6/5</div>
                      </div>
                      <div className="h-1.5 w-full bg-bite-100 rounded-full">
                        <div className="h-1.5 bg-bite-500 rounded-full" style={{ width: "92%" }}></div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="flex justify-between mb-1">
                        <div className="text-sm font-medium">Service</div>
                        <div className="text-sm font-medium">4.2/5</div>
                      </div>
                      <div className="h-1.5 w-full bg-bite-100 rounded-full">
                        <div className="h-1.5 bg-bite-500 rounded-full" style={{ width: "84%" }}></div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="flex justify-between mb-1">
                        <div className="text-sm font-medium">Ambience</div>
                        <div className="text-sm font-medium">4.4/5</div>
                      </div>
                      <div className="h-1.5 w-full bg-bite-100 rounded-full">
                        <div className="h-1.5 bg-bite-500 rounded-full" style={{ width: "88%" }}></div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="flex justify-between mb-1">
                        <div className="text-sm font-medium">Value</div>
                        <div className="text-sm font-medium">3.9/5</div>
                      </div>
                      <div className="h-1.5 w-full bg-bite-100 rounded-full">
                        <div className="h-1.5 bg-bite-500 rounded-full" style={{ width: "78%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Social Media Trends</CardTitle>
                  <CardDescription>Popular topics and hashtags</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-64 border border-dashed border-muted-foreground/25 rounded-lg">
                    <p className="text-muted-foreground text-center">Social Media Trend Analysis<br />Coming Soon</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Seasonal Patterns</CardTitle>
                  <CardDescription>Year-round dining behavior analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-64 border border-dashed border-muted-foreground/25 rounded-lg">
                    <p className="text-muted-foreground text-center">Seasonal Analysis Chart<br />Coming Soon</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Insights;
