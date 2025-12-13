import { useState } from "react";
import { useLocation } from "wouter";
import {
  LayoutGrid,
  Users,
  ShoppingBag,
  FileText,
  MessageSquare,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react";

interface MenuItem {
  name: string;
  icon: React.ReactNode;
  path: string;
}

const menuItems: MenuItem[] = [
  {
    name: "Overview",
    icon: <LayoutGrid size={20} className="text-green-700" />,
    path: "/",
  },
  {
    name: "Users",
    icon: <Users size={20} className="text-blue-700" />,
    path: "/users",
  },
  {
    name: "Products",
    icon: <ShoppingBag size={20} className="text-orange-700" />,
    path: "/products",
  },
  {
    name: "Posts",
    icon: <FileText size={20} className="text-violet-700" />,
    path: "/posts",
  },
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
      className={`h-screen border-r-2 border-[#90A1B9] bg-white text-gray-600 flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-68"
      }`}
    >
      {/* Collapse Button */}
      <div className="flex items-center justify-between px-6 py-5 border-b-2 border-gray-300 bg-[#FAFAFA]">
        {!collapsed && <h1 className="text-xl font-semibold">Dashboard</h1>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`${
            collapsed && "w-full flex items-center justify-center"
          }`}
        >
          {collapsed ? <PanelRightClose /> : <PanelRightOpen />}
        </button>
      </div>

      {/* Menu */}
      <nav className="mt-4 flex-1 flex flex-col gap-1 bg-white">
        {menuItems.map((item) => {
          const isActive = location === item.path;
          return (
            <button
              key={item.name}
              onClick={() => onTabOpen(item.path)}
              className={`flex items-center gap-3 py-3 px-6 rounded-md transition ${
                isActive ? "bg-blue-50" : "hover:bg-blue-50"
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
