import type { NavItem } from "../types";
import PlayGround from "../pages/PlayGround";
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
    path: "/canvas/:id",
    isTerminal: true,
    element: PlayGround,
  },
  {
    id: "metrics",
    label: "Metrics",
    path: "/metrics",
    isTerminal: true,
    element: Metrics,
  },
];
