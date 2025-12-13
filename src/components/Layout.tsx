import { type ReactNode, useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface LayoutProps {
  children: ReactNode;
}

interface Tab {
  name: string;
  path: string;
}

// Define all menu items
const menuItems: Tab[] = [
  { name: "Overview", path: "/" },
  { name: "Users", path: "/users" },
  { name: "Products", path: "/products" },
  { name: "Posts", path: "/posts" },
  { name: "Blogs", path: "/blogs" },
  { name: "Comments", path: "/comments" },
];

const STORAGE_KEY = "breadcrumb-tabs";

function getInitialTabs(): Tab[] {
  if (typeof window === "undefined") {
    return [{ name: "Overview", path: "/" }];
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure we always have at least the Overview tab
      if (Array.isArray(parsed) && parsed.length > 0) {
        const hasOverview = parsed.some((tab: Tab) => tab.path === "/");
        if (!hasOverview) {
          return [{ name: "Overview", path: "/" }, ...parsed];
        }
        return parsed;
      }
    }
  } catch (error) {
    console.error("Failed to load tabs from localStorage:", error);
  }

  return [{ name: "Overview", path: "/" }];
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

      if (!tabExists) {
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

    // Use requestAnimationFrame to avoid synchronous setState in effect
    requestAnimationFrame(initializeTabs);
  }, []); // Empty dependency array - runs once on mount

  // Save tabs to localStorage whenever they change
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tabs));
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

      if (!tabExists) {
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
      // Don't close the last tab
      if (tabs.length <= 1) return;

      setTabs((prev) => {
        const newTabs = prev.filter((t) => t.path !== path);
        return newTabs;
      });

      // If we're closing the active tab, navigate to another tab
      if (location === path) {
        const remainingTabs = tabs.filter((t) => t.path !== path);
        if (remainingTabs.length > 0) {
          // Navigate to the tab to the left, or if it's the first tab, navigate to the next one
          const currentIndex = tabs.findIndex((t) => t.path === path);
          let targetIndex = currentIndex - 1;
          if (targetIndex < 0) targetIndex = 0;

          const targetTab =
            remainingTabs[targetIndex] ||
            remainingTabs[remainingTabs.length - 1];
          setLocation(targetTab.path);
        } else {
          // Should never happen because we prevent closing the last tab
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
        <main className="flex-1 bg-gray-200 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
