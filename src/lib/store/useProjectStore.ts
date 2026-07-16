import { create } from "zustand";
import { supabase } from "../utils/supabaseClient";
import type { Project, ProjectState } from "../../types";

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  isLoading: false,
  error: null,

  fetchProjects: async (userId: string) => {
    if (get().isLoading) return;

    set({ isLoading: true, error: null });

    const { data, error } = await supabase
      .from("project_members")
      .select("projects(*)")
      .eq("user_id", userId)
      .order("joined_at", { ascending: false });

    if (error) {
      set({ error: error.message, isLoading: false });
    } else {
       const projects = (data ?? [])
         .map((row) => row.projects)
         .flat() as unknown as Project[];
       set({ projects, isLoading: false });
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
