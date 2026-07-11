import { create } from "zustand";
import { supabase } from "../lib/utils/supabaseClient";
import type { Project, ProjectState } from "../types";



export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  isLoading: false,
  error: null,

  fetchProjects: async (userId: string) => {
    if (get().isLoading) return;

    set({ isLoading: true, error: null });

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("created_by", userId)
      .order("created_at", { ascending: false });

    if (error) {
      set({ error: error.message, isLoading: false });
    } else {
      set({ projects: data || [], isLoading: false });
    }
  },

  // ── 3. SYNCHRONOUS STORE APPEND ACTION ─────────────────────────────────
  // Instead of re-fetching everything from the cloud after creating a node,
  // we instantly push the new project record straight into our local state array.
  addProjectToStore: (newProject: Project) => {
    set((state) => ({
      projects: [newProject, ...state.projects],
    }));
  },
}));
