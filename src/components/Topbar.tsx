import { X, Home } from "lucide-react";

interface Tab {
  name: string;
  path: string;
  icon?: React.ReactNode;
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
    <div className="h-9 flex items-center overflow-x-auto bg-white shadow thin-scrollbar">
      {/* HOME ICON - Separate button */}
      <button
        onClick={() => onTabClick("/")}
        className="px-3 border-r border-b border-gray-400 h-full flex items-center hover:bg-gray-100 text-black shrink-0"
      >
        <Home size={15} />
      </button>

      {tabs.map((tab) => {
        const isActive = activeTab === tab.path;

        return (
          <div
            key={tab.path}
            className={`flex items-center justify-between text-black gap-2 px-4 cursor-pointer 
              border-r border-gray-400 h-full w-[180px] shrink-0
              ${
                isActive
                  ? "bg-gray-200 font-semibold"
                  : "border-b bg-white hover:bg-gray-100"
              }
            `}
            onClick={() => onTabClick(tab.path)}
          >
            {/* ICON + NAME */}
            <div className="text-xs flex items-center gap-2 truncate">
              {tab.icon}
              <span className="truncate">{tab.name}</span>
            </div>

            <button
              className="w-4 h-4 flex items-center justify-center text-gray-500 hover:text-black"
              onClick={(e) => handleCloseClick(e, tab.path)}
              aria-label={`Close ${tab.name} tab`}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
