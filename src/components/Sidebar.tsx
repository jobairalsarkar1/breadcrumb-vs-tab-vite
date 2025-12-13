import { useState } from "react";
import { useLocation } from "wouter";
import {
  LayoutGrid,
  Users,
  ShoppingBag,
  FileText,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface MenuItem {
  name: string;
  icon: React.ReactNode;
  path: string;
}

const menuItems: MenuItem[] = [
  { name: "Overview", icon: <LayoutGrid size={20} />, path: "/" },
  { name: "Users", icon: <Users size={20} />, path: "/users" },
  { name: "Products", icon: <ShoppingBag size={20} />, path: "/products" },
  { name: "Posts", icon: <FileText size={20} />, path: "/posts" },
  { name: "Blogs", icon: <FileText size={20} />, path: "/blogs" },
  { name: "Comments", icon: <MessageSquare size={20} />, path: "/comments" },
];

interface SidebarProps {
  onTabOpen: (path: string) => void;
}

export default function Sidebar({ onTabOpen }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [location] = useLocation();

  return (
    <div
      className={`h-screen bg-gray-900 text-white flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Collapse Button */}
      <div className="flex items-center justify-between px-4 py-[13.5px] border-b border-gray-700">
        {!collapsed && <h1 className="text-xl font-semibold">Dashboard</h1>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`${
            collapsed && "w-full flex items-center justify-center"
          }`}
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      {/* Menu */}
      <nav className="mt-4 flex-1 flex flex-col gap-1">
        {menuItems.map((item) => {
          const isActive = location === item.path;
          return (
            <button
              key={item.name}
              onClick={() => onTabOpen(item.path)}
              className={`flex items-center gap-3 p-3 rounded-md transition ${
                isActive ? "bg-gray-800" : "hover:bg-gray-800"
              } ${collapsed ? "justify-center" : ""}`}
            >
              {item.icon}
              {!collapsed && <span>{item.name}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
