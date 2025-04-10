
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Plus, Search, MapPin, Filter, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ResearchProjects = () => {
  const projects = [
    {
      id: 1,
      name: "Downtown Café Analysis",
      description: "Market research for a specialty coffee shop in the downtown area.",
      location: "123 Main St, Downtown",
      date: "Last updated 3 days ago",
      progress: 100,
    },
    {
      id: 2,
      name: "Waterfront Restaurant Opportunity",
      description: "Feasibility study for a high-end seafood restaurant near the harbor.",
      location: "45 Harbor View, Bayside",
      date: "Last updated 1 week ago",
      progress: 75,
    },
    {
      id: 3,
      name: "Fast Casual Concept",
      description: "Market analysis for a new fast casual dining concept targeting young professionals.",
      location: "789 Business Park, Midtown",
      date: "Last updated 2 weeks ago",
      progress: 50,
    },
  ];

  return (
    <DashboardLayout>
      <div className="container py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Market Research</h1>
            <p className="text-muted-foreground">Create and manage your restaurant market research projects.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
            <Button className="sm:order-2" asChild>
              <Link to="/onboarding">
                <Plus className="mr-2 h-4 w-4" /> New Research Project
              </Link>
            </Button>
            <Button variant="outline" className="sm:order-1" asChild>
              <Link to="/restaurant-setup">
                Restaurant Setup <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search research projects..."
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="md:w-auto">
            <Filter className="mr-2 h-4 w-4" /> Filters
          </Button>
        </div>
        
        <Tabs defaultValue="all" className="mt-6">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <CardTitle>{project.name}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="flex items-start mb-4">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 mr-2" />
                      <span className="text-sm text-muted-foreground">{project.location}</span>
                    </div>
                    
                    <div className="w-full bg-muted rounded-full h-2.5 mb-1">
                      <div 
                        className="bg-bite-500 h-2.5 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{project.progress}% Complete</span>
                      <span>{project.date}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/50 pt-4">
                    <Button variant="outline" className="w-full" asChild>
                      <a href={`/research/${project.id}`}>
                        <FileText className="mr-2 h-4 w-4" /> View Report
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center h-full p-6">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Plus className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">New Research Project</h3>
                  <p className="text-center text-muted-foreground text-sm mb-4">
                    Start a new market research project for your restaurant concept.
                  </p>
                  <Button variant="outline" asChild>
                    <Link to="/restaurant-setup">Create Project</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="active">
            <div className="flex items-center justify-center h-64 border border-dashed border-muted-foreground/25 rounded-lg">
              <p className="text-muted-foreground text-center">Active Projects<br />Coming Soon</p>
            </div>
          </TabsContent>
          
          <TabsContent value="completed">
            <div className="flex items-center justify-center h-64 border border-dashed border-muted-foreground/25 rounded-lg">
              <p className="text-muted-foreground text-center">Completed Projects<br />Coming Soon</p>
            </div>
          </TabsContent>
          
          <TabsContent value="archived">
            <div className="flex items-center justify-center h-64 border border-dashed border-muted-foreground/25 rounded-lg">
              <p className="text-muted-foreground text-center">Archived Projects<br />Coming Soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ResearchProjects;
