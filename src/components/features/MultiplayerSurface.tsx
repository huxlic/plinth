import { useRef, useState } from "react";

const MultiplayerSurface = () => {
  const [camera, setCamera] = useState({ x: 0, y: 0, zoom: 1 });
  const dragStart = useRef({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panX = camera.x,
    panY = camera.y,
    zoom = camera.zoom;

  const handleWheel = (e: React.WheelEvent) => {
    setCamera((prev) => {
      const worldX = (e.clientX - prev.x) / prev.zoom;
      const worldY = (e.clientY - prev.y) / prev.zoom;

      const nextZoom: number = Math.max(
        0.5,
        Math.min(4.0, e.deltaY < 0 ? prev.zoom * 1.05 : prev.zoom / 1.05),
      );
      const nextX = e.clientX - worldX * nextZoom,
        nextY = e.clientY - worldY * nextZoom;

      return { x: nextX, y: nextY, zoom: nextZoom };
    });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    setIsPanning(true);
    dragStart.current.x = e.clientX - camera.x;
    dragStart.current.y = e.clientY - camera.y;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPanning) return;
    setCamera((prev) => ({
      ...prev,
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    }));
  };

  const handlePointerUp = () => {
    setIsPanning(false);
  };

  return (
    <div
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="w-full h-full relative overflow-hidden select-none"
    >
      {/* INNER CANVAS SURFACE (THE WORLD ORIGIN) */}
      <div
        className={`absolute inset-0 origin-top-left pointer-events-auto ${isPanning ? "cursor-grabbing" : "cursor-default"}`}
        style={{
          transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
        }}
      >
        {/* INFINITE BLUEPRINT GRID LAYER */}
        <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] bg-size-[24px_24px] opacity-50 pointer-events-none" />
      </div>
    </div>
  );
};

export default MultiplayerSurface;
