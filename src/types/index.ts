import type { LiveList, LiveMap, LiveObject } from "@liveblocks/client";

export interface NavItem {
  id: string;
  label: string;
  path: string;
  isTerminal: boolean; // Custom flag for your 10x style indicators
  element: React.JSX.ElementType
}

export interface AmbientDot {
  col: number;
  row: number;
  color: string;
  twinkleSpeed: number;
  phase: number;
}

export type CanvasNode = {
  id: string;
  type: "card" | "action";
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  color: string;
};

export type CanvasActivity = {
  id: string;
  userId: string;
  type: "system_init" | "node_created" | "node_moved";
  message: string;
  timestamp: number;
};

export type RoomStorage = {
  nodes: LiveMap<string, LiveObject<CanvasNode>>;
  activities: LiveList<LiveObject<CanvasActivity>>;
};

export interface NewProjectPayload {
  name: string;
  userId: string;
}

export interface Project {
  id: string;
  name: string;
  created_by: string;
  created_at: string;
}

export interface ProjectState {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  fetchProjects: (userId: string) => Promise<void>;
  addProjectToStore: (newProject: Project) => void;
}

export interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ProjectDetails {
  id: string;
  name: string;
  created_by: string;
}

export interface ArtNode {
  id: string;
  x: number;
  y: number;
  color: string;
}

