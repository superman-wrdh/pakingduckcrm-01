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

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedDesigner, setSelectedDesigner] = useState("");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false);
  const [newProjectForm, setNewProjectForm] = useState({
    name: "",
    client: "",
    designer: "",
    description: ""
  });

  const handleDelete = (projectId: number) => {
    console.log("Delete project:", projectId);
    // Handle delete logic here
  };

  const handleCreateProject = () => {
    if (!newProjectForm.name || !newProjectForm.client || !newProjectForm.designer || !newProjectForm.description) {
      alert("Please fill in all fields");
      return;
    }
    
    const newProject = {
      id: projects.length + 1,
      name: newProjectForm.name,
      client: newProjectForm.client,
      designer: newProjectForm.designer,
      status: "project initiation",
      progress: 1,
      description: newProjectForm.description,
      startDate: new Date().toISOString().split('T')[0],
      deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 60 days from now
      projectManager: newProjectForm.designer,
      email: `${newProjectForm.designer.toLowerCase().replace(' ', '.')}@company.com`,
      attachments: {
        contract: `${newProjectForm.name.toLowerCase().replace(/\s+/g, '-')}-contract.pdf`,
        rfq: `${newProjectForm.name.toLowerCase().replace(/\s+/g, '-')}-rfq.pdf`,
        invoice: `${newProjectForm.name.toLowerCase().replace(/\s+/g, '-')}-invoice.pdf`
      },
      designs: []
    };

    console.log("Creating new project:", newProject);
    // Here you would typically add the project to your state/database
    
    // Reset form and close dialog
    setNewProjectForm({ name: "", client: "", designer: "", description: "" });
    setIsNewProjectDialogOpen(false);
  };

  const projects = [
    {
      id: 1,
      name: "Organic Tea Collection",
      client: "Green Leaf Co.",
      designer: "Sarah Johnson",
      status: "design development",
      progress: 2, // design stage
      description: "A comprehensive packaging design for organic tea products featuring eco-friendly materials and elegant branding.",
      startDate: "2024-01-15",
      deadline: "2024-03-15",
      projectManager: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      attachments: {
        contract: "organic-tea-contract.pdf",
        rfq: "organic-tea-rfq.pdf",
        invoice: "organic-tea-invoice.pdf"
      },
      designs: [
        { id: 1, name: "Initial Concept", version: "v1.0", date: "2024-01-20", image: "/lovable-uploads/041ed525-f28d-4ee3-87e3-6a639240ce08.png" },
        { id: 2, name: "Refined Design", version: "v2.0", date: "2024-02-10", image: "/lovable-uploads/041ed525-f28d-4ee3-87e3-6a639240ce08.png" },
        { id: 3, name: "Final Version", version: "v3.0", date: "2024-02-25", image: "/lovable-uploads/041ed525-f28d-4ee3-87e3-6a639240ce08.png" }
      ]
    },
    {
      id: 2,
      name: "Luxury Perfume Box",
      client: "Essence Beauty",
      designer: "Mike Chen",
      status: "prototyping",
      progress: 3, // manufacturing stage
      description: "Premium luxury packaging design for high-end perfume collection with custom finishes and materials.",
      startDate: "2024-02-01",
      deadline: "2024-04-01",
      projectManager: "Mike Chen",
      email: "mike.chen@company.com",
      attachments: {
        contract: "perfume-box-contract.pdf",
        rfq: "perfume-box-rfq.pdf",
        invoice: "perfume-box-invoice.pdf"
      },
      designs: [
        { id: 1, name: "Luxury Concept", version: "v1.0", date: "2024-02-05", image: "/lovable-uploads/041ed525-f28d-4ee3-87e3-6a639240ce08.png" },
        { id: 2, name: "Premium Design", version: "v2.0", date: "2024-02-20", image: "/lovable-uploads/041ed525-f28d-4ee3-87e3-6a639240ce08.png" }
      ]
    },
    {
      id: 3,
      name: "Electronics Packaging",
      client: "TechFlow Inc.",
      designer: "Emma Davis",
      status: "complete",
      progress: 5, // completed
      description: "Protective and branded packaging solution for electronic components and accessories.",
      startDate: "2023-12-01",
      deadline: "2024-02-28",
      projectManager: "Emma Davis",
      email: "emma.davis@company.com",
      attachments: {
        contract: "electronics-contract.pdf",
        rfq: "electronics-rfq.pdf",
        invoice: "electronics-invoice.pdf"
      },
      designs: [
        { id: 1, name: "Tech Design", version: "v1.0", date: "2023-12-15", image: "/lovable-uploads/041ed525-f28d-4ee3-87e3-6a639240ce08.png" },
        { id: 2, name: "Final Tech Design", version: "v2.0", date: "2024-01-10", image: "/lovable-uploads/041ed525-f28d-4ee3-87e3-6a639240ce08.png" },
        { id: 3, name: "Production Ready", version: "v3.0", date: "2024-02-01", image: "/lovable-uploads/041ed525-f28d-4ee3-87e3-6a639240ce08.png" }
      ]
    },
    {
      id: 4,
      name: "Artisan Chocolate Boxes",
      client: "Sweet Dreams",
      designer: "Alex Kim",
      status: "project initiation",
      progress: 1, // preparation stage
      description: "Handcrafted packaging design for premium artisan chocolate collection with seasonal variations.",
      startDate: "2024-03-01",
      deadline: "2024-05-01",
      projectManager: "Alex Kim",
      email: "alex.kim@company.com",
      attachments: {
        contract: "chocolate-contract.pdf",
        rfq: "chocolate-rfq.pdf",
        invoice: "chocolate-invoice.pdf"
      },
      designs: [
        { id: 1, name: "Artisan Concept", version: "v1.0", date: "2024-03-05", image: "/lovable-uploads/041ed525-f28d-4ee3-87e3-6a639240ce08.png" }
      ]
    },
    {
      id: 5,
      name: "Wine Label Design",
      client: "Vintage Cellars",
      designer: "Lisa Wang",
      status: "testing & refinement",
      progress: 3, // manufacturing stage
      description: "Elegant wine label and packaging design reflecting the heritage and quality of vintage wines.",
      startDate: "2024-01-20",
      deadline: "2024-04-20",
      projectManager: "Lisa Wang",
      email: "lisa.wang@company.com",
      attachments: {
        contract: "wine-label-contract.pdf",
        rfq: "wine-label-rfq.pdf",
        invoice: "wine-label-invoice.pdf"
      },
      designs: [
        { id: 1, name: "Classic Label", version: "v1.0", date: "2024-01-25", image: "/lovable-uploads/041ed525-f28d-4ee3-87e3-6a639240ce08.png" },
        { id: 2, name: "Vintage Style", version: "v2.0", date: "2024-02-15", image: "/lovable-uploads/041ed525-f28d-4ee3-87e3-6a639240ce08.png" }
      ]
    },
    {
      id: 6,
      name: "Cosmetic Line Packaging",
      client: "Beauty Plus",
      designer: "David Lee",
      status: "production",
      progress: 4, // shipment stage
      description: "Complete packaging system for new cosmetic line including boxes, tubes, and promotional materials.",
      startDate: "2024-02-10",
      deadline: "2024-05-10",
      projectManager: "David Lee",
      email: "david.lee@company.com",
      attachments: {
        contract: "cosmetic-contract.pdf",
        rfq: "cosmetic-rfq.pdf",
        invoice: "cosmetic-invoice.pdf"
      },
      designs: [
        { id: 1, name: "Cosmetic Line Design", version: "v1.0", date: "2024-02-15", image: "/lovable-uploads/041ed525-f28d-4ee3-87e3-6a639240ce08.png" },
        { id: 2, name: "Updated Design", version: "v2.0", date: "2024-03-01", image: "/lovable-uploads/041ed525-f28d-4ee3-87e3-6a639240ce08.png" }
      ]
    },
    {
      id: 7,
      name: "Software Box Design",
      client: "CodeCraft",
      designer: "Sarah Johnson",
      status: "delivering",
      progress: 4, // shipment stage
      description: "Professional software packaging design for enterprise software products with technical specifications.",
      startDate: "2024-01-05",
      deadline: "2024-03-05",
      projectManager: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      attachments: {
        contract: "software-contract.pdf",
        rfq: "software-rfq.pdf",
        invoice: "software-invoice.pdf"
      },
      designs: [
        { id: 1, name: "Software Box V1", version: "v1.0", date: "2024-01-10", image: "/lovable-uploads/041ed525-f28d-4ee3-87e3-6a639240ce08.png" },
        { id: 2, name: "Software Box V2", version: "v2.0", date: "2024-01-25", image: "/lovable-uploads/041ed525-f28d-4ee3-87e3-6a639240ce08.png" }
      ]
    },
    {
      id: 8,
      name: "Jewelry Box Collection",
      client: "Diamond Dreams",
      designer: "Mike Chen",
      status: "design development",
      progress: 2, // design stage
      description: "Luxury jewelry packaging collection with velvet interiors and premium finishes for high-end jewelry pieces.",
      startDate: "2024-02-15",
      deadline: "2024-04-15",
      projectManager: "Mike Chen",
      email: "mike.chen@company.com",
      attachments: {
        contract: "jewelry-contract.pdf",
        rfq: "jewelry-rfq.pdf",
        invoice: "jewelry-invoice.pdf"
      },
      designs: [
        { id: 1, name: "Jewelry Collection", version: "v1.0", date: "2024-02-20", image: "/lovable-uploads/041ed525-f28d-4ee3-87e3-6a639240ce08.png" }
      ]
    }
  ];

  const statusOptions = [
    "project initiation",
    "design development", 
    "prototyping",
    "testing & refinement",
    "production",
    "delivering",
    "complete"
  ];

  const clients = [...new Set(projects.map(p => p.client))];
  const designers = [...new Set(projects.map(p => p.designer))];

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

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.designer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClient = !selectedClient || selectedClient === "all-clients" || project.client === selectedClient;
    const matchesDesigner = !selectedDesigner || selectedDesigner === "all-designers" || project.designer === selectedDesigner;
    
    return matchesSearch && matchesClient && matchesDesigner;
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
                  <Select value={newProjectForm.client} onValueChange={(value) => setNewProjectForm(prev => ({ ...prev, client: value }))}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client} value={client}>
                          {client}
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
                        <SelectItem key={designer} value={designer}>
                          {designer}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
              <div className="text-2xl font-bold text-foreground">8</div>
              <p className="text-sm text-muted-foreground">Total Projects</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-foreground">6</div>
              <p className="text-sm text-muted-foreground">Active Projects</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-foreground">1</div>
              <p className="text-sm text-muted-foreground">Completed This Month</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-foreground">3</div>
              <p className="text-sm text-muted-foreground">Unpaid Projects</p>
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
              <SelectValue placeholder="Filter by designer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-designers">All designers</SelectItem>
              {designers.map((designer) => (
                <SelectItem key={designer} value={designer}>
                  {designer}
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
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell>{project.client}</TableCell>
                    <TableCell>{project.designer}</TableCell>
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
                          <SheetContent className="w-[66.67vw] max-w-none">
                            <ProjectDetailsView project={selectedProject} />
                          </SheetContent>
                        </Sheet>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <UserPlus className="h-4 w-4" />
                        </Button>
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
                                onClick={() => handleDelete(project.id)}
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
          <Progress value={(project.progress / 5) * 100} className="w-full" />
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
                <span className="text-muted-foreground">Designer:</span>
                <span className="font-medium">{project.designer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Start Date:</span>
                <span className="font-medium">{project.startDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Deadline:</span>
                <span className="font-medium">{project.deadline}</span>
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
                    {project.projectManager.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{project.projectManager}</p>
                  <p className="text-sm text-muted-foreground">{project.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Design History Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Design History</h3>
          <Tabs defaultValue="gallery" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="gallery">Gallery View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            <TabsContent value="gallery" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {project.designs?.map((design: any) => (
                  <Card key={design.id} className="overflow-hidden">
                    <div className="aspect-square bg-gray-100 flex items-center justify-center">
                      <img 
                        src={design.image} 
                        alt={design.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-3">
                      <p className="font-medium text-sm">{design.name}</p>
                      <p className="text-xs text-muted-foreground">{design.version}</p>
                      <p className="text-xs text-muted-foreground">{design.date}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="list" className="space-y-2">
              {project.designs?.map((design: any) => (
                <Card key={design.id}>
                  <CardContent className="flex items-center space-x-4 p-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <img 
                        src={design.image} 
                        alt={design.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{design.name}</p>
                      <p className="text-sm text-muted-foreground">Version: {design.version}</p>
                      <p className="text-sm text-muted-foreground">Date: {design.date}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Attachments Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Attachments</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Contract</p>
                  <p className="text-xs text-muted-foreground">{project.attachments.contract}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleDownload(project.attachments.contract)}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">RFQ</p>
                  <p className="text-xs text-muted-foreground">{project.attachments.rfq}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleDownload(project.attachments.rfq)}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Invoice</p>
                  <p className="text-xs text-muted-foreground">{project.attachments.invoice}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleDownload(project.attachments.invoice)}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;