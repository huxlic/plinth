import { useHistory, useMutation } from "@liveblocks/react";
import { LiveList } from "@liveblocks/client";
import type { ArtNode } from "../../types";

interface CanvasControlsProps {
  currentColor: string;
  setCurrentColor: (color: string) => void;
}

const COLORS = [
  "#EF4444", 
  "#3B82F6", 
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
  "#FFFFFF",
];

export default function CanvasControls({
  currentColor,
  setCurrentColor,
}: CanvasControlsProps) {

  const history = useHistory();

  // Mutation to cleanly wipe the list without rewriting the state key
  const clearCanvas = useMutation(({ storage }) => {
    const artNodes = storage.get("artNodes") as unknown as LiveList<ArtNode>;
    while (artNodes.length > 0) {
      artNodes.delete(0);
    }
  }, []);

  return (
    <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4 bg-[#111112] backdrop-blur border border-border px-4 py-2 rounded-xl shadow-2xl z-50 select-none">
      <div className="flex items-center gap-2 border-r border-zinc-800 pr-4">
        {COLORS.map((color) => (
          <button
            key={color}
            title={color}
            onClick={() => setCurrentColor(color)}
            className={`w-7 h-7 rounded-lg transition-all duration-150 ${
              currentColor === color
                ? "scale-110 ring-1 ring-white shadow-lg"
                : "hover:scale-110 opacity-70 hover:opacity-100"
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      {/* Multiplayer Undo / Redo */}
      <div className="flex items-center gap-1 border-r border-zinc-800 pr-4">
        <button
          onClick={() => history.undo()}
          className="px-2.5 py-1.5 hover:bg-zinc-800 rounded-lg text-sm text-zinc-400 hover:text-white transition-colors"
          title="Undo last change"
        >
          ↩ Undo
        </button>
        <button
          onClick={() => history.redo()}
          className="px-2.5 py-1.5 hover:bg-zinc-800 rounded-lg text-sm text-zinc-400 hover:text-white transition-colors"
          title="Redo change"
        >
          ↪ Redo
        </button>
      </div>

      {/* Canvas Utility actions */}
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
        className="px-3 py-1.5 text-[11px] font-semibold bg-red-950/50 hover:bg-red-900 text-red-200 border border-red-900/50 rounded-lg transition-colors"
      >
        Clear Stage
      </button>
    </div>
  );
}
