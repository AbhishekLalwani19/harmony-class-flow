import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Calendar, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/5 to-accent/5 py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="mb-6 text-5xl font-bold text-foreground">
            Smart Classroom & Timetable Scheduler
          </h1>
          <p className="mb-8 text-xl text-muted-foreground max-w-3xl mx-auto">
            Streamline your educational institution's scheduling with our AI-powered timetable management system. 
            Optimize resources, reduce conflicts, and enhance learning experiences.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Get Started
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="lg">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Powerful Features for Modern Education
            </h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to manage your institution's scheduling efficiently
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="dashboard-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="p-2 bg-primary/10 rounded-lg w-fit">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Smart Scheduling</CardTitle>
                <CardDescription>
                  AI-powered timetable generation with conflict detection and optimization
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="dashboard-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="p-2 bg-accent/10 rounded-lg w-fit">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Faculty Management</CardTitle>
                <CardDescription>
                  Track availability, workload distribution, and assignment optimization
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="dashboard-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="p-2 bg-success/10 rounded-lg w-fit">
                  <BookOpen className="h-6 w-6 text-success" />
                </div>
                <CardTitle>Resource Optimization</CardTitle>
                <CardDescription>
                  Maximize classroom utilization and manage laboratory allocations
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="dashboard-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="p-2 bg-warning/10 rounded-lg w-fit">
                  <BarChart3 className="h-6 w-6 text-warning" />
                </div>
                <CardTitle>Analytics & Reports</CardTitle>
                <CardDescription>
                  Comprehensive insights into utilization patterns and performance metrics
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
