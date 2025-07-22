import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle, Clock, User } from "lucide-react";

const MyTasks = () => {
  const tasks = [
    {
      id: 1,
      title: "Review Design Concepts",
      project: "Brand Identity Redesign",
      dueDate: "2024-01-25",
      status: "pending",
      priority: "high"
    },
    {
      id: 2,
      title: "Provide Feedback on Mockups",
      project: "Website Redesign",
      dueDate: "2024-01-23",
      status: "pending",
      priority: "medium"
    },
    {
      id: 3,
      title: "Approve Final Logo",
      project: "Logo Design",
      dueDate: "2024-01-22",
      status: "completed",
      priority: "high"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-destructive text-destructive-foreground';
      case 'medium':
        return 'bg-accent text-accent-foreground';
      case 'low':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Tasks</h1>
        <div className="flex gap-2">
          <Badge variant="outline">{tasks.filter(t => t.status === 'pending').length} Pending</Badge>
          <Badge variant="outline">{tasks.filter(t => t.status === 'completed').length} Completed</Badge>
        </div>
      </div>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <Card key={task.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg">{task.title}</CardTitle>
              <div className="flex gap-2">
                <Badge className={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
                <Badge className={getStatusColor(task.status)}>
                  {task.status === 'completed' ? <CheckCircle className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                  {task.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                <User className="w-4 h-4 inline mr-1" />
                Project: {task.project}
              </CardDescription>
              <div className="flex justify-between items-center">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-1" />
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </div>
                {task.status === 'pending' && (
                  <Button size="sm">Mark Complete</Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyTasks;