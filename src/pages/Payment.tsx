import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Download, Calendar, DollarSign } from "lucide-react";

const Payment = () => {
  const invoices = [
    {
      id: "INV-2024-001",
      date: "2024-01-01",
      amount: 299.00,
      status: "Paid",
      description: "Monthly Subscription - Pro Plan"
    },
    {
      id: "INV-2023-012",
      date: "2023-12-01",
      amount: 299.00,
      status: "Paid",
      description: "Monthly Subscription - Pro Plan"
    },
    {
      id: "INV-2023-011",
      date: "2023-11-01",
      amount: 299.00,
      status: "Paid",
      description: "Monthly Subscription - Pro Plan"
    },
    {
      id: "INV-2023-010",
      date: "2023-10-01",
      amount: 149.00,
      status: "Paid",
      description: "Monthly Subscription - Basic Plan"
    }
  ];

  const paymentMethods = [
    {
      id: 1,
      type: "Credit Card",
      last4: "4242",
      brand: "Visa",
      expiryMonth: 12,
      expiryYear: 2027,
      isDefault: true
    },
    {
      id: 2,
      type: "Credit Card",
      last4: "5555",
      brand: "Mastercard",
      expiryMonth: 8,
      expiryYear: 2026,
      isDefault: false
    }
  ];

  return (
    <main className="flex-1 p-6 bg-background overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Billing & Payment</h1>
            <p className="text-muted-foreground">
              Manage your subscription, payment methods, and view billing history.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Current Plan */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Current Plan
                  <Badge variant="secondary">Pro Plan</Badge>
                </CardTitle>
                <CardDescription>
                  Your current subscription plan and usage details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Monthly Subscription</span>
                    <span className="text-2xl font-bold">$299.00</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Projects Used</span>
                      <span>12 / 50</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "24%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Team Members</span>
                      <span>8 / 25</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "32%" }}></div>
                    </div>
                  </div>
                  <div className="pt-4 flex space-x-2">
                    <Button variant="outline">Change Plan</Button>
                    <Button variant="outline">Cancel Subscription</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Billing Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Billing Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Next Billing Date</p>
                      <p className="text-sm text-muted-foreground">February 1, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Next Payment</p>
                      <p className="text-sm text-muted-foreground">$299.00</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Payment Method</p>
                      <p className="text-sm text-muted-foreground">Visa ending in 4242</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Methods */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Payment Methods</CardTitle>
                <Button variant="outline">Add Payment Method</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <CreditCard className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <p className="font-medium">
                          {method.brand} ending in {method.last4}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Expires {method.expiryMonth}/{method.expiryYear}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {method.isDefault && (
                        <Badge variant="secondary">Default</Badge>
                      )}
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Delete</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Invoice History */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice History</CardTitle>
              <CardDescription>
                Download and view your past invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">{invoice.id}</p>
                        <Badge 
                          variant={invoice.status === "Paid" ? "secondary" : "destructive"}
                        >
                          {invoice.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {invoice.description}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(invoice.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-bold">${invoice.amount.toFixed(2)}</span>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
  );
};

export default Payment;