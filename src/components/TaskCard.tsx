import React from "react";

interface TaskCardProps {
  label: string;
  checked?: boolean;
  color: "blue" | "green" | "purple";
  onStart: () => void;
  onDelete: () => void;
  onCheck?: (checked: boolean) => void;
  startLabel?: string;
}

const colorMap = {
  blue: {
    checkbox: "text-cyan-400",
    button: "bg-cyan-500 text-cyan-100 hover:bg-cyan-500/60",
  },
  green: {
    checkbox: "text-lime-400",
    button: "bg-lime-500 text-lime-900 hover:bg-lime-500/60",
  },
  purple: {
    checkbox: "text-rose-500",
    button: "bg-rose-600 text-rose-100 hover:bg-rose-600/60",
  },
};

export default function TaskCard({
  label,
  checked = false,
  color,
  onStart,
  onDelete,
  onCheck,
  startLabel = "Start",
}: TaskCardProps) {
  return (
    <div className="flex items-center space-x-2 justify-between w-full">
      <input
        type="checkbox"
        className={`form-checkbox h-4 w-4 rounded border-gray-600 bg-gray-700 ${colorMap[color].checkbox}`}
        checked={checked}
        onChange={(e) => onCheck?.(e.target.checked)}
      />
      <span className="text-gray-300">{label}</span>
      <div className="flex items-center space-x-2 ml-auto">
        <button
          onClick={onDelete}
          className="text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Delete task"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          onClick={onStart}
          className={`cursor-pointer px-3 py-1 text-xs font-medium rounded-full transition-colors ${colorMap[color].button}`}
        >
          {startLabel}
        </button>
      </div>
    </div>
  );
}
