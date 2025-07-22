import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Plus, UserPlus, Building2, User, Award, Users2, Package, Activity, Link, Eye, Settings, Trash2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Calendar, Clock, CheckCircle } from "lucide-react";
import { useClientProfiles, Client } from "@/hooks/useClientProfiles";
import { useAuth } from "@/contexts/AuthContext";

interface Project {
  id: number;
  name: string;
  status: 'ongoing' | 'completed' | 'on-hold';
  startDate: string;
  endDate?: string;
  description: string;
  progress: number;
}

const ClientsManagement = () => {
  const { clients, loading, addClient, updateClient, deleteClient } = useClientProfiles();
  const { user } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const [newClient, setNewClient] = useState({
    company_name: "",
    contact_name: "",
    email: "",
    phone: "",
    user_id: user?.id || "",
  });

  // Mock projects data for clients
  const clientProjects: { [key: string]: Project[] } = {
    1: [
      { id: 1, name: "Organic Tea Package Design", status: 'ongoing', startDate: '2024-01-15', description: 'Complete packaging design for organic tea collection', progress: 75 },
      { id: 2, name: "Website Redesign", status: 'completed', startDate: '2023-10-01', endDate: '2023-12-15', description: 'Full website redesign and development', progress: 100 },
      { id: 3, name: "Brand Identity Update", status: 'ongoing', startDate: '2024-02-01', description: 'Logo and brand guidelines update', progress: 45 }
    ],
    2: [
      { id: 4, name: "Tea House Interior Design", status: 'ongoing', startDate: '2024-01-20', description: 'Complete interior design for new tea house location', progress: 60 },
      { id: 5, name: "Menu Design", status: 'completed', startDate: '2023-11-01', endDate: '2023-11-30', description: 'New menu design and printing', progress: 100 }
    ],
    3: [
      { id: 6, name: "Energy Drink Campaign", status: 'on-hold', startDate: '2023-12-01', description: 'Marketing campaign for new energy drink line', progress: 25 },
      { id: 7, name: "Product Photography", status: 'completed', startDate: '2023-09-01', endDate: '2023-10-15', description: 'Professional product photography session', progress: 100 }
    ]
  };

  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showProjectsSheet, setShowProjectsSheet] = useState(false);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const filteredClients = clients.filter(client =>
    client.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalItems = filteredClients.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentClients = filteredClients.slice(startIndex, endIndex);
  const startItem = totalItems > 0 ? startIndex + 1 : 0;
  const endItem = Math.min(endIndex, totalItems);

  const handleAddClient = async () => {
    if (!newClient.company_name || !newClient.contact_name || !newClient.email) {
      return;
    }

    if (!user?.id) {
      return;
    }

    const success = await addClient({
      ...newClient,
      user_id: user.id,
      number_of_projects: 0
    });

    if (success) {
      setNewClient({
        company_name: "",
        contact_name: "",
        email: "",
        phone: "",
        user_id: user?.id || "",
      });
      setIsAddDialogOpen(false);
    }
  };

  const handleViewProjects = (client: Client) => {
    setSelectedClient(client);
    setShowProjectsSheet(true);
  };

  const handleChangePermission = (client: Client) => {
    setEditingClient(client);
    setIsEditDialogOpen(true);
  };

  const handleEditClient = async () => {
    if (!editingClient?.companyName || !editingClient?.contact || !editingClient?.email) {
      return;
    }

    const success = await updateClient(editingClient.id, {
      company_name: editingClient.companyName,
      contact_name: editingClient.contact,
      email: editingClient.email,
    });

    if (success) {
      setIsEditDialogOpen(false);
      setEditingClient(null);
    }
  };

  const handleDeleteClient = async (clientId: string) => {
    await deleteClient(clientId);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Enterprise": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "Premium": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Standard": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Inactive": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "Pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case "ongoing": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "completed": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "on-hold": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getClientProjects = (clientId: string) => {
    return clientProjects[clientId] || [];
  };

  const getOngoingProjects = (clientId: string) => {
    return getClientProjects(clientId).filter(p => p.status === 'ongoing' || p.status === 'on-hold');
  };

  const getCompletedProjects = (clientId: string) => {
    return getClientProjects(clientId).filter(p => p.status === 'completed');
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Clients Management</h1>
            <p className="text-muted-foreground mt-1">Loading your clients...</p>
          </div>
        </div>
        <Card>
          <CardContent className="p-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Clients Management</h1>
            <p className="text-muted-foreground mt-1">Please sign in to manage your clients</p>
          </div>
        </div>
        <Card>
          <CardContent className="p-8">
            <div className="text-center">
              <p className="text-muted-foreground">You need to be signed in to access this page.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Clients Management</h1>
          <p className="text-muted-foreground mt-1">Manage your clients and send invitations</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
              <DialogDescription>
                Add a new client to your management system
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={newClient.company_name}
                    onChange={(e) => setNewClient({...newClient, company_name: e.target.value})}
                    placeholder="Enter company name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Person *</Label>
                  <Input
                    id="contact"
                    value={newClient.contact_name}
                    onChange={(e) => setNewClient({...newClient, contact_name: e.target.value})}
                    placeholder="Enter contact name"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newClient.email}
                  onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                  placeholder="Enter email address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newClient.phone}
                  onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                  placeholder="Enter phone number"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddClient}>
                Add Client
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Client Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Client Information</DialogTitle>
            <DialogDescription>
              Update client information and permissions
            </DialogDescription>
          </DialogHeader>
          {editingClient && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editCompanyName">Company Name *</Label>
                  <Input
                    id="editCompanyName"
                    value={editingClient.companyName}
                    onChange={(e) => setEditingClient({...editingClient, companyName: e.target.value})}
                    placeholder="Enter company name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editContact">Contact Person *</Label>
                  <Input
                    id="editContact"
                    value={editingClient.contact}
                    onChange={(e) => setEditingClient({...editingClient, contact: e.target.value})}
                    placeholder="Enter contact name"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="editEmail">Email *</Label>
                <Input
                  id="editEmail"
                  type="email"
                  value={editingClient.email}
                  onChange={(e) => setEditingClient({...editingClient, email: e.target.value})}
                  placeholder="Enter email address"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editTier">Tier</Label>
                  <Select value={editingClient.tier} onValueChange={(value) => setEditingClient({...editingClient, tier: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Standard">Standard</SelectItem>
                      <SelectItem value="Premium">Premium</SelectItem>
                      <SelectItem value="Enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editStatus">Status</Label>
                  <Select value={editingClient.activityStatus} onValueChange={(value) => setEditingClient({...editingClient, activityStatus: value as 'Active' | 'Inactive' | 'Pending'})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="editProjectManager">Project Manager</Label>
                <Input
                  id="editProjectManager"
                  value={editingClient.projectManager}
                  onChange={(e) => setEditingClient({...editingClient, projectManager: e.target.value})}
                  placeholder="Assign project manager"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editAffiliate">Affiliate</Label>
                <Input
                  id="editAffiliate"
                  value={editingClient.affiliate}
                  onChange={(e) => setEditingClient({...editingClient, affiliate: e.target.value})}
                  placeholder="Enter affiliate information"
                />
              </div>
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditClient}>
              Update Client
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Search Bar */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search clients by company, contact, or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>


      {/* Clients Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users2 className="w-5 h-5 mr-2" />
            Clients ({filteredClients.length})
          </CardTitle>
          <CardDescription>
            Manage your client relationships and track their activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="flex items-center">
                  <Building2 className="w-4 h-4 mr-2" />
                  Company Name
                </TableHead>
                <TableHead>
                  <User className="w-4 h-4 mr-2 inline" />
                  Contact
                </TableHead>
                <TableHead>
                  <Award className="w-4 h-4 mr-2 inline" />
                  Tier
                </TableHead>
                <TableHead>
                  <UserPlus className="w-4 h-4 mr-2 inline" />
                  Project Manager
                </TableHead>
                <TableHead>
                  <Package className="w-4 h-4 mr-2 inline" />
                  Orders
                </TableHead>
                <TableHead>
                  <Activity className="w-4 h-4 mr-2 inline" />
                  Status
                </TableHead>
                <TableHead>
                  <Link className="w-4 h-4 mr-2 inline" />
                  Affiliate
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.companyName}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{client.contact}</div>
                      <div className="text-sm text-muted-foreground">{client.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTierColor(client.tier)}>
                      {client.tier}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${client.projectManager}`} />
                        <AvatarFallback>{getInitials(client.projectManager)}</AvatarFallback>
                      </Avatar>
                      <span>{client.projectManager}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {client.numberOfOrders}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(client.activityStatus)}>
                      {client.activityStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{client.affiliate}</TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewProjects(client)}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleChangePermission(client)}
                        className="h-8 w-8 p-0"
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the client
                              "{client.companyName}" and remove their data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteClient(client.id)}
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
          {filteredClients.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No clients found matching your search criteria
            </div>
          )}
          
          {/* Pagination */}
          {filteredClients.length > 0 && (
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {startItem}-{endItem} of {totalItems} items
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0"
                >
                  <ChevronsLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }
                  
                  return (
                    <Button
                      key={pageNumber}
                      variant={currentPage === pageNumber ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNumber)}
                      className="h-8 w-8 p-0"
                    >
                      {pageNumber}
                    </Button>
                  );
                })}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 p-0"
                >
                  <ChevronsRight className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Items per page</span>
                <Select value={itemsPerPage.toString()} onValueChange={(value) => {
                  setItemsPerPage(Number(value));
                  setCurrentPage(1);
                }}>
                  <SelectTrigger className="w-20 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="12">12</SelectItem>
                    <SelectItem value="24">24</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Projects Sheet */}
      <Sheet open={showProjectsSheet} onOpenChange={setShowProjectsSheet}>
        <SheetContent className="w-[600px] sm:w-[800px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              {selectedClient?.companyName} Projects
            </SheetTitle>
            <SheetDescription>
              View all projects for {selectedClient?.contact}
            </SheetDescription>
          </SheetHeader>
          
          <div className="mt-6">
            <Tabs defaultValue="ongoing" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="ongoing" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Ongoing Projects ({selectedClient ? getOngoingProjects(selectedClient.id).length : 0})
                </TabsTrigger>
                <TabsTrigger value="completed" className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Completed Projects ({selectedClient ? getCompletedProjects(selectedClient.id).length : 0})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="ongoing" className="mt-4">
                <div className="space-y-4">
                  {selectedClient && getOngoingProjects(selectedClient.id).length > 0 ? (
                    getOngoingProjects(selectedClient.id).map((project) => (
                      <Card key={project.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg">{project.name}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                              <div className="flex items-center gap-4 mt-3">
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Calendar className="w-4 h-4" />
                                  Started: {new Date(project.startDate).toLocaleDateString()}
                                </div>
                                <Badge className={getProjectStatusColor(project.status)}>
                                  {project.status}
                                </Badge>
                              </div>
                              <div className="mt-3">
                                <div className="flex items-center justify-between text-sm mb-1">
                                  <span>Progress</span>
                                  <span>{project.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-600 h-2 rounded-full transition-all" 
                                    style={{ width: `${project.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No ongoing projects found</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="completed" className="mt-4">
                <div className="space-y-4">
                  {selectedClient && getCompletedProjects(selectedClient.id).length > 0 ? (
                    getCompletedProjects(selectedClient.id).map((project) => (
                      <Card key={project.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg">{project.name}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                              <div className="flex items-center gap-4 mt-3">
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(project.startDate).toLocaleDateString()} - {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'Present'}
                                </div>
                                <Badge className={getProjectStatusColor(project.status)}>
                                  {project.status}
                                </Badge>
                              </div>
                              <div className="mt-3">
                                <div className="flex items-center gap-1 text-sm text-green-600">
                                  <CheckCircle className="w-4 h-4" />
                                  <span>Completed Successfully</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No completed projects found</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ClientsManagement;