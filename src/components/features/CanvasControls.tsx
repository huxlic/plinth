import { useHistory, useMutation } from "@liveblocks/react/suspense";
import { LiveList } from "@liveblocks/client";
import { Redo2, Trash2, Undo2 } from "lucide-react";
import type { ArtNode } from "../../types";
import { COLORS } from "../../shared/constants";

interface CanvasControlsProps {
  currentColor: string;
  setCurrentColor: (color: string) => void;
}

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
    <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-[#111112]/95 p-2 shadow-2xl backdrop-blur sm:w-auto sm:max-w-2xl sm:flex-row sm:items-center sm:gap-3 sm:px-4 sm:py-2">
      {/* Color strip: vertical scroll + bottom fade on mobile, horizontal on sm+ */}
      <div className="relative h-56 w-10 sm:h-auto sm:w-auto sm:min-w-0 sm:flex-1">
        <div className="flex h-full flex-col gap-1.5 overflow-y-auto p-1  pb-6 sm:h-auto sm:flex-row sm:overflow-x-auto sm:overflow-y-visible sm:p-1 sm:pr-6 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden">
          {COLORS.map((color, i) => (
            <button
              key={i}
              title={color}
              aria-label={`Select ${color}`}
              onClick={() => setCurrentColor(color)}
              className={`h-8 w-8 shrink-0 rounded-lg transition-all duration-150 ${
                currentColor === color
                  ? "scale-110 ring-1 ring-white shadow-lg"
                  : "opacity-70 hover:scale-110 hover:opacity-100"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        {/* Fade: bottom edge on mobile, right edge on sm+ */}
        <div className="pointer-events-none absolute inset-x-0 -bottom-1 h-8 bg-linear-to-t from-[#111112] to-transparent sm:inset-x-auto sm:inset-y-0 sm:right-0 sm:h-auto sm:w-8 sm:bg-linear-to-l" />
      </div>

      {/* Undo/redo + Clear: column on mobile, row on sm+ */}
      <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
        <div className="flex shrink-0 flex-col items-center gap-1 rounded-xl border border-border p-1 sm:flex-row ">
          <button
            onClick={() => history.undo()}
            className="grid h-8 w-8 place-items-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
            title="Undo last change"
            aria-label="Undo last change"
          >
            <Undo2 size={17} />
          </button>

          <button
            onClick={() => history.redo()}
            className="grid h-8 w-8 place-items-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
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
          className="inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-red-900/50 bg-red-950/50 px-3 text-[11px] font-semibold text-red-200 transition-colors hover:bg-red-900"
        >
          <Trash2 size={14} />
          <span className="hidden whitespace-nowrap sm:inline">
            Clear Stage
          </span>
        </button>
      </div>
    </div>
  );
}
