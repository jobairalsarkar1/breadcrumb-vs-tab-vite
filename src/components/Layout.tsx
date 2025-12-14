import { type ReactNode, useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import {
  LayoutGrid,
  Users,
  ShoppingBag,
  FileText,
  MessageSquare,
} from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

interface Tab {
  name: string;
  path: string;
  icon?: React.ReactNode;
}

// Define all menu items with icons for tabs
const menuItems: Tab[] = [
  {
    name: "Overview",
    path: "/",
    icon: <LayoutGrid size={14} className="text-green-700" />,
  },
  {
    name: "Users",
    path: "/users",
    icon: <Users size={14} className="text-blue-700" />,
  },
  {
    name: "Products",
    path: "/products",
    icon: <ShoppingBag size={14} className="text-orange-700" />,
  },
  {
    name: "Posts",
    path: "/posts",
    icon: <FileText size={14} className="text-violet-700" />,
  },
  {
    name: "Blogs",
    path: "/blogs",
    icon: <FileText size={14} />,
  },
  {
    name: "Comments",
    path: "/comments",
    icon: <MessageSquare size={14} />,
  },
];

const STORAGE_KEY = "breadcrumb-tabs";

interface SavedTab {
  name: string;
  path: string;
}

function getInitialTabs(): Tab[] {
  if (typeof window === "undefined") {
    return [
      {
        name: "Overview",
        path: "/",
        icon: <LayoutGrid size={14} className="text-green-700" />,
      },
    ];
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed: SavedTab[] = JSON.parse(saved);
      // Restore tabs with their icons
      if (Array.isArray(parsed) && parsed.length > 0) {
        const restoredTabs = parsed.map((tab: SavedTab) => {
          // Find the matching menu item to get the icon
          const menuItem = menuItems.find((m) => m.path === tab.path);
          return {
            ...tab,
            icon: menuItem?.icon || undefined,
          };
        });
        return restoredTabs;
      }
    }
  } catch (error) {
    console.error("Failed to load tabs from localStorage:", error);
  }

  return [
    {
      name: "Overview",
      path: "/",
      icon: <LayoutGrid size={14} className="text-green-700" />,
    },
  ];
}

export default function Layout({ children }: LayoutProps) {
  const [location, setLocation] = useLocation();
  const [tabs, setTabs] = useState<Tab[]>(getInitialTabs);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize tabs based on URL on first render
  useEffect(() => {
    if (isInitialized) return;

    const initializeTabs = () => {
      const currentTab = menuItems.find((m) => m.path === location);
      const initialTabs = getInitialTabs();

      if (!currentTab) {
        setIsInitialized(true);
        return;
      }

      // Check if current tab already exists in initial tabs
      const tabExists = initialTabs.some((tab) => tab.path === location);

      if (!tabExists && currentTab.path !== "/") {
        // Add the current tab to initial tabs
        const newTabs = [...initialTabs, currentTab];
        const uniqueTabs = Array.from(
          new Map(newTabs.map((tab) => [tab.path, tab])).values()
        );
        setTabs(uniqueTabs);
      } else {
        setTabs(initialTabs);
      }

      setIsInitialized(true);
    };

    requestAnimationFrame(initializeTabs);
  }, [isInitialized, location]);

  // Save tabs to localStorage whenever they change
  useEffect(() => {
    if (!isInitialized) return;
    try {
      // Save only essential data (not React elements)
      const tabsToSave: SavedTab[] = tabs.map(({ name, path }) => ({
        name,
        path,
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tabsToSave));
    } catch (error) {
      console.error("Failed to save tabs to localStorage:", error);
    }
  }, [tabs, isInitialized]);

  // Handle adding tabs when location changes (after initialization)
  useEffect(() => {
    if (!isInitialized) return;

    const handleLocationChange = () => {
      const currentTab = menuItems.find((m) => m.path === location);
      if (!currentTab) return;

      // Check if current tab already exists
      const tabExists = tabs.some((tab) => tab.path === location);

      if (!tabExists && currentTab.path !== "/") {
        setTabs((prev) => {
          const newTabs = [...prev, currentTab];
          // Remove duplicates
          const uniqueTabs = Array.from(
            new Map(newTabs.map((tab) => [tab.path, tab])).values()
          );
          return uniqueTabs;
        });
      }
    };

    requestAnimationFrame(handleLocationChange);
  }, [location, isInitialized, tabs]);

  const handleTabOpen = useCallback(
    (path: string) => {
      const tab = menuItems.find((m) => m.path === path);
      if (!tab) return;

      setTabs((prev) => {
        // Check if tab already exists
        const tabExists = prev.some((t) => t.path === path);
        if (tabExists) {
          // If it exists, just navigate to it
          setLocation(path);
          return prev;
        }

        // Add new tab and remove duplicates
        const newTabs = [...prev, tab];
        const uniqueTabs = Array.from(
          new Map(newTabs.map((t) => [t.path, t])).values()
        );
        return uniqueTabs;
      });

      setLocation(path);
    },
    [setLocation]
  );

  const handleTabClick = useCallback(
    (path: string) => {
      setLocation(path);
    },
    [setLocation]
  );

  const handleTabClose = useCallback(
    (path: string) => {
      // Find the current index of the tab to close
      const currentIndex = tabs.findIndex((t) => t.path === path);
      if (currentIndex === -1) return;

      // Determine which tab to navigate to after closing
      let targetTab: Tab | null = null;

      if (tabs.length > 1) {
        // Try to navigate to the tab to the left (like Chrome)
        if (currentIndex > 0) {
          targetTab = tabs[currentIndex - 1];
        }
        // If it's the first tab, navigate to the next tab
        else if (currentIndex === 0 && tabs.length > 1) {
          targetTab = tabs[1];
        }
      }

      // Remove the tab from the tabs array
      const newTabs = tabs.filter((t) => t.path !== path);
      setTabs(newTabs);

      // If we're closing the active tab, navigate to targetTab
      if (location === path) {
        if (targetTab) {
          // Navigate to the target tab
          setLocation(targetTab.path);
        } else if (newTabs.length > 0) {
          // Fallback: navigate to the first tab
          setLocation(newTabs[0].path);
        } else {
          // No tabs left, go to home
          setLocation("/");
        }
      }
    },
    [tabs, location, setLocation]
  );

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar onTabOpen={handleTabOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar
          tabs={tabs}
          activeTab={location}
          onTabClick={handleTabClick}
          onTabClose={handleTabClose}
        />
        <main className="flex-1 bg-gray-200 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
