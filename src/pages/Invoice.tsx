import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, Trash2, X, Paperclip, Search, Filter, Plus, Upload } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Invoice {
  id: string;
  invoiceNumber: string;
  orderNumber: string;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  amount: number;
  dueDate: string;
  invoiceDetails: string;
  invoiceInstructions: string;
  affiliatePerson: string;
  attachments: string[];
}

const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    orderNumber: 'ORD-2024-001',
    status: 'pending',
    amount: 15000,
    dueDate: '2024-02-15',
    invoiceDetails: 'Product design and development services for mobile application UI/UX design project.',
    invoiceInstructions: 'Payment terms: Net 30 days. Please include invoice number in payment reference.',
    affiliatePerson: 'John Smith',
    attachments: ['design_specs.pdf', 'project_timeline.xlsx']
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-002',
    orderNumber: 'ORD-2024-002',
    status: 'paid',
    amount: 8500,
    dueDate: '2024-01-30',
    invoiceDetails: 'Manufacturing consultation and quality assurance services.',
    invoiceInstructions: 'Payment completed via wire transfer. Thank you for your business.',
    affiliatePerson: 'Sarah Johnson',
    attachments: ['qa_report.pdf']
  },
  {
    id: '3',
    invoiceNumber: 'INV-2024-003',
    orderNumber: 'ORD-2024-003',
    status: 'overdue',
    amount: 22000,
    dueDate: '2024-01-15',
    invoiceDetails: 'Complete product development lifecycle including design, prototyping, and manufacturing setup.',
    invoiceInstructions: 'OVERDUE: Payment is past due. Please remit payment immediately to avoid service interruption.',
    affiliatePerson: 'Michael Chen',
    attachments: ['prototype_images.zip', 'manufacturing_specs.pdf', 'cost_breakdown.xlsx']
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'paid': return 'bg-green-500/10 text-green-700 hover:bg-green-500/20';
    case 'pending': return 'bg-blue-500/10 text-blue-700 hover:bg-blue-500/20';
    case 'overdue': return 'bg-red-500/10 text-red-700 hover:bg-red-500/20';
    case 'cancelled': return 'bg-gray-500/10 text-gray-700 hover:bg-gray-500/20';
    default: return 'bg-gray-500/10 text-gray-700 hover:bg-gray-500/20';
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const Invoice = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isNewInvoiceOpen, setIsNewInvoiceOpen] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    status: 'pending' as Invoice['status'],
    invoiceDetails: '',
    invoiceInstructions: '',
    assignedOrder: '',
    attachments: [] as string[]
  });

  const handleViewDetails = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsDetailOpen(true);
  };

  const handleEdit = (invoice: Invoice) => {
    console.log('Edit invoice:', invoice.id);
  };

  const handleDelete = (invoice: Invoice) => {
    console.log('Delete invoice:', invoice.id);
  };

  // Filter invoices based on search and status
  const filteredInvoices = useMemo(() => {
    return mockInvoices.filter(invoice => {
      const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           invoice.orderNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  // Calculate statistics
  const statistics = useMemo(() => {
    const total = mockInvoices.length;
    const unpaid = mockInvoices.filter(inv => inv.status === 'pending' || inv.status === 'overdue').length;
    const paid = mockInvoices.filter(inv => inv.status === 'paid').length;
    return { total, unpaid, paid };
  }, []);

  const handleCreateInvoice = () => {
    console.log('Creating new invoice:', newInvoice);
    setIsNewInvoiceOpen(false);
    setNewInvoice({
      status: 'pending',
      invoiceDetails: '',
      invoiceInstructions: '',
      assignedOrder: '',
      attachments: []
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Invoice Management</h1>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Invoices</p>
                <p className="text-2xl font-bold">{statistics.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Unpaid Invoices</p>
                <p className="text-2xl font-bold text-red-600">{statistics.unpaid}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Paid Invoices</p>
                <p className="text-2xl font-bold text-green-600">{statistics.paid}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Invoice List</CardTitle>
            <Dialog open={isNewInvoiceOpen} onOpenChange={setIsNewInvoiceOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Invoice
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Invoice</DialogTitle>
                  <DialogDescription>
                    Fill in the details to create a new invoice.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <Select value={newInvoice.status} onValueChange={(value: Invoice['status']) => setNewInvoice({...newInvoice, status: value})}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="assigned-order" className="text-right">
                      Assigned Order
                    </Label>
                    <Input
                      id="assigned-order"
                      value={newInvoice.assignedOrder}
                      onChange={(e) => setNewInvoice({...newInvoice, assignedOrder: e.target.value})}
                      className="col-span-3"
                      placeholder="Enter order number"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="invoice-details" className="text-right mt-2">
                      Invoice Details
                    </Label>
                    <Textarea
                      id="invoice-details"
                      value={newInvoice.invoiceDetails}
                      onChange={(e) => setNewInvoice({...newInvoice, invoiceDetails: e.target.value})}
                      className="col-span-3"
                      placeholder="Enter invoice details"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="invoice-instructions" className="text-right mt-2">
                      Invoice Instructions
                    </Label>
                    <Textarea
                      id="invoice-instructions"
                      value={newInvoice.invoiceInstructions}
                      onChange={(e) => setNewInvoice({...newInvoice, invoiceInstructions: e.target.value})}
                      className="col-span-3"
                      placeholder="Enter invoice instructions"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="attachment" className="text-right">
                      Attachment
                    </Label>
                    <Button variant="outline" className="col-span-3 justify-start">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload File
                    </Button>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleCreateInvoice}>Create Invoice</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          {/* Search and Filter */}
          <div className="flex gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by invoice number or order number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice Number</TableHead>
                <TableHead>Order Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                  <TableCell>{invoice.orderNumber}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(invoice.status)}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold">{formatCurrency(invoice.amount)}</TableCell>
                  <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex space-x-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(invoice)}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(invoice)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(invoice)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Invoice Detail Sheet - 2/3 screen width */}
      <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <SheetContent className="w-[66.67vw] max-w-none overflow-y-auto">
          <SheetHeader className="space-y-3">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-2xl">Invoice Details</SheetTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDetailOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </SheetHeader>

          {selectedInvoice && (
            <div className="mt-6 space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Invoice Number</label>
                    <p className="text-lg font-semibold">{selectedInvoice.invoiceNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Order Number</label>
                    <p className="text-lg">{selectedInvoice.orderNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <div className="mt-1">
                      <Badge className={getStatusColor(selectedInvoice.status)}>
                        {selectedInvoice.status.charAt(0).toUpperCase() + selectedInvoice.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Amount</label>
                    <p className="text-lg font-semibold">{formatCurrency(selectedInvoice.amount)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Due Date</label>
                    <p className="text-lg">{formatDate(selectedInvoice.dueDate)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Affiliate Person</label>
                    <p className="text-lg">{selectedInvoice.affiliatePerson}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Invoice Details */}
              <div>
                <label className="text-sm font-medium text-muted-foreground">Invoice Details</label>
                <p className="mt-2 text-sm leading-relaxed">{selectedInvoice.invoiceDetails}</p>
              </div>

              <Separator />

              {/* Invoice Instructions */}
              <div>
                <label className="text-sm font-medium text-muted-foreground">Invoice Instructions</label>
                <p className="mt-2 text-sm leading-relaxed">{selectedInvoice.invoiceInstructions}</p>
              </div>

              <Separator />

              {/* Attachments */}
              <div>
                <label className="text-sm font-medium text-muted-foreground">Attachments</label>
                <div className="mt-2 space-y-2">
                  {selectedInvoice.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 border rounded-md">
                      <Paperclip className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm flex-1">{attachment}</span>
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Invoice;