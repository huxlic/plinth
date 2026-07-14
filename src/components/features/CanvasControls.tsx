import { useHistory, useMutation } from "@liveblocks/react/suspense";
import { LiveList } from "@liveblocks/client";
import { Redo2, Trash2, Undo2 } from "lucide-react";
import type { ArtNode } from "../../types";

interface CanvasControlsProps {
  currentColor: string;
  setCurrentColor: (color: string) => void;
}

const COLORS = [
  "#EF4444",
  "#F97316",
  "#3B82F6",
  "#06B6D4",
  "#10B981",
  "#84CC16",
  "#F59E0B",
  "#FACC15",
  "#8B5CF6",
  "#EC4899",
  "#A855F7",
  "#111827",
  "#6B7280",
  "#FFFFFF",
];

export default function CanvasControls({
  currentColor,
  setCurrentColor,
}: CanvasControlsProps) {
  const history = useHistory();

  const clearCanvas = useMutation(({ storage }) => {
    const artNodes = storage.get("artNodes") as unknown as LiveList<ArtNode>;
    while (artNodes.length > 0) {
      artNodes.delete(0);
    }
  }, []);

  return (
    <div className="absolute inset-x-3 bottom-3 z-50 flex justify-center select-none sm:inset-x-6 sm:bottom-6">
      <div className="flex w-full max-w-2xl flex-wrap items-center justify-center gap-2 rounded-xl border border-border bg-[#111112]/95 px-3 py-2 shadow-2xl backdrop-blur sm:w-auto sm:flex-nowrap sm:justify-start sm:gap-3 sm:px-4">
        <div className="grid grid-cols-6 gap-1.5 rounded-lg border border-zinc-800 p-1.5 sm:flex sm:border-0 sm:p-0 sm:pr-3">
          {COLORS.map((color) => (
            <button
              key={color}
              title={color}
              aria-label={`Select ${color}`}
              onClick={() => setCurrentColor(color)}
              className={`h-8 w-8 rounded-lg transition-all duration-150 sm:h-7 sm:w-7 ${
                currentColor === color
                  ? "scale-110 ring-1 ring-white shadow-lg"
                  : "opacity-70 hover:scale-110 hover:opacity-100"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-border p-1 sm:border-y-0 sm:border-l sm:border-r sm:px-3 sm:py-0">
          <button
            onClick={() => history.undo()}
            className="grid h-9 w-9 place-items-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white sm:h-8 sm:w-8"
            title="Undo last change"
            aria-label="Undo last change"
          >
            <Undo2 size={17} />
          </button>
          <button
            onClick={() => history.redo()}
            className="grid h-9 w-9 place-items-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white sm:h-8 sm:w-8"
            title="Redo change"
            aria-label="Redo change"
          >
            <Redo2 size={17} />
          </button>
        </div>

        <button
          onClick={() => {
            if (
              window.confirm(
                "Are you sure you want to clear the canvas for everyone?",
              )
            ) {
              clearCanvas();
            }
          }}
          className="inline-flex h-9 min-w-0 items-center justify-center gap-1.5 rounded-lg border border-red-900/50 bg-red-950/50 px-3 text-[11px] font-semibold text-red-200 transition-colors hover:bg-red-900 sm:h-8"
        >
          <Trash2 size={14} />
          <span className="whitespace-nowrap">Clear Stage</span>
        </button>
      </div>
    </div>
  );
}
