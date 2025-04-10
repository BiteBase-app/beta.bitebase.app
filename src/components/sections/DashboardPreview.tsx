
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

export function DashboardPreview() {
  return (
    <div className="bg-muted py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-bite-900/[0.03] -z-10" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 className="text-base font-semibold uppercase tracking-wide text-bite-600">
            Powerful Visualizations
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Transform data into actionable insights
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our intuitive dashboards provide a comprehensive view of your restaurant's market position, customer segments, and growth opportunities.
          </p>
        </div>

        <div className="mt-10 relative">
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-muted to-transparent -z-10" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-muted to-transparent -z-10" />

          <div className="rounded-xl border border-border bg-background/70 backdrop-blur shadow-xl overflow-hidden">
            <div className="h-12 bg-muted flex items-center px-4 border-b border-border">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="ml-4 text-sm font-medium text-muted-foreground">BiteBaseAI Dashboard</div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <Card className="p-6 h-64 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Market Opportunity Score</h3>
                      <p className="text-sm text-muted-foreground">Based on 24 factors in your selected location</p>
                    </div>

                    <div className="mt-4 h-32 flex items-end space-x-2">
                      <div className="h-[20%] w-12 bg-bite-100 rounded-t-md"></div>
                      <div className="h-[45%] w-12 bg-bite-200 rounded-t-md"></div>
                      <div className="h-[65%] w-12 bg-bite-300 rounded-t-md"></div>
                      <div className="h-[85%] w-12 bg-bite-400 rounded-t-md"></div>
                      <div className="h-full w-12 bg-bite-500 rounded-t-md relative">
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm font-medium">87%</span>
                      </div>
                      <div className="h-[70%] w-12 bg-bite-400 rounded-t-md"></div>
                      <div className="h-[50%] w-12 bg-bite-300 rounded-t-md"></div>
                      <div className="h-[35%] w-12 bg-bite-200 rounded-t-md"></div>
                      <div className="h-[15%] w-12 bg-bite-100 rounded-t-md"></div>
                    </div>
                  </Card>

                  <div className="grid grid-cols-2 gap-6">
                    <Card className="p-6">
                      <h3 className="text-lg font-medium">Competitor Analysis</h3>
                      <p className="text-sm text-muted-foreground">8 similar businesses in 2 mile radius</p>

                      <div className="mt-4 h-24 flex items-center justify-center">
                        <div className="relative w-32 h-32">
                          <div className="absolute inset-0 rounded-full border-4 border-bite-200"></div>
                          <div className="absolute inset-4 rounded-full border-4 border-bite-300"></div>
                          <div className="absolute inset-8 rounded-full border-4 border-bite-400"></div>
                          <div className="absolute inset-12 rounded-full bg-bite-500"></div>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h3 className="text-lg font-medium">Customer Demographics</h3>
                      <p className="text-sm text-muted-foreground">Primary age groups in target area</p>

                      <div className="mt-4 h-24 grid grid-cols-5 gap-1 items-end">
                        <div className="h-[30%] bg-bite-100 rounded-t-sm"></div>
                        <div className="h-[65%] bg-bite-300 rounded-t-sm"></div>
                        <div className="h-full bg-bite-500 rounded-t-sm"></div>
                        <div className="h-[80%] bg-bite-400 rounded-t-sm"></div>
                        <div className="h-[40%] bg-bite-200 rounded-t-sm"></div>
                      </div>
                      <div className="mt-1 grid grid-cols-5 gap-1">
                        <div className="text-xs text-center text-muted-foreground">18-24</div>
                        <div className="text-xs text-center text-muted-foreground">25-34</div>
                        <div className="text-xs text-center text-muted-foreground">35-44</div>
                        <div className="text-xs text-center text-muted-foreground">45-54</div>
                        <div className="text-xs text-center text-muted-foreground">55+</div>
                      </div>
                    </Card>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card className="p-6">
                    <h3 className="text-lg font-medium">Location Score</h3>
                    <p className="text-sm text-muted-foreground">1234 Market Street</p>

                    <div className="mt-4 relative pt-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block text-bite-600">
                            92/100
                          </span>
                        </div>
                        <div>
                          <span className="text-xs font-semibold inline-block text-bite-600">
                            Excellent
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-bite-200">
                        <div style={{ width: "92%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-bite-500"></div>
                      </div>
                    </div>

                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Foot Traffic</span>
                        <span className="font-medium">Very High</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Parking</span>
                        <span className="font-medium">Adequate</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Visibility</span>
                        <span className="font-medium">Excellent</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Accessibility</span>
                        <span className="font-medium">Very Good</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 h-64">
                    <h3 className="text-lg font-medium">Predicted Performance</h3>
                    <p className="text-sm text-muted-foreground">First 12 months forecast</p>

                    <div className="mt-4 h-40 flex items-end space-x-1">
                      {[20, 35, 40, 50, 65, 75, 70, 85, 90, 95, 90, 100].map((value, index) => (
                        <div
                          key={index}
                          className="flex-1 bg-bite-500 rounded-t-sm"
                          style={{ height: `${value}%`, opacity: 0.2 + (value / 125) }}
                        ></div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link to="/dashboard">Explore the Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DashboardPreview;
