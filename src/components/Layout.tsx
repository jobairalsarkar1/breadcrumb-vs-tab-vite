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
  Plus,
} from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

interface Tab {
  id: string;
  name: string;
  path: string;
  icon?: React.ReactNode;
  isEmpty?: boolean;
  createdAt: number;
}

// Define all menu items with icons for tabs
const menuItems: Omit<Tab, "id" | "createdAt">[] = [
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
  id?: string; // Make id optional for backward compatibility
  name: string;
  path: string;
  isEmpty?: boolean;
  createdAt?: number;
}

// Helper to generate ID for old tabs without ID
function generateIdForOldTab(tab: SavedTab): string {
  if (tab.id) return tab.id;

  if (tab.path === "/") return "home";
  if (tab.path.startsWith("/empty-")) {
    return `empty-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  return `page-${tab.path.replace(/\//g, "-")}`;
}

function getInitialTabs(): Tab[] {
  if (typeof window === "undefined") {
    return [
      {
        id: "home",
        name: "Overview",
        path: "/",
        icon: <LayoutGrid size={14} className="text-green-700" />,
        createdAt: Date.now(),
      },
    ];
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed: SavedTab[] = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const restoredTabs = parsed.map((tab: SavedTab) => {
          const id = generateIdForOldTab(tab);
          const createdAt = tab.createdAt || Date.now();

          if (tab.isEmpty || tab.path.startsWith("/empty-")) {
            return {
              id,
              name: tab.name,
              path: tab.path,
              icon: <Plus size={14} className="text-gray-500" />,
              isEmpty: true,
              createdAt,
            };
          }

          const menuItem = menuItems.find((m) => m.path === tab.path);
          return {
            id,
            name: tab.name,
            path: tab.path,
            icon: menuItem?.icon || undefined,
            createdAt,
          };
        });
        // Sort by creation time
        return restoredTabs.sort((a, b) => a.createdAt - b.createdAt);
      }
    }
  } catch (error) {
    console.error("Failed to load tabs from localStorage:", error);
  }

  return [
    {
      id: "home",
      name: "Overview",
      path: "/",
      icon: <LayoutGrid size={14} className="text-green-700" />,
      createdAt: Date.now(),
    },
  ];
}

function generateTabId(path: string): string {
  if (path === "/") return "home";
  if (path.startsWith("/empty-")) {
    return `empty-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  return `page-${path.replace(/\//g, "-")}`;
}

function generateEmptyTabPath(): string {
  return `/empty-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export default function Layout({ children }: LayoutProps) {
  const [location, setLocation] = useLocation();
  const [tabs, setTabs] = useState<Tab[]>(getInitialTabs);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize tabs based on URL on first render
  useEffect(() => {
    if (isInitialized) return;

    const initializeTabs = () => {
      // If it's an empty tab, just mark as initialized
      if (location.startsWith("/empty-")) {
        setIsInitialized(true);
        return;
      }

      const currentMenuItem = menuItems.find((m) => m.path === location);
      const initialTabs = getInitialTabs();

      if (!currentMenuItem) {
        setIsInitialized(true);
        return;
      }

      const tabId = generateTabId(location);
      // Check if tab exists by path (for backward compatibility)
      const tabExists = initialTabs.some(
        (tab) => tab.id === tabId || tab.path === location
      );

      if (!tabExists && currentMenuItem.path !== "/") {
        const newTab: Tab = {
          id: tabId,
          name: currentMenuItem.name,
          path: currentMenuItem.path,
          icon: currentMenuItem.icon,
          createdAt: Date.now(),
        };

        setTabs((prev) => [...prev, newTab]);
      } else if (!tabExists && location === "/") {
        // Ensure home tab exists
        const homeTabExists = initialTabs.some((tab) => tab.path === "/");
        if (!homeTabExists) {
          const homeTab: Tab = {
            id: "home",
            name: "Overview",
            path: "/",
            icon: <LayoutGrid size={14} className="text-green-700" />,
            createdAt: Date.now(),
          };
          setTabs((prev) => [...prev, homeTab]);
        }
      }

      setIsInitialized(true);
    };

    requestAnimationFrame(initializeTabs);
  }, [isInitialized, location]);

  // Save tabs to localStorage whenever they change
  useEffect(() => {
    if (!isInitialized) return;
    try {
      const tabsToSave: SavedTab[] = tabs.map(
        ({ id, name, path, isEmpty, createdAt }) => ({
          id,
          name,
          path,
          isEmpty,
          createdAt,
        })
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tabsToSave));
    } catch (error) {
      console.error("Failed to save tabs to localStorage:", error);
    }
  }, [tabs, isInitialized]);

  const handleNewTab = useCallback(() => {
    const emptyTabPath = generateEmptyTabPath();
    const emptyTabId = generateTabId(emptyTabPath);

    const emptyTab: Tab = {
      id: emptyTabId,
      name: "New Tab",
      path: emptyTabPath,
      icon: <Plus size={14} className="text-gray-500" />,
      isEmpty: true,
      createdAt: Date.now(),
    };

    setTabs((prev) => [...prev, emptyTab]);
    setLocation(emptyTabPath);
  }, [setLocation]);

  const handleTabOpen = useCallback(
    (path: string) => {
      const menuItem = menuItems.find((m) => m.path === path);
      if (!menuItem) return;

      const tabId = generateTabId(path);

      // Check if tab already exists (by path for backward compatibility)
      const existingTab = tabs.find((t) => t.id === tabId || t.path === path);

      if (existingTab) {
        // Switch to existing tab
        setLocation(existingTab.path);
        return;
      }

      // Check if we have an active empty tab that should be replaced
      const activeTab = tabs.find((t) => t.path === location);
      const isActiveEmpty = activeTab?.isEmpty;

      if (isActiveEmpty) {
        // Replace the empty tab with the clicked page
        setTabs((prev) => {
          const newTab: Tab = {
            id: tabId,
            name: menuItem.name,
            path: menuItem.path,
            icon: menuItem.icon,
            createdAt: Date.now(),
          };

          return prev.map((t) => (t.id === activeTab.id ? newTab : t));
        });
        setLocation(path);
        return;
      }

      // Create new tab
      const newTab: Tab = {
        id: tabId,
        name: menuItem.name,
        path: menuItem.path,
        icon: menuItem.icon,
        createdAt: Date.now(),
      };

      setTabs((prev) => [...prev, newTab]);
      setLocation(path);
    },
    [setLocation, tabs, location]
  );

  const handleTabClick = useCallback(
    (path: string) => {
      setLocation(path);
    },
    [setLocation]
  );

  const handleTabClose = useCallback(
    (path: string) => {
      // Find the tab(s) to close (by path for backward compatibility)
      const tabsToClose = tabs.filter((t) => t.path === path);
      if (tabsToClose.length === 0) return;

      // Don't allow closing the home tab if it's the only non-empty tab
      const nonEmptyTabs = tabs.filter(
        (t) => !t.isEmpty && !t.path.startsWith("/empty-")
      );
      if (nonEmptyTabs.length === 1 && nonEmptyTabs[0].path === "/") {
        return;
      }

      // Find index of active tab to close
      const activeTabIndex = tabs.findIndex(
        (t) => t.path === location && t.path === path
      );

      // Create new tabs array without the closed tab(s)
      const newTabs = tabs.filter((t) => t.path !== path);
      setTabs(newTabs);

      // If we're closing the active tab, navigate to another tab
      if (location === path) {
        // Chrome-like behavior: navigate to tab on the LEFT if available
        if (activeTabIndex > 0) {
          // Navigate to tab to the left
          setLocation(tabs[activeTabIndex - 1].path);
        } else if (newTabs.length > 0) {
          // If closing first tab, navigate to the new first tab
          setLocation(newTabs[0].path);
        } else {
          // No tabs left, go to home
          setLocation("/");
        }
      }
    },
    [tabs, location, setLocation]
  );

  // Check if current location is an empty tab
  const isCurrentEmptyTab = tabs.some(
    (tab) =>
      tab.path === location && (tab.isEmpty || tab.path.startsWith("/empty-"))
  );

  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar onTabOpen={handleTabOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar
          tabs={tabs}
          activeTab={location}
          onTabClick={handleTabClick}
          onTabClose={handleTabClose}
          onNewTab={handleNewTab}
        />
        <main className="flex-1 bg-gray-200 overflow-auto">
          {isCurrentEmptyTab ? (
            <div className="h-full flex items-center justify-center bg-gray-100">
              <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
                <Plus size={48} className="mx-auto text-gray-400 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                  New Tab
                </h2>
                <p className="text-gray-600 mb-6">
                  Click on any sidebar link to load content in this tab.
                </p>
                <div className="text-sm text-gray-500">
                  <p>This empty tab will be replaced when you:</p>
                  <ul className="mt-2 list-disc list-inside text-left">
                    <li>Click a sidebar menu item</li>
                    <li>Navigate to any page from the sidebar</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
}
