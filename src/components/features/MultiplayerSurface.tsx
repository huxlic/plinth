import { useEffect, useRef, useState } from "react";

const MultiplayerSurface = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [camera, setCamera] = useState({ x: 0, y: 0, zoom: 1 });
  const dragStart = useRef({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);

  const panX = camera.x,
    panY = camera.y,
    zoom = camera.zoom;

  const handleWheel = (e: React.WheelEvent) => {
    setCamera((prev) => {
      const worldX = (e.clientX - prev.x) / prev.zoom,
        worldY = (e.clientY - prev.y) / prev.zoom;

      const nextZoom: number = Math.max(
        0.2,
        Math.min(4.0, e.deltaY < 0 ? prev.zoom * 1.02 : prev.zoom / 1.02),
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth / dpr;
    canvas.height = window.innerHeight / dpr;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const gridGap = 10;

    ctx.strokeStyle = "#161618";
    ctx.lineWidth = 1;

    for (let x = 0; x <= canvas.width; x += gridGap) {
      ctx.beginPath();
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, canvas.height);
      ctx.stroke();
    }

    for (let y = 0; y <= canvas.height; y += gridGap) {
      ctx.beginPath();
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(canvas.width, y + 0.5);
      ctx.stroke();
    }
  }, []);

  return (
    <div
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="w-full h-full relative overflow-hidden select-none "
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] opacity-50 pointer-events-none"
        style={{
          backgroundPosition: `${panX}px ${panY}px`,
          backgroundSize: `${24 * zoom}px ${24 * zoom}px`,
        }}
      />

      <div
        className={`absolute inset-0 origin-top-left pointer-events-auto flex justify-center items-center ${
          isPanning ? "cursor-grabbing" : "cursor-default"
        }`}
        style={{
          transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
        }}
      >
        <canvas ref={canvasRef} className="bg-[#111112]" />
      </div>

      <div className="p-4 bg-amber-700 absolute bottom-0 left-0 right-0"></div>
    </div>
  );
};

export default MultiplayerSurface;
