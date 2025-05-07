interface ImportTasksButtonProps {
  onClick: () => void;
}

export default function ImportTasksButton({ onClick }: ImportTasksButtonProps) {
  return (
    <button
      className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
      onClick={onClick}
    >
      Import Tasks
    </button>
  );
}
