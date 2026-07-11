import { supabase } from "../lib/utils/supabaseClient";
import type { NewProjectPayload } from "../types";

export const projectService = {
  createProject: async ({ name, userId }: NewProjectPayload) => {
    const projectId = `proj_${crypto.randomUUID().replace(/-/g, "")}`;

    const { data, error } = await supabase
      .from("projects")
      .insert([
        {
          id: projectId,
          name: name,
          created_by: userId,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase engine execution rejected:", error.message);
      throw error;
    }

    return data;
  },
};
