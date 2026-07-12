import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/AuthContext";
import { useState } from "react";
import { projectService } from "../../services/projectService";
import { useProjectStore } from "../../lib/store/useProjectStore";
import type { CreateProjectModalProps } from "../../types";

export const CreateProjectModal = ({
  isOpen,
  onClose,
}: CreateProjectModalProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const addProjectToStore = useProjectStore((state) => state.addProjectToStore);

  const [projectName, setProjectName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!projectName.trim() || !user) return;

    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      const newProject = await projectService.createProject({
        name: projectName,
        userId: user.id,
      });

      // Update global store instantly so the dashboard list matches without reloading
      addProjectToStore(newProject);

      setProjectName("");
      onClose();

      navigate(`/canvas/${newProject.id}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);

      setErrorMessage(err?.message || "An unexpected database error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md border border-border bg-[#111112] p-8 rounded-2xl shadow-2xl text-xs">
        <h2 className="text-sm font-bold text-white mb-2 tracking-wide uppercase">
          Create New Project Workspace
        </h2>
        <p className="text-tertiary mb-6 leading-relaxed">
          This initializes a unique collaborative sandbox room in the cloud.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white font-bold mb-2 uppercase tracking-widest text-[10px] font-jetbrains-mono">
              Project Name
            </label>
            <input
              type="text"
              required
              disabled={isSubmitting}
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g., Q3 System Flowchart"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white outline-none focus:border-blue-500 disabled:opacity-50 transition"
            />
          </div>

          {errorMessage && (
            <div className="bg-red-950/40 border border-red-900/50 p-3 rounded-lg text-red-400">
              ⚠️ {errorMessage}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2 font-jetbrains-mono">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={onClose}
              className="px-4 py-2 bg-zinc-900 text-zinc-400 border border-zinc-800 rounded-xl hover:bg-zinc-800 hover:text-white transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !projectName.trim()}
              className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-500 font-bold tracking-wide transition disabled:opacity-40"
            >
              {isSubmitting ? "CREATING_ROOM..." : "LAUNCH_WORKSPACE"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
