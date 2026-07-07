import type { NavItem } from "../types";

export const navigationManifest: NavItem[] = [
  {
    id: "overview",
    label: "Overview",
    path: "/",
    // icon: LayoutDashboard,
  },
  {
    id: "nodes",
    label: "Nodes",
    path: "/dashboard",
    // icon: LayoutDashboard,
    isTerminal: true,
  },
  {
    id: "canvas",
    label: "Canvas",
    path: "/canvas/main-grid-alpha",
    // icon: Canvas,
  },
  {
    id: "metrics",
    label: "Metrics",
    path: "/canvas/main-grid-alpha/metrics",
    // icon: BarChart3,
  },
];
