import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Eye,
  Users,
  Building,
  BarChart3,
  Settings,
  LogOut,
  GraduationCap,
} from "lucide-react";

const navigationItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Create Timetable", href: "/create-timetable", icon: Calendar },
  { name: "View Timetables", href: "/view-timetables", icon: Eye },
  { name: "Faculty Allocation", href: "/faculty-allocation", icon: Users },
  { name: "Classrooms", href: "/classrooms", icon: Building },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <div className="flex h-full w-64 flex-col bg-card border-r border-border">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-border">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <GraduationCap className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-foreground">Smart Classroom</h1>
          <p className="text-xs text-muted-foreground">Timetable Scheduler</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-4">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-border p-4">
        <button className="nav-link w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive">
          <LogOut className="h-5 w-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}