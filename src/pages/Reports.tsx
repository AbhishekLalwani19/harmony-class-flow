import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Download, 
  Calendar,
  Users,
  Building,
  Leaf,
  DollarSign,
  Globe
} from "lucide-react";

const utilizationData = [
  { room: "Room 101", utilization: 85, capacity: 60 },
  { room: "Lab 204", utilization: 68, capacity: 40 },
  { room: "Lecture Hall A", utilization: 89, capacity: 150 },
  { room: "Room 305", utilization: 55, capacity: 45 },
  { room: "Physics Lab", utilization: 82, capacity: 30 }
];

const facultyWorkload = [
  { name: "Dr. Johnson", hours: 18, maxHours: 20, efficiency: 90 },
  { name: "Prof. Smith", hours: 22, maxHours: 20, efficiency: 85 },
  { name: "Dr. Brown", hours: 16, maxHours: 20, efficiency: 88 },
  { name: "Prof. Wilson", hours: 12, maxHours: 20, efficiency: 75 }
];

const impactMetrics = {
  environmental: {
    energySaved: 15,
    carbonReduction: 25,
    resourceOptimization: 20
  },
  economic: {
    costSavings: 30,
    resourceUtilization: 78,
    operationalEfficiency: 85
  },
  social: {
    studentSatisfaction: 92,
    facultyEngagement: 88,
    academicPerformance: 95
  }
};

export default function Reports() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BarChart3 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
            <p className="text-muted-foreground">Insights into system performance and impact</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="thisMonth">
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thisWeek">This Week</SelectItem>
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="thisQuarter">This Quarter</SelectItem>
              <SelectItem value="thisYear">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Classes</p>
                <p className="text-2xl font-bold">1,247</p>
                <p className="text-xs text-success flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +12% from last month
                </p>
              </div>
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Utilization</p>
                <p className="text-2xl font-bold">78%</p>
                <p className="text-xs text-success flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +5% from last month
                </p>
              </div>
              <div className="p-2 bg-success/10 rounded-lg">
                <Building className="h-5 w-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Faculty Efficiency</p>
                <p className="text-2xl font-bold">87%</p>
                <p className="text-xs text-warning flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +2% from last month
                </p>
              </div>
              <div className="p-2 bg-warning/10 rounded-lg">
                <Users className="h-5 w-5 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Cost Savings</p>
                <p className="text-2xl font-bold">₹2.4L</p>
                <p className="text-xs text-success flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +18% from last month
                </p>
              </div>
              <div className="p-2 bg-accent/10 rounded-lg">
                <DollarSign className="h-5 w-5 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Classroom Utilization Chart */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Classroom Utilization
            </CardTitle>
            <CardDescription>Usage percentage by room</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {utilizationData.map((room, index) => (
                <div key={room.room} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{room.room}</span>
                    <span className="text-muted-foreground">{room.utilization}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        room.utilization > 80 
                          ? "bg-destructive" 
                          : room.utilization > 60 
                            ? "bg-warning" 
                            : "bg-success"
                      }`}
                      style={{ 
                        width: `${room.utilization}%`,
                        animationDelay: `${index * 100}ms`
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Capacity: {room.capacity}</span>
                    <span>Current: {Math.round(room.capacity * room.utilization / 100)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Faculty Workload Distribution */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Faculty Workload Distribution
            </CardTitle>
            <CardDescription>Hours allocated vs maximum capacity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {facultyWorkload.map((faculty, index) => {
                const percentage = (faculty.hours / faculty.maxHours) * 100;
                return (
                  <div key={faculty.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{faculty.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">
                          {faculty.hours}h/{faculty.maxHours}h
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          faculty.efficiency > 85 
                            ? "bg-success/20 text-success" 
                            : "bg-warning/20 text-warning"
                        }`}>
                          {faculty.efficiency}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          percentage > 100 
                            ? "bg-destructive" 
                            : percentage > 80 
                              ? "bg-warning" 
                              : "bg-primary"
                        }`}
                        style={{ 
                          width: `${Math.min(percentage, 100)}%`,
                          animationDelay: `${index * 100}ms`
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Impact Analysis */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>System Impact Analysis</CardTitle>
          <CardDescription>
            Environmental, Economic, and Social impact metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Environmental Impact */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-success">
                <Leaf className="h-5 w-5" />
                <h3 className="font-semibold">Environmental Impact</h3>
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Energy Saved</span>
                    <span className="font-medium">{impactMetrics.environmental.energySaved}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div 
                      className="bg-success h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${impactMetrics.environmental.energySaved}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Carbon Reduction</span>
                    <span className="font-medium">{impactMetrics.environmental.carbonReduction}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div 
                      className="bg-success h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${impactMetrics.environmental.carbonReduction}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Resource Optimization</span>
                    <span className="font-medium">{impactMetrics.environmental.resourceOptimization}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div 
                      className="bg-success h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${impactMetrics.environmental.resourceOptimization}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Economic Impact */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-accent">
                <DollarSign className="h-5 w-5" />
                <h3 className="font-semibold">Economic Impact</h3>
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Cost Savings</span>
                    <span className="font-medium">{impactMetrics.economic.costSavings}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div 
                      className="bg-accent h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${impactMetrics.economic.costSavings}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Resource Utilization</span>
                    <span className="font-medium">{impactMetrics.economic.resourceUtilization}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div 
                      className="bg-accent h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${impactMetrics.economic.resourceUtilization}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Operational Efficiency</span>
                    <span className="font-medium">{impactMetrics.economic.operationalEfficiency}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div 
                      className="bg-accent h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${impactMetrics.economic.operationalEfficiency}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Social Impact */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <Globe className="h-5 w-5" />
                <h3 className="font-semibold">Social Impact</h3>
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Student Satisfaction</span>
                    <span className="font-medium">{impactMetrics.social.studentSatisfaction}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div 
                      className="bg-primary h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${impactMetrics.social.studentSatisfaction}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Faculty Engagement</span>
                    <span className="font-medium">{impactMetrics.social.facultyEngagement}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div 
                      className="bg-primary h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${impactMetrics.social.facultyEngagement}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Academic Performance</span>
                    <span className="font-medium">{impactMetrics.social.academicPerformance}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div 
                      className="bg-primary h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${impactMetrics.social.academicPerformance}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}