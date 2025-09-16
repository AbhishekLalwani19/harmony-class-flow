import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Users, 
  User, 
  BookOpen, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Plus,
  Edit
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const facultyMembers = [
  {
    id: "FAC001",
    name: "Dr. Sarah Johnson",
    department: "Computer Science",
    email: "s.johnson@university.edu",
    subjects: ["Data Structures", "Algorithms", "Machine Learning"],
    hoursPerWeek: 18,
    maxHours: 20,
    availability: "Available",
    status: "active",
    leaves: []
  },
  {
    id: "FAC002", 
    name: "Prof. Michael Smith",
    department: "Computer Science",
    email: "m.smith@university.edu",
    subjects: ["Database Systems", "Web Development", "Software Engineering"],
    hoursPerWeek: 22,
    maxHours: 20,
    availability: "Overloaded",
    status: "active",
    leaves: ["2024-02-15", "2024-02-16"]
  },
  {
    id: "FAC003",
    name: "Dr. Emily Brown",
    department: "Electrical Engineering",
    email: "e.brown@university.edu",
    subjects: ["Circuit Analysis", "Digital Electronics", "Control Systems"],
    hoursPerWeek: 16,
    maxHours: 20,
    availability: "Available",
    status: "active",
    leaves: []
  },
  {
    id: "FAC004",
    name: "Prof. David Wilson",
    department: "Mechanical Engineering", 
    email: "d.wilson@university.edu",
    subjects: ["Thermodynamics", "Fluid Mechanics"],
    hoursPerWeek: 12,
    maxHours: 20,
    availability: "Underutilized",
    status: "active",
    leaves: ["2024-02-20"]
  }
];

export default function FacultyAllocation() {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredFaculty = facultyMembers.filter(faculty => {
    const matchesSearch = faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faculty.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faculty.subjects.some(subject => subject.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDepartment = departmentFilter === "all" || faculty.department === departmentFilter;
    const matchesStatus = statusFilter === "all" || faculty.availability === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusBadge = (availability: string) => {
    switch (availability) {
      case "Available":
        return <Badge className="bg-success text-success-foreground">Available</Badge>;
      case "Overloaded":
        return <Badge variant="destructive">Overloaded</Badge>;
      case "Underutilized":
        return <Badge className="bg-warning text-warning-foreground">Underutilized</Badge>;
      default:
        return <Badge variant="secondary">{availability}</Badge>;
    }
  };

  const getStatusIcon = (availability: string) => {
    switch (availability) {
      case "Available":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "Overloaded":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case "Underutilized":
        return <Clock className="h-4 w-4 text-warning" />;
      default:
        return <XCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getWorkloadPercentage = (current: number, max: number) => {
    return Math.round((current / max) * 100);
  };

  const getWorkloadColor = (percentage: number) => {
    if (percentage > 100) return "bg-destructive";
    if (percentage > 80) return "bg-warning";
    if (percentage < 60) return "bg-warning";
    return "bg-success";
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Users className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Faculty Allocation</h1>
          <p className="text-muted-foreground">Manage faculty workload and subject assignments</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Faculty</p>
                <p className="text-2xl font-bold">{facultyMembers.length}</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available</p>
                <p className="text-2xl font-bold text-success">
                  {facultyMembers.filter(f => f.availability === "Available").length}
                </p>
              </div>
              <div className="p-2 bg-success/10 rounded-lg">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overloaded</p>
                <p className="text-2xl font-bold text-destructive">
                  {facultyMembers.filter(f => f.availability === "Overloaded").length}
                </p>
              </div>
              <div className="p-2 bg-destructive/10 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">On Leave</p>
                <p className="text-2xl font-bold text-warning">
                  {facultyMembers.filter(f => f.leaves.length > 0).length}
                </p>
              </div>
              <div className="p-2 bg-warning/10 rounded-lg">
                <Clock className="h-5 w-5 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search faculty by name, department, or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Overloaded">Overloaded</SelectItem>
                <SelectItem value="Underutilized">Underutilized</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-primary hover:bg-primary-light">
              <Plus className="mr-2 h-4 w-4" />
              Add Faculty
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Faculty Table */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Faculty Members ({filteredFaculty.length})</CardTitle>
          <CardDescription>
            Current faculty allocation and workload distribution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Faculty</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Subjects</TableHead>
                  <TableHead>Workload</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFaculty.map((faculty) => {
                  const workloadPercentage = getWorkloadPercentage(faculty.hoursPerWeek, faculty.maxHours);
                  return (
                    <TableRow key={faculty.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-primary/10 text-primary">
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{faculty.name}</p>
                            <p className="text-sm text-muted-foreground">{faculty.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{faculty.department}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1 max-w-48">
                          {faculty.subjects.slice(0, 2).map((subject, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {subject}
                            </Badge>
                          ))}
                          {faculty.subjects.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{faculty.subjects.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <span>{faculty.hoursPerWeek}h / {faculty.maxHours}h</span>
                            <span className="text-muted-foreground">({workloadPercentage}%)</span>
                          </div>
                          <div className="w-24 bg-muted rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full ${getWorkloadColor(workloadPercentage)}`}
                              style={{ width: `${Math.min(workloadPercentage, 100)}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(faculty.availability)}
                          {getStatusBadge(faculty.availability)}
                          {faculty.leaves.length > 0 && (
                            <Badge variant="outline" className="text-xs">
                              {faculty.leaves.length} leave(s)
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <BookOpen className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {filteredFaculty.length === 0 && (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-muted-foreground">No faculty members found</p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search filters
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}