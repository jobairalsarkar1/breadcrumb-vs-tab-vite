import { useState, type FC } from "react";

export interface TreeNodeData {
  label: string;
  children?: TreeNodeData[];
}

const data: TreeNodeData[] = [
  {
    label: "Electronics",
    children: [
      {
        label: "TV",
        children: [
          { label: "Samsung" },
          { label: "Apple" },
          { label: "Vision" },
          { label: "Walton" },
          { label: "Panasonnic" },
          { label: "LG" },
        ],
      },
      {
        label: "Fridge",
        children: [{ label: "LG" }, { label: "Bosch" }],
      },
      { label: "Oven" },
    ],
  },
  {
    label: "Accessories",
    children: [
      {
        label: "Necessaries",
        children: [{ label: "Pen" }, { label: "Paper" }, { label: "Ledger" }],
      },
      {
        label: "Utilities",
        children: [{ label: "Purse" }, { label: "File" }],
      },
    ],
  },
];

const TreeNodeList: FC<{ nodes: TreeNodeData[] }> = ({ nodes }) => {
  return (
    <ul
      className="
        relative 
        ml-5
        before:absolute before:top-0 before:bottom-3.5 
        before:left-[-15px] before:w-px before:bg-black
      "
    >
      {nodes.map((node, i) => (
        <TreeNode key={i} node={node} />
      ))}
    </ul>
  );
};

const TreeNode: FC<{ node: TreeNodeData }> = ({ node }) => {
  const [open, setOpen] = useState(true);

  return (
    <li
      className="
        relative pl-3
        before:absolute before:top-3.5
        before:left-[-15px] before:w-[25px] before:h-px 
        before:bg-black
      "
    >
      <div
        className="cursor-pointer py-1 text-sm text-black flex items-center gap-1"
        onClick={() => setOpen(!open)}
      >
        {node.children ? (
          <span className="text-xs">{open ? "▼" : "▶"}</span>
        ) : (
          <span className="text-[10px]">•</span>
        )}

        {node.label}
      </div>

      {node.children && open && <TreeNodeList nodes={node.children} />}
    </li>
  );
};

export default function Products() {
  return (
    <div className="w-[260px] h-full border-r border-gray-300 bg-transparent p-3 overflow-y-auto">
      <h3 className="text-gray-800 mb-1">Categories</h3>
      <TreeNodeList nodes={data} />
    </div>
  );
}
