import { X } from "lucide-react";

interface Tab {
  name: string;
  path: string;
}

interface TopbarProps {
  tabs: Tab[];
  activeTab: string;
  onTabClick: (path: string) => void;
  onTabClose: (path: string) => void;
}

export default function Topbar({
  tabs,
  activeTab,
  onTabClick,
  onTabClose,
}: TopbarProps) {
  return (
    <div className="h-14 flex items-stretch overflow-x-auto bg-white shadow">
      {tabs.map((tab, idx) => {
        const isActive = activeTab === tab.path;
        const isOnlyTab = tabs.length === 1;
        const isOverviewTab = tab.path === "/";

        // Check neighboring tabs
        const prevTab = tabs[idx - 1];
        const nextTab = tabs[idx + 1];
        const roundedLeft = prevTab?.path === activeTab ? "rounded-bl-lg" : "";
        const roundedRight = nextTab?.path === activeTab ? "rounded-br-lg" : "";

        return (
          <div
            key={`${tab.path}-${idx}`}
            onClick={() => onTabClick(tab.path)}
            className={`flex items-center justify-between px-4 cursor-pointer select-none border-r border-b w-[200px] shrink-0
              ${
                isActive
                  ? "bg-gray-200 border-transparent font-semibold"
                  : "bg-white border-gray-500 hover:bg-gray-100"
              }
              ${roundedLeft} ${roundedRight}
            `}
          >
            <span className="text-black mr-2 truncate">{tab.name}</span>
            {!isOnlyTab && (
              <X
                className="w-4 h-4 text-gray-500 hover:text-gray-800 hover:bg-gray-300 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  onTabClose(tab.path);
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
