
import React from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  UserPlus,
  Mail,
  Search,
  Filter,
  MoreHorizontal,
  MessageCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet
} from "lucide-react";
import { TierRestriction } from "@/components/TierRestriction";

const TeamManagement = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Alex Thompson",
      email: "alex@bitebase.com",
      role: "Owner",
      avatar: null,
      status: "active",
      lastActive: "Just now"
    },
    {
      id: 2,
      name: "Jamie Chen",
      email: "jamie@bitebase.com",
      role: "Manager",
      avatar: null,
      status: "active",
      lastActive: "10 min ago"
    },
    {
      id: 3,
      name: "Sam Rodriguez",
      email: "sam@bitebase.com",
      role: "Analyst",
      avatar: null,
      status: "inactive",
      lastActive: "3 hours ago"
    },
    {
      id: 4,
      name: "Taylor Kim",
      email: "taylor@bitebase.com",
      role: "Analyst",
      avatar: null,
      status: "pending",
      lastActive: "Invitation Sent"
    }
  ];

  const projects = [
    {
      id: 1,
      name: "Downtown Café Analysis",
      members: [1, 2, 3],
      tasks: { completed: 8, total: 10 },
      dueDate: "Sep 15, 2023"
    },
    {
      id: 2,
      name: "Waterfront Restaurant Opportunity",
      members: [1, 2],
      tasks: { completed: 5, total: 12 },
      dueDate: "Oct 3, 2023"
    },
    {
      id: 3,
      name: "Fast Casual Concept",
      members: [2, 3],
      tasks: { completed: 3, total: 8 },
      dueDate: "Oct 20, 2023"
    }
  ];

  return (
    <DashboardLayout>
      <div className="container py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Team Management</h1>
            <p className="text-muted-foreground">Manage team members and collaborate on projects</p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <Button>
              <UserPlus className="mr-2 h-4 w-4" /> Invite Team Member
            </Button>
          </div>
        </div>

        <Tabs defaultValue="members">
          <TabsList className="mb-6">
            <TabsTrigger value="members">Team Members</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
          </TabsList>

          <TabsContent value="members">
            <Card className="mb-6">
              <CardHeader className="pb-3">
                <div className="flex justify-between">
                  <CardTitle>Team Members</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <FileSpreadsheet className="mr-2 h-4 w-4" /> Export
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  Manage access and roles for your team members
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search team members..."
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" className="md:w-auto">
                    <Filter className="mr-2 h-4 w-4" /> Filters
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b">
                        <th className="pb-3 font-medium text-muted-foreground">Name</th>
                        <th className="pb-3 font-medium text-muted-foreground">Role</th>
                        <th className="pb-3 font-medium text-muted-foreground">Status</th>
                        <th className="pb-3 font-medium text-muted-foreground">Last Active</th>
                        <th className="pb-3 font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teamMembers.map((member) => (
                        <tr key={member.id} className="border-b">
                          <td className="py-3">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarFallback>{member.name.charAt(0) + member.name.split(' ')[1]?.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{member.name}</p>
                                <p className="text-sm text-muted-foreground">{member.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3">
                            <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium
                              ${member.role === "Owner" ? "bg-blue-100 text-blue-800" :
                                member.role === "Manager" ? "bg-purple-100 text-purple-800" :
                                "bg-gray-100 text-gray-800"}`}>
                              {member.role}
                            </span>
                          </td>
                          <td className="py-3">
                            <span className={`inline-flex items-center gap-1 text-sm
                              ${member.status === "active" ? "text-green-600" :
                                member.status === "inactive" ? "text-gray-600" :
                                "text-amber-600"}`}>
                              <span className={`w-2 h-2 rounded-full
                                ${member.status === "active" ? "bg-green-600" :
                                  member.status === "inactive" ? "bg-gray-600" :
                                  "bg-amber-600"}`}>
                              </span>
                              {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-3 text-sm">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              {member.lastActive}
                            </div>
                          </td>
                          <td className="py-3">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon">
                                <Mail className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <MessageCircle className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pending Invitations</CardTitle>
                <CardDescription>Team member invitations awaiting response</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-32 border border-dashed rounded-lg">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-2">No pending invitations</p>
                    <Button variant="outline" size="sm">
                      <UserPlus className="mr-2 h-4 w-4" /> Invite New Member
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(project => (
                <Card key={project.id}>
                  <CardHeader className="pb-3">
                    <CardTitle>{project.name}</CardTitle>
                    <CardDescription>Due: {project.dueDate}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex -space-x-3">
                        {project.members.map(memberId => {
                          const member = teamMembers.find(m => m.id === memberId);
                          return (
                            <Avatar key={memberId} className="border-2 border-background">
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {member?.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          );
                        })}
                        <Button variant="outline" size="icon" className="h-9 w-9 rounded-full border-dashed">
                          <UserPlus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">
                          Tasks: {project.tasks.completed}/{project.tasks.total}
                        </div>
                        <div className="w-24 h-2 bg-muted rounded-full">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${(project.tasks.completed / project.tasks.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-3 flex justify-between">
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" /> Comments
                    </Button>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="permissions">
            <Card>
              <CardHeader>
                <CardTitle>Role Permissions</CardTitle>
                <CardDescription>Manage access levels and permissions for different roles</CardDescription>
              </CardHeader>
              <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left border-b">
                          <th className="pb-3 font-medium text-muted-foreground">Permission</th>
                          <th className="pb-3 font-medium text-muted-foreground text-center">Owner</th>
                          <th className="pb-3 font-medium text-muted-foreground text-center">Manager</th>
                          <th className="pb-3 font-medium text-muted-foreground text-center">Analyst</th>
                          <th className="pb-3 font-medium text-muted-foreground text-center">Viewer</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: "View Reports", owner: true, manager: true, analyst: true, viewer: true },
                          { name: "Create Reports", owner: true, manager: true, analyst: true, viewer: false },
                          { name: "Edit Reports", owner: true, manager: true, analyst: false, viewer: false },
                          { name: "Delete Reports", owner: true, manager: false, analyst: false, viewer: false },
                          { name: "Invite Team Members", owner: true, manager: true, analyst: false, viewer: false },
                          { name: "Manage Team Permissions", owner: true, manager: false, analyst: false, viewer: false },
                          { name: "Billing & Subscriptions", owner: true, manager: false, analyst: false, viewer: false },
                          { name: "Integration Setup", owner: true, manager: true, analyst: false, viewer: false }
                        ].map((permission, i) => (
                          <tr key={i} className="border-b">
                            <td className="py-3 font-medium">{permission.name}</td>
                            <td className="py-3 text-center">{permission.owner ? <CheckCircle2 className="h-4 w-4 text-green-500 mx-auto" /> : <AlertCircle className="h-4 w-4 text-muted-foreground mx-auto" />}</td>
                            <td className="py-3 text-center">{permission.manager ? <CheckCircle2 className="h-4 w-4 text-green-500 mx-auto" /> : <AlertCircle className="h-4 w-4 text-muted-foreground mx-auto" />}</td>
                            <td className="py-3 text-center">{permission.analyst ? <CheckCircle2 className="h-4 w-4 text-green-500 mx-auto" /> : <AlertCircle className="h-4 w-4 text-muted-foreground mx-auto" />}</td>
                            <td className="py-3 text-center">{permission.viewer ? <CheckCircle2 className="h-4 w-4 text-green-500 mx-auto" /> : <AlertCircle className="h-4 w-4 text-muted-foreground mx-auto" />}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default TeamManagement;
