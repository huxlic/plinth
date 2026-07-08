import type { NavItem } from "../types";
import Canvas from "../pages/Canvas";
import Metrics from "../pages/Metrics";
import Nodes from "../pages/Nodes";
import Overview from "../pages/Overview";

export const navigationManifest: NavItem[] = [
  {
    id: "overview",
    label: "Overview",
    path: "/",
    element: Overview,
  },
  {
    id: "nodes",
    label: "Nodes",
    path: "/dashboard",
    isTerminal: true,
    element: Nodes,
  },
  {
    id: "canvas",
    label: "Canvas",
    path: "/canvas/main-grid-alpha",
    element: Canvas,
  },
  {
    id: "metrics",
    label: "Metrics",
    path: "/canvas/metrics",
    element: Metrics,
  },
];
