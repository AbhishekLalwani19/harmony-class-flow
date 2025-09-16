import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Users, 
  Building, 
  BarChart3, 
  Plus, 
  TrendingUp, 
  Clock,
  BookOpen
} from "lucide-react";
import { Link } from "react-router-dom";

const quickActions = [
  {
    title: "Create Timetable",
    description: "Generate optimized class schedules",
    icon: Calendar,
    href: "/create-timetable",
    gradient: "from-primary/10 to-primary/20",
    border: "border-primary/20",
    hover: "hover:from-primary/20 hover:to-primary/30 hover:border-primary/30"
  },
  {
    title: "Faculty Availability",
    description: "Manage teacher schedules & workload",
    icon: Users,
    href: "/faculty-allocation",
    gradient: "from-accent/10 to-accent/20",
    border: "border-accent/30",
    hover: "hover:from-accent/20 hover:to-accent/30 hover:border-accent/40"
  },
  {
    title: "Classroom Utilization",
    description: "Monitor room usage & capacity",
    icon: Building,
    href: "/classrooms",
    gradient: "from-success/10 to-success/20",
    border: "border-success/20",
    hover: "hover:from-success/20 hover:to-success/30 hover:border-success/30"
  },
  {
    title: "Reports & Insights",
    description: "View analytics and performance data",
    icon: BarChart3,
    href: "/reports",
    gradient: "from-warning/10 to-warning/20",
    border: "border-warning/30",
    hover: "hover:from-warning/20 hover:to-warning/30 hover:border-warning/40"
  },
];

const stats = [
  { name: "Active Classes", value: "24", change: "+2", icon: BookOpen },
  { name: "Faculty Members", value: "45", change: "+3", icon: Users },
  { name: "Classrooms", value: "18", change: "0", icon: Building },
  { name: "Avg Utilization", value: "78%", change: "+5%", icon: TrendingUp },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening at your institution.
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary-light">
          <Plus className="mr-2 h-4 w-4" />
          Quick Actions
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} className="dashboard-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.name}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-sm flex items-center gap-1 mt-1 ${
                      stat.change.startsWith('+') ? 'text-success' : 'text-muted-foreground'
                    }`}>
                      <TrendingUp className="h-3 w-3" />
                      {stat.change} from last week
                    </p>
                  </div>
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.title} to={action.href}>
                <Card className={`bg-gradient-to-br ${action.gradient} border ${action.border} ${action.hover} hover:shadow-lg transition-all duration-300 cursor-pointer`}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-background/50 rounded-lg">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold">{action.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {action.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest updates and changes in your system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">New timetable created for CSE Batch 2024</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Dr. Smith updated availability status</p>
                <p className="text-xs text-muted-foreground">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Lab 204 maintenance completed</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>System Overview</CardTitle>
            <CardDescription>
              Current system status and health
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Classroom Utilization</span>
                <span className="font-medium">78%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "78%" }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Faculty Allocation</span>
                <span className="font-medium">92%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-success h-2 rounded-full" style={{ width: "92%" }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Schedule Conflicts</span>
                <span className="font-medium text-destructive">2</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-destructive h-2 rounded-full" style={{ width: "12%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}