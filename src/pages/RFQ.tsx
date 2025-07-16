import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Edit, Trash2, Download, Phone, Mail, MapPin, User, FileText, Users, Plus, Upload } from "lucide-react";

interface RFQItem {
  id: string;
  requestInfoName: string;
  requestId: string;
  status: string;
  client: string;
  requestInformation: string;
  usOperator: string;
  cnOperator: string;
  attachments: string[];
  phone: string;
  inquiredId: string;
  mailingAddress: string;
  company?: string;
}

interface AddRFQForm {
  requestInfoName: string;
  company: string;
  status: string;
  requestInformation: string;
  usOperator: string;
  cnOperator: string;
  attachments: File[];
  clientProfile: string;
  inquiredId: string;
}

const mockRFQData: RFQItem[] = [
  {
    id: "1",
    requestInfoName: "Coffee Package Design Request",
    requestId: "RFQ-2024-001",
    status: "Pending",
    client: "Bean & Brew Co.",
    requestInformation: "Need eco-friendly packaging design for premium coffee beans. Requirements include biodegradable materials, premium finish, and brand-compliant colors.",
    usOperator: "John Smith",
    cnOperator: "Li Wei",
    attachments: ["design_brief.pdf", "brand_guidelines.pdf", "reference_images.zip"],
    phone: "+1 (555) 123-4567",
    inquiredId: "INQ-001",
    mailingAddress: "123 Coffee Street, Seattle, WA 98101"
  },
  {
    id: "2",
    requestInfoName: "Wine Bottle Label RFQ",
    requestId: "RFQ-2024-002",
    status: "In Progress",
    client: "Vintage Wines Ltd",
    requestInformation: "Premium wine label design with embossed elements and gold foil accents. Traditional European style with modern touches.",
    usOperator: "Sarah Johnson",
    cnOperator: "Chen Ming",
    attachments: ["wine_specs.pdf", "label_dimensions.pdf"],
    phone: "+1 (555) 987-6543",
    inquiredId: "INQ-002",
    mailingAddress: "456 Vineyard Ave, Napa, CA 94558"
  },
  {
    id: "3",
    requestInfoName: "Energy Drink Can Design",
    requestId: "RFQ-2024-003",
    status: "Completed",
    client: "Energy Plus Corp",
    requestInformation: "Bold and vibrant energy drink can design targeting young adults. Need to include nutritional information and barcode placement.",
    usOperator: "Mike Davis",
    cnOperator: "Wang Fei",
    attachments: ["can_specs.pdf", "nutrition_info.xlsx", "brand_colors.pdf"],
    phone: "+1 (555) 456-7890",
    inquiredId: "INQ-003",
    mailingAddress: "789 Energy Blvd, Los Angeles, CA 90210"
  }
];

const RFQ = () => {
  const [selectedRFQ, setSelectedRFQ] = useState<RFQItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState<AddRFQForm>({
    requestInfoName: "",
    company: "",
    status: "Pending",
    requestInformation: "",
    usOperator: "",
    cnOperator: "",
    attachments: [],
    clientProfile: "",
    inquiredId: ""
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "In Progress": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Completed": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const handleViewDetails = (rfq: RFQItem) => {
    setSelectedRFQ(rfq);
    setIsDetailOpen(true);
  };

  const handleEdit = (id: string) => {
    console.log("Edit RFQ:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete RFQ:", id);
  };

  const handleFormChange = (field: keyof AddRFQForm, value: string | File[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    handleFormChange("attachments", files);
  };

  const handleSubmit = () => {
    console.log("Adding new RFQ:", formData);
    // Here you would typically send the data to your backend
    setIsAddDialogOpen(false);
    // Reset form
    setFormData({
      requestInfoName: "",
      company: "",
      status: "Pending",
      requestInformation: "",
      usOperator: "",
      cnOperator: "",
      attachments: [],
      clientProfile: "",
      inquiredId: ""
    });
  };

  const statistics = {
    total: mockRFQData.length,
    pending: mockRFQData.filter(rfq => rfq.status === "Pending").length,
    inProgress: mockRFQData.filter(rfq => rfq.status === "In Progress").length,
    completed: mockRFQData.filter(rfq => rfq.status === "Completed").length
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">RFQ Management</h1>
        <p className="text-muted-foreground">
          Manage and track request for quotes for packaging design projects
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total RFQs</p>
                <p className="text-2xl font-bold">{statistics.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{statistics.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">{statistics.inProgress}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-green-600">{statistics.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* RFQ List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>RFQ List</CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add RFQ
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New RFQ</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="requestInfoName">Request Info Name</Label>
                    <Input
                      id="requestInfoName"
                      value={formData.requestInfoName}
                      onChange={(e) => handleFormChange("requestInfoName", e.target.value)}
                      placeholder="Enter request info name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleFormChange("company", e.target.value)}
                      placeholder="Enter company name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleFormChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requestInformation">Request Information</Label>
                  <Textarea
                    id="requestInformation"
                    value={formData.requestInformation}
                    onChange={(e) => handleFormChange("requestInformation", e.target.value)}
                    placeholder="Enter detailed request information"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="usOperator">Assigned US Operator</Label>
                    <Input
                      id="usOperator"
                      value={formData.usOperator}
                      onChange={(e) => handleFormChange("usOperator", e.target.value)}
                      placeholder="Enter US operator name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cnOperator">Assigned CN Operator</Label>
                    <Input
                      id="cnOperator"
                      value={formData.cnOperator}
                      onChange={(e) => handleFormChange("cnOperator", e.target.value)}
                      placeholder="Enter CN operator name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientProfile">Assigned Client Profile</Label>
                    <Input
                      id="clientProfile"
                      value={formData.clientProfile}
                      onChange={(e) => handleFormChange("clientProfile", e.target.value)}
                      placeholder="Enter client profile"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="inquiredId">Assigned Inquired ID</Label>
                    <Input
                      id="inquiredId"
                      value={formData.inquiredId}
                      onChange={(e) => handleFormChange("inquiredId", e.target.value)}
                      placeholder="Enter inquired ID"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="attachments">Attachments</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="attachments"
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('attachments')?.click()}
                      className="w-full"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {formData.attachments.length > 0 
                        ? `${formData.attachments.length} file(s) selected` 
                        : "Upload attachments"}
                    </Button>
                  </div>
                  {formData.attachments.length > 0 && (
                    <div className="space-y-1">
                      {formData.attachments.map((file, index) => (
                        <div key={index} className="text-sm text-muted-foreground">
                          {file.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit}>
                    Add RFQ
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRFQData.map((rfq) => (
              <div key={rfq.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-4">
                      <h3 className="font-semibold text-lg">{rfq.requestInfoName}</h3>
                      <Badge variant="outline">{rfq.requestId}</Badge>
                      <Badge className={getStatusColor(rfq.status)}>{rfq.status}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {rfq.client}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(rfq)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(rfq.id)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(rfq.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sliding Detail View */}
      <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <SheetContent className="w-[600px] sm:max-w-[600px] overflow-y-auto">
          {selectedRFQ && (
            <>
              <SheetHeader>
                <SheetTitle>RFQ Details</SheetTitle>
              </SheetHeader>
              
              <div className="mt-6 space-y-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Basic Information</h3>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Request Info Name</label>
                      <p className="text-sm mt-1">{selectedRFQ.requestInfoName}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Request ID</label>
                        <p className="text-sm mt-1">{selectedRFQ.requestId}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Status</label>
                        <div className="mt-1">
                          <Badge className={getStatusColor(selectedRFQ.status)}>{selectedRFQ.status}</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Inquired ID</label>
                        <p className="text-sm mt-1">{selectedRFQ.inquiredId}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Client Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Client Information</h3>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                        <User className="h-4 w-4" />
                        Client
                      </label>
                      <p className="text-sm mt-1">{selectedRFQ.client}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        Phone
                      </label>
                      <p className="text-sm mt-1">{selectedRFQ.phone}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        Mailing Address
                      </label>
                      <p className="text-sm mt-1">{selectedRFQ.mailingAddress}</p>
                    </div>
                  </div>
                </div>

                {/* Request Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Request Information</h3>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Description</label>
                    <p className="text-sm mt-1 leading-relaxed">{selectedRFQ.requestInformation}</p>
                  </div>
                </div>

                {/* Operators */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Operators</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        US Operator
                      </label>
                      <p className="text-sm mt-1">{selectedRFQ.usOperator}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        CN Operator
                      </label>
                      <p className="text-sm mt-1">{selectedRFQ.cnOperator}</p>
                    </div>
                  </div>
                </div>

                {/* Attachments */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Attachments</h3>
                  
                  <div className="space-y-2">
                    {selectedRFQ.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <span className="text-sm">{attachment}</span>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default RFQ;