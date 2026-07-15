import { useEffect, useMemo, useRef, useState } from "react";
import type { ArtNode } from "../../types";
import { useMutation, useStorage } from "@liveblocks/react/suspense";
import CanvasControls from "./CanvasControls";
import { ViewportControls } from "./ViewPortControls";
import getNodeKey from "../../lib/utils/getNodeKey";

const MultiplayerSurface = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const onControlRef = useRef(false);

  const [currentColor, setCurrentColor] = useState("#AAAAAA");

  const rawArtNodes = useStorage((root) => root.artNodes);
  const artNodes = useMemo(() => rawArtNodes ?? {}, [rawArtNodes]);

  const addArtNode = useMutation(({ storage }, newBlock: ArtNode) => {
    const artNodes = storage.get("artNodes");
    const key = getNodeKey(newBlock.x, newBlock.y);
    artNodes.set(key, newBlock);
  }, []);

  const removeArtNode = useMutation(
    ({ storage }, snappedX: number, snappedY: number) => {
      const list = storage.get("artNodes");
      const key = getNodeKey(snappedX, snappedY);
      list.delete(key);
    },
    [],
  );

  const [camera, setCamera] = useState({ x: 0, y: 0, zoom: 1 });
  const [isPanning, setIsPanning] = useState(false);

  const dragStart = useRef({ x: 0, y: 0 });
  const hasDragged = useRef(false);

  const gridGap = 10;
  const canvasSize = 1000;

  const panX = camera.x,
    panY = camera.y,
    zoom = camera.zoom;

  const handleWheel = (e: React.WheelEvent) => {
    if (onControlRef.current) return;
    setCamera((prev) => {
      const worldX = (e.clientX - prev.x) / prev.zoom,
        worldY = (e.clientY - prev.y) / prev.zoom;

      const nextZoom: number = Math.max(
        0.1,
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
    hasDragged.current = false;
    dragStart.current.x = e.clientX - camera.x;
    dragStart.current.y = e.clientY - camera.y;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPanning) return;
    hasDragged.current = true;
    setCamera((prev) => ({
      ...prev,
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    }));
  };

  const handlePointerUp = () => {
    setIsPanning(false);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (hasDragged.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();

    const localX = (e.clientX - rect.left) / zoom;
    const localY = (e.clientY - rect.top) / zoom;

    const snappedX = Math.floor(localX / gridGap) * gridGap;
    const snappedY = Math.floor(localY / gridGap) * gridGap;

    if (
      snappedX < 0 ||
      snappedX >= canvasSize ||
      snappedY < 0 ||
      snappedY >= canvasSize
    )
      return;

    const key = getNodeKey(snappedX, snappedY);
    const isOccupied = key in artNodes;

    if (isOccupied) {
      removeArtNode(snappedX, snappedY);
    } else {
      // Spawn a new block
      const newBlock: ArtNode = {
        id: crypto.randomUUID(),
        x: snappedX,
        y: snappedY,
        color: currentColor,
      };
      addArtNode(newBlock);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;

    canvas.width = canvasSize * dpr;
    canvas.height = canvasSize * dpr;
    canvas.style.width = `${canvasSize}px`;
    canvas.style.height = `${canvasSize}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(dpr, dpr);
    // Clear the canvas so old drawings are erased before redrawing
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // Draw the Grid Lines
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

    Object.values(artNodes).forEach((node) => {
      ctx.fillStyle = node.color;
      ctx.fillRect(node.x, node.y, gridGap, gridGap);
      ctx.strokeStyle = "rgba(0, 0, 0, 0.4)";
      ctx.lineWidth = 1;
      ctx.strokeRect(node.x, node.y, gridGap, gridGap);
    });
  }, [artNodes]);

  return (
    <>
      <div
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className={`w-full h-full relative overflow-hidden select-none touch-none ${
          isPanning ? "cursor-grabbing" : "cursor-default"
        }`}
      >
        <div
          className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] opacity-50 pointer-events-none transition-none"
          style={{
            backgroundPosition: `${panX}px ${panY}px`,
            backgroundSize: `${24 * zoom}px ${24 * zoom}px`,
          }}
        />

        <div
          className="absolute inset-0 origin-top-left pointer-events-auto"
          style={{
            transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
          }}
        >
          <canvas
            onClick={handleCanvasClick}
            ref={canvasRef}
            className="bg-[#111112] cursor-crosshair"
          />
        </div>

        <div
          onMouseOver={() => (onControlRef.current = true)}
          onMouseLeave={() => (onControlRef.current = false)}
          className="absolute inset-x-3 bottom-6 z-50 flex justify-start select-none w-max sm:w-auto sm:inset-x-6 sm:bottom-6 sm:justify-center cursor-default"
        >
          <CanvasControls
            currentColor={currentColor}
            setCurrentColor={setCurrentColor}
          />
        </div>
      </div>

      <ViewportControls camera={camera} setCamera={setCamera} />
    </>
  );
};

export default MultiplayerSurface;
