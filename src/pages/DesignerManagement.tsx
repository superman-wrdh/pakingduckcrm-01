import { useState } from "react";
import { Eye, UserPlus, Trash2, X, Plus, Search, Users, UserCheck } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";

interface Designer {
  id: string;
  name: string;
  status: "Active" | "Inactive" | "Busy";
  email: string;
  type: "Senior Designer" | "Junior Designer" | "Lead Designer" | "UI/UX Designer";
  location: string;
}

interface Project {
  id: string;
  name: string;
  status: "Active" | "Completed" | "On Hold";
  startDate: string;
  endDate?: string;
  description: string;
}

const mockDesigners: Designer[] = [
  {
    id: "1",
    name: "Alice Johnson",
    status: "Active",
    email: "alice.johnson@company.com",
    type: "Senior Designer",
    location: "New York, USA"
  },
  {
    id: "2",
    name: "Bob Chen",
    status: "Busy",
    email: "bob.chen@company.com",
    type: "UI/UX Designer",
    location: "San Francisco, USA"
  },
  {
    id: "3",
    name: "Carol Martinez",
    status: "Active",
    email: "carol.martinez@company.com",
    type: "Lead Designer",
    location: "Los Angeles, USA"
  },
  {
    id: "4",
    name: "David Kim",
    status: "Inactive",
    email: "david.kim@company.com",
    type: "Junior Designer",
    location: "Seattle, USA"
  },
  {
    id: "5",
    name: "Emma Wilson",
    status: "Active",
    email: "emma.wilson@company.com",
    type: "Senior Designer",
    location: "Chicago, USA"
  },
  {
    id: "6",
    name: "Frank Brown",
    status: "Busy",
    email: "frank.brown@company.com",
    type: "UI/UX Designer",
    location: "Boston, USA"
  },
  {
    id: "7",
    name: "Grace Lee",
    status: "Active",
    email: "grace.lee@company.com",
    type: "Senior Designer",
    location: "Austin, USA"
  },
  {
    id: "8",
    name: "Henry Garcia",
    status: "Active",
    email: "henry.garcia@company.com",
    type: "Lead Designer",
    location: "Miami, USA"
  },
  {
    id: "9",
    name: "Ivy Zhang",
    status: "Inactive",
    email: "ivy.zhang@company.com",
    type: "Junior Designer",
    location: "Portland, USA"
  },
  {
    id: "10",
    name: "Jack Thompson",
    status: "Active",
    email: "jack.thompson@company.com",
    type: "Senior Designer",
    location: "Denver, USA"
  },
];

const ITEMS_PER_PAGE = 10;

// Mock projects data
const mockProjects: Project[] = [
  {
    id: "1",
    name: "E-commerce Website Redesign",
    status: "Active",
    startDate: "2024-01-15",
    description: "Complete redesign of the e-commerce platform"
  },
  {
    id: "2",
    name: "Mobile App UI Design",
    status: "Completed",
    startDate: "2023-10-01",
    endDate: "2023-12-15",
    description: "UI design for mobile application"
  },
  {
    id: "3",
    name: "Brand Identity Package",
    status: "Active",
    startDate: "2024-02-01",
    description: "Complete brand identity design package"
  },
  {
    id: "4",
    name: "Dashboard Analytics Tool",
    status: "Completed",
    startDate: "2023-08-01",
    endDate: "2023-11-30",
    description: "Analytics dashboard interface design"
  },
  {
    id: "5",
    name: "Marketing Website",
    status: "On Hold",
    startDate: "2024-01-01",
    description: "Marketing website design and development"
  }
];

// Mock designer-project assignments
const designerProjects: { [key: string]: string[] } = {
  "1": ["1", "3"], // Alice has projects 1 and 3
  "2": ["2"], // Bob has project 2
  "3": ["4"], // Carol has project 4
  "4": [], // David has no projects
  "5": ["5"], // Emma has project 5
};

export default function DesignerManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDesigner, setSelectedDesigner] = useState<Designer | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const totalPages = Math.ceil(mockDesigners.length / ITEMS_PER_PAGE);
  
  // Filter designers based on search and status
  const filteredDesigners = mockDesigners.filter(designer => {
    const matchesSearch = designer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         designer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || designer.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });
  
  const filteredTotalPages = Math.ceil(filteredDesigners.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentDesigners = filteredDesigners.slice(startIndex, endIndex);

  // Statistics
  const totalDesigners = mockDesigners.length;
  const activeDesigners = mockDesigners.filter(d => d.status === "Active").length;

  const getStatusVariant = (status: Designer["status"]) => {
    switch (status) {
      case "Active":
        return "default";
      case "Busy":
        return "secondary";
      case "Inactive":
        return "outline";
      default:
        return "outline";
    }
  };

  const handleProjectsList = (designerId: string) => {
    const designer = mockDesigners.find(d => d.id === designerId);
    if (designer) {
      setSelectedDesigner(designer);
      setShowDetailsDialog(true);
    }
  };

  const handleAssignProject = (designerId: string) => {
    const designer = mockDesigners.find(d => d.id === designerId);
    if (designer) {
      setSelectedDesigner(designer);
      setSelectedProjects(designerProjects[designerId] || []);
      setShowAssignDialog(true);
    }
  };

  const handleDelete = (designerId: string) => {
    console.log("Delete designer:", designerId);
    // Handle delete logic here
  };

  const getDesignerProjects = (designerId: string) => {
    const projectIds = designerProjects[designerId] || [];
    return projectIds.map(id => mockProjects.find(p => p.id === id)!).filter(Boolean);
  };

  const getCurrentProjects = (designerId: string) => {
    return getDesignerProjects(designerId).filter(p => p.status === "Active");
  };

  const getPastProjects = (designerId: string) => {
    return getDesignerProjects(designerId).filter(p => p.status === "Completed");
  };

  const handleProjectToggle = (projectId: string) => {
    setSelectedProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handleSaveAssignment = () => {
    if (selectedDesigner) {
      designerProjects[selectedDesigner.id] = selectedProjects;
      setShowAssignDialog(false);
      setSelectedDesigner(null);
      setSelectedProjects([]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Designer Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage your design team and assign projects
          </p>
        </div>
        <Button>Add New Designer</Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Designers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDesigners}</div>
            <p className="text-xs text-muted-foreground">
              All registered designers
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Designers</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeDesigners}</div>
            <p className="text-xs text-muted-foreground">
              Currently available designers
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search designers..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={(value) => {
          setStatusFilter(value);
          setCurrentPage(1); // Reset to first page when filtering
        }}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="busy">Busy</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Designer Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Primary Email</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentDesigners.map((designer) => (
              <TableRow key={designer.id}>
                <TableCell className="font-medium">{designer.name}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(designer.status)}>
                    {designer.status}
                  </Badge>
                </TableCell>
                <TableCell>{designer.email}</TableCell>
                <TableCell>{designer.type}</TableCell>
                <TableCell>{designer.location}</TableCell>
                <TableCell className="text-right">
                  <div className="flex space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleProjectsList(designer.id)}
                      title="View Details"
                      className="h-8 w-8 p-0"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAssignProject(designer.id)}
                      title="Assign Projects"
                      className="h-8 w-8 p-0"
                    >
                      <UserPlus className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          title="Delete Designer"
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the designer
                            "{designer.name}" and remove their data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(designer.id)}
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
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {startIndex + 1}-{Math.min(endIndex, filteredDesigners.length)} of {filteredDesigners.length} items
        </p>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Items per page</span>
            <select 
              className="h-8 w-16 border border-input bg-background px-2 text-sm rounded"
              defaultValue={ITEMS_PER_PAGE}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
          
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                />
              </PaginationItem>
              
              {Array.from({ length: filteredTotalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={page === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(page);
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < filteredTotalPages) setCurrentPage(currentPage + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      {/* View Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Designer Details</DialogTitle>
            <DialogDescription>
              View current and past projects for {selectedDesigner?.name}
            </DialogDescription>
          </DialogHeader>
          
          {selectedDesigner && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Name</p>
                  <p className="font-medium">{selectedDesigner.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge variant={getStatusVariant(selectedDesigner.status)}>
                    {selectedDesigner.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p>{selectedDesigner.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Type</p>
                  <p>{selectedDesigner.type}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-muted-foreground">Location</p>
                  <p>{selectedDesigner.location}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-lg mb-3">Current Projects</h4>
                  {getCurrentProjects(selectedDesigner.id).length > 0 ? (
                    <div className="space-y-2">
                      {getCurrentProjects(selectedDesigner.id).map((project) => (
                        <div key={project.id} className="p-3 border rounded-lg">
                          <div className="flex items-start justify-between">
                            <div>
                              <h5 className="font-medium">{project.name}</h5>
                              <p className="text-sm text-muted-foreground">{project.description}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Started: {project.startDate}
                              </p>
                            </div>
                            <Badge variant="default">{project.status}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No current projects assigned</p>
                  )}
                </div>

                <div>
                  <h4 className="font-medium text-lg mb-3">Past Projects</h4>
                  {getPastProjects(selectedDesigner.id).length > 0 ? (
                    <div className="space-y-2">
                      {getPastProjects(selectedDesigner.id).map((project) => (
                        <div key={project.id} className="p-3 border rounded-lg bg-muted/30">
                          <div className="flex items-start justify-between">
                            <div>
                              <h5 className="font-medium">{project.name}</h5>
                              <p className="text-sm text-muted-foreground">{project.description}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {project.startDate} - {project.endDate}
                              </p>
                            </div>
                            <Badge variant="secondary">{project.status}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No past projects</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Assign Projects Dialog */}
      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Assign Projects</DialogTitle>
            <DialogDescription>
              Select projects to assign to {selectedDesigner?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {mockProjects.map((project) => (
              <div key={project.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                <Checkbox
                  id={project.id}
                  checked={selectedProjects.includes(project.id)}
                  onCheckedChange={() => handleProjectToggle(project.id)}
                />
                <div className="flex-1">
                  <label
                    htmlFor={project.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {project.name}
                  </label>
                  <p className="text-xs text-muted-foreground mt-1">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={project.status === "Active" ? "default" : project.status === "Completed" ? "secondary" : "outline"}>
                      {project.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Started: {project.startDate}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAssignDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveAssignment}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}