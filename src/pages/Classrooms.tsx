import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Building, 
  Users, 
  Monitor, 
  Wifi, 
  Projector,
  Search,
  Filter,
  Plus,
  Edit,
  Calendar,
  Clock,
  MapPin
} from "lucide-react";

const classroomData = [
  {
    id: "CR001",
    name: "Room 101",
    type: "Classroom",
    capacity: 60,
    currentOccupancy: 45,
    building: "Main Block",
    floor: "Ground Floor",
    amenities: ["Projector", "Wi-Fi", "AC"],
    status: "Occupied",
    nextAvailable: "2:00 PM",
    utilizationToday: 85,
    weeklyUtilization: 72
  },
  {
    id: "CR002", 
    name: "Lab 204",
    type: "Computer Lab",
    capacity: 40,
    currentOccupancy: 0,
    building: "Tech Block",
    floor: "Second Floor", 
    amenities: ["Computers", "Projector", "Wi-Fi", "AC"],
    status: "Available",
    nextAvailable: "Available",
    utilizationToday: 60,
    weeklyUtilization: 68
  },
  {
    id: "CR003",
    name: "Lecture Hall A",
    type: "Lecture Hall",
    capacity: 150,
    currentOccupancy: 120,
    building: "Academic Block",
    floor: "First Floor",
    amenities: ["Audio System", "Projector", "Wi-Fi", "AC"],
    status: "Occupied", 
    nextAvailable: "4:00 PM",
    utilizationToday: 95,
    weeklyUtilization: 89
  },
  {
    id: "CR004",
    name: "Room 305",
    type: "Classroom",
    capacity: 45,
    currentOccupancy: 0,
    building: "Main Block",
    floor: "Third Floor",
    amenities: ["Projector", "Wi-Fi"],
    status: "Available",
    nextAvailable: "Available",
    utilizationToday: 40,
    weeklyUtilization: 55
  },
  {
    id: "CR005",
    name: "Physics Lab",
    type: "Laboratory",
    capacity: 30,
    currentOccupancy: 25,
    building: "Science Block", 
    floor: "Ground Floor",
    amenities: ["Lab Equipment", "Projector", "Wi-Fi"],
    status: "Occupied",
    nextAvailable: "3:30 PM",
    utilizationToday: 75,
    weeklyUtilization: 82
  },
  {
    id: "CR006",
    name: "Conference Room",
    type: "Meeting Room",
    capacity: 20,
    currentOccupancy: 0,
    building: "Admin Block",
    floor: "First Floor",
    amenities: ["Smart Board", "Video Conf", "Wi-Fi", "AC"],
    status: "Maintenance",
    nextAvailable: "Tomorrow",
    utilizationToday: 0,
    weeklyUtilization: 45
  }
];

export default function Classrooms() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [buildingFilter, setBuildingFilter] = useState("");

  const filteredClassrooms = classroomData.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         room.building.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         room.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !typeFilter || room.type === typeFilter;
    const matchesStatus = !statusFilter || room.status === statusFilter;
    const matchesBuilding = !buildingFilter || room.building === buildingFilter;
    
    return matchesSearch && matchesType && matchesStatus && matchesBuilding;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Available":
        return <Badge className="bg-success text-success-foreground">Available</Badge>;
      case "Occupied":
        return <Badge variant="destructive">Occupied</Badge>;
      case "Maintenance":
        return <Badge className="bg-warning text-warning-foreground">Maintenance</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getUtilizationColor = (percentage: number) => {
    if (percentage > 80) return "text-destructive";
    if (percentage > 60) return "text-warning";
    if (percentage < 40) return "text-muted-foreground";
    return "text-success";
  };

  const getUtilizationBg = (percentage: number) => {
    if (percentage > 80) return "bg-destructive";
    if (percentage > 60) return "bg-warning";
    return "bg-success";
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "projector":
        return <Projector className="h-3 w-3" />;
      case "wi-fi":
        return <Wifi className="h-3 w-3" />;
      case "computers":
        return <Monitor className="h-3 w-3" />;
      default:
        return <Building className="h-3 w-3" />;
    }
  };

  const totalRooms = classroomData.length;
  const availableRooms = classroomData.filter(room => room.status === "Available").length;
  const occupiedRooms = classroomData.filter(room => room.status === "Occupied").length;
  const avgUtilization = Math.round(
    classroomData.reduce((sum, room) => sum + room.weeklyUtilization, 0) / totalRooms
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Building className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Classrooms</h1>
          <p className="text-muted-foreground">Monitor room usage, capacity, and availability</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Rooms</p>
                <p className="text-2xl font-bold">{totalRooms}</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-lg">
                <Building className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available</p>
                <p className="text-2xl font-bold text-success">{availableRooms}</p>
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
                <p className="text-sm text-muted-foreground">Occupied</p>
                <p className="text-2xl font-bold text-destructive">{occupiedRooms}</p>
              </div>
              <div className="p-2 bg-destructive/10 rounded-lg">
                <Users className="h-5 w-5 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Utilization</p>
                <p className={`text-2xl font-bold ${getUtilizationColor(avgUtilization)}`}>
                  {avgUtilization}%
                </p>
              </div>
              <div className="p-2 bg-accent/10 rounded-lg">
                <Calendar className="h-5 w-5 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search rooms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Room type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="Classroom">Classroom</SelectItem>
                <SelectItem value="Computer Lab">Computer Lab</SelectItem>
                <SelectItem value="Laboratory">Laboratory</SelectItem>
                <SelectItem value="Lecture Hall">Lecture Hall</SelectItem>
                <SelectItem value="Meeting Room">Meeting Room</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Status</SelectItem>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Occupied">Occupied</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
            <Select value={buildingFilter} onValueChange={setBuildingFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Building" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Buildings</SelectItem>
                <SelectItem value="Main Block">Main Block</SelectItem>
                <SelectItem value="Tech Block">Tech Block</SelectItem>
                <SelectItem value="Academic Block">Academic Block</SelectItem>
                <SelectItem value="Science Block">Science Block</SelectItem>
                <SelectItem value="Admin Block">Admin Block</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-primary hover:bg-primary-light">
              <Plus className="mr-2 h-4 w-4" />
              Add Room
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Classrooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClassrooms.map((room) => (
          <Card key={room.id} className="dashboard-card hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{room.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" />
                    {room.building} • {room.floor}
                  </CardDescription>
                </div>
                {getStatusBadge(room.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Room Type & Capacity */}
              <div className="flex items-center justify-between">
                <Badge variant="outline">{room.type}</Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>
                    {room.currentOccupancy}/{room.capacity}
                  </span>
                </div>
              </div>

              {/* Occupancy Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Current Occupancy</span>
                  <span className="font-medium">
                    {Math.round((room.currentOccupancy / room.capacity) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      room.status === "Occupied" 
                        ? "bg-destructive" 
                        : room.status === "Available" 
                          ? "bg-success" 
                          : "bg-warning"
                    }`}
                    style={{ 
                      width: `${Math.min((room.currentOccupancy / room.capacity) * 100, 100)}%` 
                    }}
                  />
                </div>
              </div>

              {/* Utilization */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Today</p>
                  <p className={`font-medium ${getUtilizationColor(room.utilizationToday)}`}>
                    {room.utilizationToday}%
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">This Week</p>
                  <p className={`font-medium ${getUtilizationColor(room.weeklyUtilization)}`}>
                    {room.weeklyUtilization}%
                  </p>
                </div>
              </div>

              {/* Next Available */}
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Next available:</span>
                <span className="font-medium">{room.nextAvailable}</span>
              </div>

              {/* Amenities */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Amenities</p>
                <div className="flex flex-wrap gap-1">
                  {room.amenities.map((amenity, index) => (
                    <Badge key={index} variant="secondary" className="text-xs flex items-center gap-1">
                      {getAmenityIcon(amenity)}
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  disabled={room.status !== "Available"}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Book
                </Button>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClassrooms.length === 0 && (
        <Card className="dashboard-card">
          <CardContent className="text-center py-12">
            <Building className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-lg font-medium text-muted-foreground">
              No classrooms found
            </p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search filters
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}