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
  const handleCloseClick = (e: React.MouseEvent, path: string) => {
    e.stopPropagation();
    onTabClose(path);
  };

  return (
    <div className="h-14 flex items-stretch overflow-x-auto bg-white shadow">
      {tabs.map((tab, idx) => {
        const isActive = activeTab === tab.path;
        const isOnlyTab = tabs.length === 1;

        // Check neighboring tabs
        const prevTab = tabs[idx - 1];
        const nextTab = tabs[idx + 1];
        const roundedLeft = prevTab?.path === activeTab ? "rounded-bl-lg" : "";
        const roundedRight = nextTab?.path === activeTab ? "rounded-br-lg" : "";

        return (
          <div
            key={`${tab.path}-${idx}`}
            className={`flex items-center justify-between px-4 cursor-pointer select-none border-r border-b w-[200px] shrink-0
              ${
                isActive
                  ? "bg-gray-200 border-transparent font-semibold"
                  : "bg-white border-gray-500 hover:bg-gray-100"
              }
              ${roundedLeft} ${roundedRight}
            `}
          >
            <span
              className="text-black mr-2 truncate flex-1"
              onClick={() => onTabClick(tab.path)}
            >
              {tab.name}
            </span>
            {!isOnlyTab && (
              <button
                className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-300 rounded"
                onClick={(e) => handleCloseClick(e, tab.path)}
                aria-label={`Close ${tab.name} tab`}
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
