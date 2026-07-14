export const COLORS = [
  // Grayscale: black -> white
  "#000000",
  "#3C3C3C",
  "#787878",
  "#AAAAAA",
  "#D2D2D2",
  "#FFFFFF",

  // Browns / skin tones
  "#6D482F",
  "#9C6926",
  "#FFB470",
  "#FFD6B0",

  // Red
  "#FF0000",
  "#BE0039",
  "#FF4500",
  "#FF99AA",

  // Orange
  "#FF8000",
  "#FF8C00",
  "#FFB000",

  // Yellow
  "#FFFF00",
  "#FFD635",
  "#FFF8B8",

  // Green
  "#00FF00",
  "#00A368",
  "#00CC78",
  "#7EED56",
  "#B0FFB4",

  // Teal / Cyan
  "#00FFFF",
  "#00756F",
  "#009EAA",
  "#00CCC0",
  "#94FFF0",

  // Blue
  "#0000FF",
  "#2450A4",
  "#3690EA",
  "#51E9F4",
  "#A0C1FF",

  // Indigo / Purple
  "#8000FF",
  "#493AC1",
  "#6A5CFF",
  "#811E9F",
  "#B44AC0",
  "#E4ABFF",

  // Pink / Magenta
  "#FF00FF",
  "#DE107F",
  "#FF3881",
  "#FF99AA",
];

export const features: { rate: string; title: string }[] = [
  {
    rate: "0.42ms",
    title: "Local input response",
  },
  {
    rate: "Infinite",
    title: "Canvas viewport",
  },
  {
    rate: "1,000+",
    title: "Active edge nodes",
  },
  {
    rate: "99.998%",
    title: "Global uptime",
  },
];

export const architecture: { heading: string; title: string; desc: string }[] =
  [
    {
      heading: "TRANSPORT",
      title: "WebSocket Relay", // Or "WebSocket Gateway" / "Binary Pub/Sub"
      desc: "Persistent duplex channels with binary framing. Each pixel mutation is a 12-byte payload.",
    },
    {
      heading: "CONSISTENCY",
      title: "CRDT State",
      desc: "Conflict-free replicated grids. No merge conflicts, no lost writes, at any scale.",
    },
    {
      heading: "RUNTIME",
      title: "GPU Canvas Engine", // Or "Hardware Acceleration" / "Client Runtime"
      desc: "GPU-accelerated local rendering with dirty-rect batching. Smooth 240Hz on modern displays.",
    },
  ];
