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
    isTerminal: false,
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
    isTerminal: true,
    element: Canvas,
  },
  {
    id: "metrics",
    label: "Metrics",
    path: "/canvas/metrics",
    isTerminal: true,
    element: Metrics,
  },
];
