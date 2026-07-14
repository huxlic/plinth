import React from "react";
import { Plus, Minus, Target } from "lucide-react";
import type { ViewportControlsProps } from "../../types";

export const ViewportControls: React.FC<ViewportControlsProps> = ({
  camera,
  setCamera,
}) => {
  const MIN_ZOOM = 0.1; // 10%
  const MAX_ZOOM = 4.0; // 400%

  const handleZoomIn = () => {
    setCamera((prev) => ({
      ...prev,
      zoom: Math.min(prev.zoom + 0.1, MAX_ZOOM),
    }));
  };

  const handleZoomOut = () => {
    setCamera((prev) => ({
      ...prev,
      zoom: Math.max(prev.zoom - 0.1, MIN_ZOOM),
    }));
  };

  const handleReCenter = () => {
    // Completely resets the entire camera viewport object in one shot
    setCamera({ x: 0, y: 0, zoom: 1.0 });
  };

  const zoomPercentage = Math.round(camera.zoom * 100);;

  return (
    <div className="absolute right-3 top-10 z-50 flex items-center gap-1.5 rounded-2xl border border-border bg-[#111112]/95 p-1 shadow-2xl backdrop-blur select-none sm:right-6">
      {/* 1. Re-center Button */}
      <button
        onClick={handleReCenter}
        title="Re-center view"
        aria-label="Re-center viewport camera"
        className="grid h-8 w-8 place-items-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
      >
        <Target size={15} />
      </button>

      {/* Vertical Separator */}
      <div className="h-4 w-px bg-zinc-800" />

      {/* 2. Zoom Tracking Container */}
      <div className="flex items-center gap-0.5">
        {/* Zoom Out */}
        <button
          onClick={handleZoomOut}
          disabled={camera.zoom <= MIN_ZOOM}
          title="Zoom out"
          className="grid h-8 w-8 place-items-center rounded-lg text-tertiary transition-colors hover:bg-zinc-850 hover:text-white disabled:pointer-events-none disabled:opacity-30"
        >
          <Minus size={15} />
        </button>

        {/* Numeric Zoom Indicator */}
        <span className="font-jetbrains-mono w-12 text-center text-[11px] font-medium text-zinc-300">
          {zoomPercentage}%
        </span>

        {/* Zoom In */}
        <button
          onClick={handleZoomIn}
          disabled={camera.zoom >= MAX_ZOOM}
          title="Zoom in"
          className="grid h-8 w-8 place-items-center rounded-lg text-tertiary transition-colors hover:bg-zinc-855 hover:text-white disabled:pointer-events-none disabled:opacity-30"
        >
          <Plus size={15} />
        </button>
      </div>
    </div>
  );
};
