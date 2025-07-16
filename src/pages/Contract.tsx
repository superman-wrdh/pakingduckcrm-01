import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Upload, Download, Eye, Calendar, User, Search, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contract = () => {
  const { toast } = useToast();
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [addContractorDialogOpen, setAddContractorDialogOpen] = useState(false);
  const [contractorViewDialogOpen, setContractorViewDialogOpen] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState<any>(null);
  const [contractors, setContractors] = useState([
    {
      id: 1,
      fullName: "John Smith",
      email: "john@premiumdesign.com",
      status: "active",
      mailingAddress: "123 Design Street, New York, NY 10001",
      baseCompensation: "$150,000/year",
      contractFile: "john_smith_contract.pdf",
      signedDate: "2024-01-01"
    },
    {
      id: 2,
      fullName: "Sarah Wilson",
      email: "sarah@creativesolutions.com",
      status: "pending",
      mailingAddress: "456 Creative Ave, Los Angeles, CA 90210",
      baseCompensation: "$120,000/year"
    },
    {
      id: 3,
      fullName: "Mike Johnson",
      email: "mike@artisandesigns.com",
      status: "active",
      mailingAddress: "789 Art District, Chicago, IL 60601",
      baseCompensation: "$180,000/year",
      contractFile: "mike_johnson_contract.pdf",
      signedDate: "2023-12-15"
    }
  ]);

  // Mock project data with contract status
  const projects = [
    {
      id: 1,
      name: "Organic Tea Collection",
      client: "Green Leaf Co.",
      designer: "Sarah Johnson",
      status: "contract_pending",
      contractStatus: "pending",
      startDate: "2024-01-15",
      budget: "$15,000",
      description: "Premium packaging design for organic tea collection"
    },
    {
      id: 2,
      name: "Luxury Perfume Box",
      client: "Essence Beauty",
      designer: "Mike Chen",
      status: "contract_signed",
      contractStatus: "signed",
      contractFile: "luxury_perfume_contract.pdf",
      signedDate: "2024-01-10",
      startDate: "2024-01-20",
      budget: "$25,000",
      description: "High-end packaging design for luxury perfume line"
    },
    {
      id: 3,
      name: "Electronics Packaging",
      client: "TechFlow Inc.",
      designer: "Emma Davis",
      status: "contract_signed",
      contractStatus: "signed",
      contractFile: "electronics_contract.pdf",
      signedDate: "2024-01-05",
      startDate: "2024-01-12",
      budget: "$30,000",
      description: "Modern packaging solution for electronic devices"
    },
    {
      id: 4,
      name: "Artisan Chocolate Boxes",
      client: "Sweet Dreams",
      designer: "Alex Kim",
      status: "contract_pending",
      contractStatus: "pending",
      startDate: "2024-02-01",
      budget: "$12,000",
      description: "Elegant packaging for premium chocolate collection"
    }
  ];


  const getStatusColor = (status: string) => {
    switch (status) {
      case "signed": 
      case "active": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "rejected": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  const handleUploadContract = (project: any) => {
    setSelectedProject(project);
    setUploadDialogOpen(true);
  };

  const handleViewContract = (project: any) => {
    setSelectedProject(project);
    setViewDialogOpen(true);
  };

  const handleDownloadContract = (project: any) => {
    // Simulate download
    toast({
      title: "Download Started",
      description: `Contract for ${project.name} is being downloaded.`,
    });
  };

  const handleContractUpload = () => {
    // Simulate upload
    toast({
      title: "Contract Uploaded",
      description: `Contract for ${selectedProject?.name} has been uploaded successfully.`,
    });
    setUploadDialogOpen(false);
  };

  const handleAddContractor = () => {
    // Simulate adding contractor
    toast({
      title: "Contractor Added",
      description: "New contractor contract has been added successfully.",
    });
    setAddContractorDialogOpen(false);
  };

  const handleViewContractorContract = (contractor: any) => {
    setSelectedContractor(contractor);
    setContractorViewDialogOpen(true);
  };

  const handleDownloadContractorContract = (contractor: any) => {
    // Simulate download
    toast({
      title: "Download Started",
      description: `Contract for ${contractor.fullName} is being downloaded.`,
    });
  };

  // Filter projects based on search term
  const filteredProjects = projects.filter(project => {
    const searchLower = searchTerm.toLowerCase();
    return (
      project.name.toLowerCase().includes(searchLower) ||
      project.client.toLowerCase().includes(searchLower) ||
      project.designer.toLowerCase().includes(searchLower) ||
      project.description.toLowerCase().includes(searchLower)
    );
  });

  const pendingProjects = filteredProjects.filter(p => p.contractStatus === "pending");
  const signedProjects = filteredProjects.filter(p => p.contractStatus === "signed");

  return (
    <main className="flex-1 p-6 bg-background overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Contract Management</h1>
            <p className="text-muted-foreground">
              Upload, view, and manage project contracts
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search contracts by project, client, or designer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs for Projects Contract and Contractor Contract */}
        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger 
              value="projects"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
            >
              Projects Contract
            </TabsTrigger>
            <TabsTrigger 
              value="contractors"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
            >
              Contractor Contract
            </TabsTrigger>
          </TabsList>

          {/* Projects Contract Tab */}
          <TabsContent value="projects" className="animate-fade-in">
            {/* Contract Stats */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Contracts</p>
                      <p className="text-2xl font-bold">{projects.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Pending Signature</p>
                      <p className="text-2xl font-bold">{pendingProjects.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Signed Contracts</p>
                      <p className="text-2xl font-bold">{signedProjects.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Pending Contracts Section */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Contracts Pending Upload
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project Name</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Designer</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingProjects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">{project.name}</TableCell>
                        <TableCell>{project.client}</TableCell>
                        <TableCell>{project.designer}</TableCell>
                        <TableCell>{project.budget}</TableCell>
                        <TableCell>{project.startDate}</TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            onClick={() => handleUploadContract(project)}
                            className="mr-2"
                          >
                            <Upload className="h-4 w-4 mr-1" />
                            Upload Contract
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Signed Contracts Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Signed Contracts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project Name</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Designer</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Signed Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {signedProjects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">{project.name}</TableCell>
                        <TableCell>{project.client}</TableCell>
                        <TableCell>{project.designer}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(project.contractStatus)}>
                            {project.contractStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>{project.signedDate}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleViewContract(project)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDownloadContract(project)}
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contractor Contract Tab */}
          <TabsContent value="contractors" className="animate-fade-in">
            {/* Contractor Stats */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Contractors</p>
                      <p className="text-2xl font-bold">{contractors.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Pending Contracts</p>
                      <p className="text-2xl font-bold">{contractors.filter(c => c.status === "pending").length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Contracts</p>
                      <p className="text-2xl font-bold">{contractors.filter(c => c.status === "active").length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Add Contract Button */}
            <div className="mb-6 flex justify-end">
              <Dialog open={addContractorDialogOpen} onOpenChange={setAddContractorDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Contract
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Contractor Contract</DialogTitle>
                    <DialogDescription>
                      Fill in the contractor details and upload their contract.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        placeholder="Enter contractor's full name"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter contractor's email"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="contract">Upload Contract</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="contract"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="col-span-3"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setAddContractorDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddContractor}>
                      Add Contractor
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Contractors Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Contractor Contracts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Full Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Mailing Address</TableHead>
                      <TableHead>Base Compensation</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contractors.map((contractor) => (
                      <TableRow key={contractor.id}>
                        <TableCell className="font-medium">{contractor.fullName}</TableCell>
                        <TableCell>{contractor.email}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(contractor.status)}>
                            {contractor.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate" title={contractor.mailingAddress}>
                          {contractor.mailingAddress}
                        </TableCell>
                        <TableCell>{contractor.baseCompensation}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleViewContractorContract(contractor)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            {contractor.contractFile && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleDownloadContractorContract(contractor)}
                              >
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Upload Contract Dialog */}
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Upload Contract</DialogTitle>
              <DialogDescription>
                Upload the contract for {selectedProject?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="contract-file">Contract File</Label>
                <Input id="contract-file" type="file" accept=".pdf,.doc,.docx" />
              </div>
              <div>
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea id="notes" placeholder="Add any additional notes..." />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleContractUpload}>
                  Upload Contract
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* View Contract Dialog */}
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Contract Details</DialogTitle>
              <DialogDescription>
                Contract information for {selectedProject?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Project Name</Label>
                  <p className="text-sm text-muted-foreground">{selectedProject?.name}</p>
                </div>
                <div>
                  <Label className="font-semibold">Client</Label>
                  <p className="text-sm text-muted-foreground">{selectedProject?.client}</p>
                </div>
                <div>
                  <Label className="font-semibold">Designer</Label>
                  <p className="text-sm text-muted-foreground">{selectedProject?.designer}</p>
                </div>
                <div>
                  <Label className="font-semibold">Budget</Label>
                  <p className="text-sm text-muted-foreground">{selectedProject?.budget}</p>
                </div>
                <div>
                  <Label className="font-semibold">Signed Date</Label>
                  <p className="text-sm text-muted-foreground">{selectedProject?.signedDate}</p>
                </div>
                <div>
                  <Label className="font-semibold">Contract File</Label>
                  <p className="text-sm text-muted-foreground">{selectedProject?.contractFile}</p>
                </div>
              </div>
              <div>
                <Label className="font-semibold">Description</Label>
                <p className="text-sm text-muted-foreground">{selectedProject?.description}</p>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
                  Close
                </Button>
                <Button onClick={() => handleDownloadContract(selectedProject)}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Contract
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* View Contractor Contract Dialog */}
        <Dialog open={contractorViewDialogOpen} onOpenChange={setContractorViewDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Contractor Contract Details</DialogTitle>
              <DialogDescription>
                Contract information for {selectedContractor?.fullName}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Full Name</Label>
                  <p className="text-sm text-muted-foreground">{selectedContractor?.fullName}</p>
                </div>
                <div>
                  <Label className="font-semibold">Email</Label>
                  <p className="text-sm text-muted-foreground">{selectedContractor?.email}</p>
                </div>
                <div>
                  <Label className="font-semibold">Status</Label>
                  <Badge className={getStatusColor(selectedContractor?.status)}>
                    {selectedContractor?.status}
                  </Badge>
                </div>
                <div>
                  <Label className="font-semibold">Base Compensation</Label>
                  <p className="text-sm text-muted-foreground">{selectedContractor?.baseCompensation}</p>
                </div>
                <div className="col-span-2">
                  <Label className="font-semibold">Mailing Address</Label>
                  <p className="text-sm text-muted-foreground">{selectedContractor?.mailingAddress}</p>
                </div>
                {selectedContractor?.signedDate && (
                  <div>
                    <Label className="font-semibold">Signed Date</Label>
                    <p className="text-sm text-muted-foreground">{selectedContractor?.signedDate}</p>
                  </div>
                )}
                {selectedContractor?.contractFile && (
                  <div>
                    <Label className="font-semibold">Contract File</Label>
                    <p className="text-sm text-muted-foreground">{selectedContractor?.contractFile}</p>
                  </div>
                )}
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setContractorViewDialogOpen(false)}>
                  Close
                </Button>
                {selectedContractor?.contractFile && (
                  <Button onClick={() => handleDownloadContractorContract(selectedContractor)}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Contract
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
};

export default Contract;