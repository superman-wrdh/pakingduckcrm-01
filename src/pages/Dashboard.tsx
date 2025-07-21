import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  Factory, 
  Truck, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  TrendingUp,
  Calendar,
  Users,
  BarChart3,
  User,
  UserPlus,
  Eye,
  Edit,
  Plus,
  Search,
  FileText,
  Settings,
  DollarSign
} from "lucide-react";
import { useProjects } from "@/hooks/useProjects";

const Dashboard = () => {
  const { projects, loading, getProjectStats, getStatusColor, getProgressPercentage } = useProjects();
  const stats = getProjectStats();

  const dashboardStats = [
    {
      title: "Total Projects",
      value: stats.totalProjects.toString(),
      change: "+2 from last month",
      icon: Package,
      color: "text-blue-600"
    },
    {
      title: "Active Projects",
      value: stats.activeProjects.toString(),
      change: "+1 from last week",
      icon: Clock,
      color: "text-orange-600"
    },
    {
      title: "In Progress",
      value: stats.inProgress.toString(),
      change: "+3 this week",
      icon: Factory,
      color: "text-purple-600"
    },
    {
      title: "Completed This Month",
      value: stats.completedThisMonth.toString(),
      change: "On track",
      icon: CheckCircle,
      color: "text-green-600"
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="p-6 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Track progress on your packaging design, manufacturing, and shipping
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Project Progress */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Project Progress
              </CardTitle>
              <CardDescription>
                Current status of your packaging projects
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {projects.slice(0, 5).map((project) => (
                <div key={project.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">{project.name}</h4>
                      <p className="text-sm text-muted-foreground">{project.client}</p>
                    </div>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{project.type}</span>
                      <span className="font-medium">{getProgressPercentage(project.status)}%</span>
                    </div>
                    <Progress value={getProgressPercentage(project.status)} className="h-2" />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(project.due_date)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      Project Team
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Updates */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start">
                <Package className="h-4 w-4 mr-2" />
                New Project
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Factory className="h-4 w-4 mr-2" />
                Manufacturing Update
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Truck className="h-4 w-4 mr-2" />
                Track Shipment
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Updates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-1 bg-green-100 rounded">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Tea Collection Shipped</p>
                  <p className="text-xs text-muted-foreground">Tracking: TC2024001</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-1 bg-orange-100 rounded">
                  <Factory className="h-4 w-4 text-orange-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Coffee Packaging in QA</p>
                  <p className="text-xs text-muted-foreground">Quality testing phase</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-1 bg-blue-100 rounded">
                  <Clock className="h-4 w-4 text-blue-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Energy Drink Review</p>
                  <p className="text-xs text-muted-foreground">Awaiting client feedback</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;