import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  Download, 
  Filter, 
  Calendar, 
  Clock,
  Search,
  FileText,
  TableIcon
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const sampleTimetables = [
  {
    id: "TT001",
    name: "CSE Batch 2024 - Semester 1",
    class: "Computer Science",
    batch: "2024",
    faculty: "Dr. Smith, Prof. Johnson",
    created: "2024-01-15",
    status: "Active",
    conflicts: 0
  },
  {
    id: "TT002", 
    name: "EEE Batch 2023 - Semester 3",
    class: "Electrical Engineering",
    batch: "2023",
    faculty: "Dr. Brown, Prof. Davis",
    created: "2024-01-12",
    status: "Active",
    conflicts: 1
  },
  {
    id: "TT003",
    name: "ME Batch 2024 - Semester 1",
    class: "Mechanical Engineering", 
    batch: "2024",
    faculty: "Prof. Wilson, Dr. Lee",
    created: "2024-01-10",
    status: "Draft",
    conflicts: 2
  }
];

const weeklySchedule = [
  { time: "09:00 AM", monday: "Mathematics", tuesday: "Physics", wednesday: "Chemistry", thursday: "English", friday: "Biology" },
  { time: "10:00 AM", monday: "Physics", tuesday: "Mathematics", wednesday: "English", thursday: "Chemistry", friday: "Computer Sci" },
  { time: "11:00 AM", monday: "Chemistry", tuesday: "Biology", wednesday: "Physics", thursday: "Mathematics", friday: "English" },
  { time: "12:00 PM", monday: "English", tuesday: "Computer Sci", wednesday: "Mathematics", thursday: "Physics", friday: "Chemistry" },
  { time: "01:00 PM", monday: "Lunch Break", tuesday: "Lunch Break", wednesday: "Lunch Break", thursday: "Lunch Break", friday: "Lunch Break" },
  { time: "02:00 PM", monday: "Biology", tuesday: "English", wednesday: "Computer Sci", thursday: "Biology", friday: "Physics" },
  { time: "03:00 PM", monday: "Computer Sci", tuesday: "Chemistry", wednesday: "Biology", thursday: "Computer Sci", friday: "Mathematics" }
];

export default function ViewTimetables() {
  const [selectedTimetable, setSelectedTimetable] = useState<string | null>(null);
  const [filterClass, setFilterClass] = useState<string>("all");
  const [filterBatch, setFilterBatch] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredTimetables = sampleTimetables.filter(timetable => {
    const matchesSearch = timetable.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         timetable.class.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = filterClass === "all" || timetable.class === filterClass;
    const matchesBatch = filterBatch === "all" || timetable.batch === filterBatch;
    
    return matchesSearch && matchesClass && matchesBatch;
  });

  const handleExport = (format: 'pdf' | 'excel') => {
    console.log(`Exporting as ${format.toUpperCase()}`);
    // Implement export logic
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Eye className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">View Timetables</h1>
          <p className="text-muted-foreground">Browse and manage existing timetables</p>
        </div>
      </div>

      {/* Filters */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
          <CardDescription>
            Find specific timetables using filters and search
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search timetables..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterClass} onValueChange={setFilterClass}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterBatch} onValueChange={setFilterBatch}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by batch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Batches</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => handleExport('pdf')}
                className="flex-1"
              >
                <FileText className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleExport('excel')}
                className="flex-1"
              >
                <Download className="mr-2 h-4 w-4" />
                Excel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timetables List */}
        <div className="lg:col-span-1">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TableIcon className="h-5 w-5" />
                Timetables ({filteredTimetables.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {filteredTimetables.map((timetable) => (
                <div
                  key={timetable.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedTimetable === timetable.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedTimetable(timetable.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{timetable.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {timetable.class} • {timetable.batch}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Created: {timetable.created}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge 
                        variant={timetable.status === "Active" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {timetable.status}
                      </Badge>
                      {timetable.conflicts > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {timetable.conflicts} conflicts
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredTimetables.length === 0 && (
                <div className="text-center py-8">
                  <TableIcon className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-muted-foreground">No timetables found</p>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search filters
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Timetable Preview */}
        <div className="lg:col-span-2">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {selectedTimetable ? "Timetable Preview" : "Select a Timetable"}
              </CardTitle>
              <CardDescription>
                {selectedTimetable 
                  ? "Weekly schedule view with detailed time slots"
                  : "Choose a timetable from the list to view its schedule"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedTimetable ? (
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-24">Time</TableHead>
                          <TableHead>Monday</TableHead>
                          <TableHead>Tuesday</TableHead>
                          <TableHead>Wednesday</TableHead>
                          <TableHead>Thursday</TableHead>
                          <TableHead>Friday</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {weeklySchedule.map((slot, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                {slot.time}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={slot.monday === "Lunch Break" ? "secondary" : "outline"}
                                className="whitespace-nowrap"
                              >
                                {slot.monday}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={slot.tuesday === "Lunch Break" ? "secondary" : "outline"}
                                className="whitespace-nowrap"
                              >
                                {slot.tuesday}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={slot.wednesday === "Lunch Break" ? "secondary" : "outline"}
                                className="whitespace-nowrap"
                              >
                                {slot.wednesday}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={slot.thursday === "Lunch Break" ? "secondary" : "outline"}
                                className="whitespace-nowrap"
                              >
                                {slot.thursday}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={slot.friday === "Lunch Break" ? "secondary" : "outline"}
                                className="whitespace-nowrap"
                              >
                                {slot.friday}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-4 border-t">
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                    <Button>
                      Edit Timetable
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-lg font-medium text-muted-foreground">
                    No Timetable Selected
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Select a timetable from the list to view its weekly schedule
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}