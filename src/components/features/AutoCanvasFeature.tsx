import { useEffect, useRef } from "react";
import type { AmbientDot } from "../../types";

const PLINTH_BITMAP = [
  "111111111000111100000001111111110001111000001111001111111111001111000001111",
  "111111111100111100000001111111110001111100001111001111111111001111000001111",
  "111100011100111100000000011110000001111110001111000001111000001111000001111",
  "111111111100111100000000011110000001111111001111000001111000001111111111111",
  "111111111000111100000000011110000001111011101111000001111000001111111111111",
  "111100000000111100000000011110000001111001111111000001111000001111000001111",
  "111100000000111100000000011110000001111000111111000001111000001111000001111",
  "111100000000111111111001111111110001111000011111000001111000001111000001111",
  "111100000000111111111001111111110001111000001111000001111000001111000001111",
];
const DATA_COLORS = [
  "#28C840",
  "#64ffda",
  "#FEBC2E", 
  "#FF5F57", 
  "#4D4D4D",
];

const AutoCanvasFeature = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let animationFrameId: number;
    const gridGap = 10;
    const startGridCol = 12;
    const startGridRow = 15;

    const targetPixels: { row: number; col: number }[] = [];

    PLINTH_BITMAP.forEach((rowString, rowIndex) => {
      for (let colIndex = 0; colIndex < rowString.length; colIndex++) {
        if (rowString[colIndex] === "1") {
          targetPixels.push({ row: rowIndex, col: colIndex });
        }
      }
    });

    const shuffleArray = (array: typeof targetPixels) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    let shuffledPixels = shuffleArray(targetPixels);
    let revealProgress = 0;
    const logoSpeed = 0.8;

    // 1. AMBIENT DATA POOL STORAGE
    let ambientDots: AmbientDot[] = [];

    // Helper to generate random nodes across the entire canvas board grid
    const generateAmbientDots = (width: number, height: number) => {
      const maxCols = Math.floor(width / gridGap);
      const maxRows = Math.floor(height / gridGap);
      const dotsList: AmbientDot[] = [];

      // Density controller: 1 dot per 15 grid boxes
      const totalDotsCount = Math.floor((maxCols * maxRows) / 5);

      for (let i = 0; i < totalDotsCount; i++) {
        const col = Math.floor(Math.random() * maxCols);
        const row = Math.floor(Math.random() * maxRows);

        // Avoid spawning background noise directly on top of the "PLINTH" layout zone
        const isInsideLogoX =
          col >= startGridCol && col < startGridCol + PLINTH_BITMAP[0].length;
        const isInsideLogoY =
          row >= startGridRow && row < startGridRow + PLINTH_BITMAP.length;

        if (isInsideLogoX && isInsideLogoY) {
          // If it lands on the text area, skip this iteration to keep text readable
          continue;
        }

        dotsList.push({
          col,
          row,
          color: DATA_COLORS[Math.floor(Math.random() * DATA_COLORS.length)],
          twinkleSpeed: 0.02 + Math.random() * 0.04, // Varied pulsation speeds
          phase: Math.random() * Math.PI * 2, // Random starting wave offset
        });
      }
      return dotsList;
    };

    const drawGrid = () => {
      ctx.strokeStyle = "#161618";
      ctx.lineWidth = 1;

      for (let x = 0; x < canvas.width; x += gridGap) {
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
    };

    // 2. RUNTIME RENDER ENGINE
    const renderLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid();

      // --- PHASE A: RENDER THE AMBIENT BACKDROP NODES ---
      ambientDots.forEach((dot) => {
        dot.phase += dot.twinkleSpeed;

        const opacity = 0.1 + Math.abs(Math.sin(dot.phase)) * 0.6;

        ctx.save(); // Save canvas context state
        ctx.globalAlpha = opacity;
        ctx.fillStyle = dot.color;

        ctx.fillRect(
          dot.col * gridGap + 1,
          dot.row * gridGap + 1,
          gridGap - 1,
          gridGap - 1,
        );
        ctx.restore(); // Restore context opacity back to solid 1.0
      });

      // --- PHASE B: RENDER THE CORE PLINTH LOGO REVEAL ---
      if (revealProgress < shuffledPixels.length) {
        revealProgress += logoSpeed;
      }

      ctx.fillStyle = "#FFFFFF";
      const dotsToDraw = Math.floor(revealProgress);
      for (let i = 0; i < dotsToDraw; i++) {
        const pixel = shuffledPixels[i];
        const drawX = (startGridCol + pixel.col) * gridGap;
        const drawY = (startGridRow + pixel.row) * gridGap;

        ctx.fillRect(drawX + 1, drawY + 1, gridGap - 2, gridGap - 2);
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    const handleResize = (width: number, height: number) => {
      cancelAnimationFrame(animationFrameId);
      canvas.width = width;
      canvas.height = height;

      revealProgress = 0;
      shuffledPixels = shuffleArray(targetPixels);
      ambientDots = generateAmbientDots(canvas.width, canvas.height);

      renderLoop();
    };

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const inlineSize =
          entry.contentBoxSize && entry.contentBoxSize[0]
            ? entry.contentBoxSize[0].inlineSize
            : entry.contentRect.width;

        const canvasWidth = Math.max(900, inlineSize);
        const targetHeight = 400;

        handleResize(canvasWidth, targetHeight);
      }
    });

    resizeObserver.observe(parent);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  return (
    <div className="showcase-scrollbar w-full overflow-x-scroll">
      <canvas ref={canvasRef} className="block max-w-none" />
    </div>
  );
};

export default AutoCanvasFeature;
