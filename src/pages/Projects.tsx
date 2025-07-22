import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Eye, UserPlus, Trash2, Download, CheckCircle2, Calendar, User, Image } from "lucide-react";
import { useState } from "react";
import { useProjectsWithDesigners } from "@/hooks/useProjectsWithDesigners";
import { useDesignerProfiles } from "@/hooks/useDesignerProfiles";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const Projects = () => {
  const { projects, loading, getProjectStats, getStatusColor, assignDesignerToProject, unassignDesignerFromProject } = useProjectsWithDesigners();
  const { designers } = useDesignerProfiles();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedDesigner, setSelectedDesigner] = useState("");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [projectToAssign, setProjectToAssign] = useState<any>(null);
  const [newProjectForm, setNewProjectForm] = useState({
    name: "",
    client: "",
    type: "",
    designer: "",
    description: "",
    due_date: ""
  });


  const handleCreateProject = async () => {
    if (!newProjectForm.name || !newProjectForm.client || !newProjectForm.type || !newProjectForm.designer || !newProjectForm.description || !newProjectForm.due_date) {
      alert("Please fill in all fields");
      return;
    }
    
    if (!user) {
      alert("You must be logged in to create a project");
      return;
    }

    try {
      const { error } = await supabase
        .from('projects')
        .insert({
          name: newProjectForm.name,
          client: newProjectForm.client,
          type: newProjectForm.type,
          designer: newProjectForm.designer,
          description: newProjectForm.description,
          due_date: newProjectForm.due_date,
          status: "project initiation",
          user_id: user.id
        });

      if (error) {
        throw error;
      }

      // Reset form and close dialog
      setNewProjectForm({ name: "", client: "", type: "", designer: "", description: "", due_date: "" });
      setIsNewProjectDialogOpen(false);
      
      // Refresh the projects list
      window.location.reload();
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project');
    }
  };

  const statusOptions = [
    "project initiation",
    "design development", 
    "prototyping",
    "testing & refinement",
    "production",
    "delivering",
    "complete"
  ];

  const typeOptions = [
    "Packaging Design",
    "Label Design", 
    "Brand Identity",
    "Product Design",
    "Web Design",
    "Print Design"
  ];

  const handleAssignDesigner = async (designerId: string) => {
    if (!projectToAssign) return;
    
    const success = await assignDesignerToProject(projectToAssign.id, designerId);
    if (success) {
      setIsAssignDialogOpen(false);
      setProjectToAssign(null);
    }
  };

  const handleUnassignDesigner = async (projectId: string) => {
    const success = await unassignDesignerFromProject(projectId);
    // Refresh handled by the hook
  };

  const clients = [...new Set(projects.map(p => p.client))];
  const stats = getProjectStats();


  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClient = !selectedClient || selectedClient === "all-clients" || project.client === selectedClient;
    
    return matchesSearch && matchesClient;
  });

  return (
    <main className="flex-1 p-6 bg-background overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Projects Management</h1>
            <p className="text-muted-foreground">
              Manage your design projects and track their progress.
            </p>
          </div>
          <Dialog open={isNewProjectDialogOpen} onOpenChange={setIsNewProjectDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>
                  Fill in the project details below to create a new project.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="project-name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="project-name"
                    value={newProjectForm.name}
                    onChange={(e) => setNewProjectForm(prev => ({ ...prev, name: e.target.value }))}
                    className="col-span-3"
                    placeholder="Enter project name"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="project-client" className="text-right">
                    Client
                  </Label>
                  <Input
                    id="project-client"
                    value={newProjectForm.client}
                    onChange={(e) => setNewProjectForm(prev => ({ ...prev, client: e.target.value }))}
                    className="col-span-3"
                    placeholder="Enter client name"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="project-type" className="text-right">
                    Type
                  </Label>
                  <Select value={newProjectForm.type} onValueChange={(value) => setNewProjectForm(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      {typeOptions.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="project-designer" className="text-right">
                    Designer
                  </Label>
                  <Select value={newProjectForm.designer} onValueChange={(value) => setNewProjectForm(prev => ({ ...prev, designer: value }))}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select designer" />
                    </SelectTrigger>
                    <SelectContent>
                      {designers.map((designer) => (
                        <SelectItem key={designer.id} value={designer.name || 'Unknown'}>
                          {designer.name || 'Unknown Designer'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="project-due-date" className="text-right">
                    Due Date
                  </Label>
                  <Input
                    id="project-due-date"
                    type="date"
                    value={newProjectForm.due_date}
                    onChange={(e) => setNewProjectForm(prev => ({ ...prev, due_date: e.target.value }))}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="project-description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="project-description"
                    value={newProjectForm.description}
                    onChange={(e) => setNewProjectForm(prev => ({ ...prev, description: e.target.value }))}
                    className="col-span-3"
                    placeholder="Enter project description"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewProjectDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateProject}>Create Project</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Project Stats */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-foreground">{stats.totalProjects}</div>
              <p className="text-sm text-muted-foreground">Total Projects</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-foreground">{stats.activeProjects}</div>
              <p className="text-sm text-muted-foreground">Active Projects</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-foreground">{stats.completedThisMonth}</div>
              <p className="text-sm text-muted-foreground">Completed This Month</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-foreground">{stats.inProgress}</div>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedClient} onValueChange={setSelectedClient}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by client" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-clients">All clients</SelectItem>
              {clients.map((client) => (
                <SelectItem key={client} value={client}>
                  {client}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedDesigner} onValueChange={setSelectedDesigner}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-types">All types</SelectItem>
              {typeOptions.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Projects Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
               <TableHeader>
                 <TableRow>
                   <TableHead>Project Name</TableHead>
                   <TableHead>Client</TableHead>
                   <TableHead>Designer</TableHead>
                   <TableHead>Type</TableHead>
                   <TableHead>Status</TableHead>
                   <TableHead className="text-right">Actions</TableHead>
                 </TableRow>
               </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell>{project.client}</TableCell>
                     <TableCell>
                       {project.designer ? (
                         <div className="flex items-center gap-2">
                           <span>{project.designer.name}</span>
                           <Button 
                             variant="ghost" 
                             size="sm"
                             onClick={() => handleUnassignDesigner(project.id)}
                             className="h-4 w-4 p-0 text-muted-foreground hover:text-foreground"
                           >
                             ×
                           </Button>
                         </div>
                       ) : (
                         'Not assigned'
                       )}
                     </TableCell>
                    <TableCell>{project.type}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex space-x-1">
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => setSelectedProject(project)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </SheetTrigger>
                          <SheetContent className="w-[140vw] max-w-none">
                            <ProjectDetailsView project={selectedProject} />
                          </SheetContent>
                        </Sheet>
                        <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => setProjectToAssign(project)}
                            >
                              <UserPlus className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Assign Designer</DialogTitle>
                              <DialogDescription>
                                Select a designer to assign to "{projectToAssign?.name}"
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              {designers.map((designer) => (
                                <Button
                                  key={designer.id}
                                  variant="outline"
                                  className="justify-start"
                                  onClick={() => handleAssignDesigner(designer.id)}
                                >
                                  <div className="flex flex-col items-start">
                                    <span className="font-medium">{designer.name}</span>
                                    <span className="text-xs text-muted-foreground">{designer.type}</span>
                                  </div>
                                </Button>
                              ))}
                            </div>
                          </DialogContent>
                        </Dialog>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the project
                                "{project.name}" and remove all its data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => console.log('Delete project:', project.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            1-10 of 38 items
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive={false}>2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive={false}>3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive={false}>4</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive={false}>5</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Items per page</span>
            <Select defaultValue="12">
              <SelectTrigger className="w-16">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12">12</SelectItem>
                <SelectItem value="24">24</SelectItem>
                <SelectItem value="48">48</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </main>
  );
};

// Project Details View Component
const ProjectDetailsView = ({ project }: { project: any }) => {
  if (!project) return null;

  const progressStages = [
    { name: "Preparation stage", stage: 1 },
    { name: "Design stage", stage: 2 },
    { name: "Manufacturing stage", stage: 3 },
    { name: "Shipment stage", stage: 4 },
    { name: "Completed", stage: 5 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "project initiation": return "bg-gray-100 text-gray-800";
      case "design development": return "bg-blue-100 text-blue-800";
      case "prototyping": return "bg-purple-100 text-purple-800";
      case "testing & refinement": return "bg-yellow-100 text-yellow-800";
      case "production": return "bg-orange-100 text-orange-800";
      case "delivering": return "bg-cyan-100 text-cyan-800";
      case "complete": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleDownload = (fileName: string) => {
    console.log("Downloading:", fileName);
    // Handle download logic here
  };

  return (
    <div className="h-full flex flex-col">
      <SheetHeader className="mb-6">
        <SheetTitle className="text-2xl font-bold">{project.name}</SheetTitle>
        <SheetDescription className="text-base">
          {project.description}
        </SheetDescription>
      </SheetHeader>

      <div className="flex-1 overflow-y-auto space-y-6">
        {/* Progress Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Progress</h3>
          <div className="flex flex-wrap gap-3">
            {progressStages.map((stage) => (
              <div
                key={stage.stage}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  stage.stage <= project.progress
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {stage.name}
              </div>
            ))}
          </div>
          <Progress value={20} className="w-full" />
        </div>

        {/* Project Info and Manager Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Project Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Client:</span>
                <span className="font-medium">{project.client}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type:</span>
                <span className="font-medium">{project.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created:</span>
                <span className="font-medium">{new Date(project.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Due Date:</span>
                <span className="font-medium">{new Date(project.due_date).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Project Manager */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Project Manager</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3">
                 <Avatar className="h-12 w-12">
                   <AvatarImage src="" />
                   <AvatarFallback>
                     {project.projectManager ? project.projectManager.split(' ').map((n: string) => n[0]).join('') : 'PM'}
                   </AvatarFallback>
                 </Avatar>
                 <div>
                   <p className="font-medium">{project.projectManager || 'Project Manager'}</p>
                   <p className="text-sm text-muted-foreground">{project.email || 'No email set'}</p>
                 </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Design History Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Design History</h3>
          <div className="text-sm text-muted-foreground p-4 bg-muted/20 rounded-lg">
            No designs uploaded yet. Design files will appear here once uploaded.
          </div>
        </div>

        {/* Attachments Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Attachments</h3>
          <div className="text-sm text-muted-foreground p-4 bg-muted/20 rounded-lg">
            No attachments uploaded yet. Project files will appear here once uploaded.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;