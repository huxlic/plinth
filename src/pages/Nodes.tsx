import { useOthers } from "@liveblocks/react";
import Navbar from "../components/ui/Navbar";
import Telemetry from "../components/Telemetry";
import { useEffect, useState } from "react";
import { CreateProjectModal } from "../components/ui/CreateProjectModal";
import { useProjectStore } from "../store/useProjectStore";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate } from "react-router";

const Nodes = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fetchProjects = useProjectStore((state) => state.fetchProjects);
  const { projects, isLoading, error } = useProjectStore((state) => state);

  const navigate = useNavigate();

  // 2. THE TRIGGER: Automatically fetch projects from Supabase the moment the page loads
  useEffect(() => {
    if (user?.id) {
      fetchProjects(user.id);
    }
  }, [user?.id, fetchProjects]);

  const others = useOthers();

  const activities: { total: string | number; type: string }[] = [
    { total: others.length + 1, type: "users online" },
    { total: projects.length, type: "nodes" },
  ];

  return (
    <div className="relative min-h-screen px-8 bg-grid-faded">
      <Navbar />
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <section className="pt-24 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <div className="flex flex-col gap-2">
            <h2 className="uppercase text-tertiary text-[10px] font-jetbrains-mono">
              Node Hub
            </h2>
            <p className="text-4xl font-bold">Select a canvas.</p>
          </div>

          <div className="font-jetbrains-mono flex gap-4">
            {activities.map((activity, index) => (
              <div key={index}>
                <p className="text-[20px]">{activity.total}</p>
                <span className="uppercase text-tertiary text-[10px]">
                  {activity.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-[380px_1fr] gap-6">
          <Telemetry
            GLOBAL_NODES={others.length + 1}
            USERS_ONLINE={others.length + 1}
          />

          <main className="box-border flex flex-col gap-6">
            <div className="text-tertiary text-[10px] font-jetbrains-mono uppercase flex items-center justify-between">
              <p className="">Your Collaborative Sandboxes</p>

              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold px-4 py-2 rounded-2xl transition"
              >
                + NEW_PROJECT
              </button>
            </div>

            <section className="">
              {isLoading && (
                <div className="text-tertiary text-[10px] font-jetbrains-mono animate-pulse py-8 flex justify-center items-center">
                  <p>CONTACTING_DATABASE_CLUSTER...</p>
                </div>
              )}

              {error && (
                <div className="text-red-400 border border-red-900 bg-red-950/20 p-4 rounded-lg my-4">
                  ⚠️ Network Failure: {error}
                </div>
              )}

              {!isLoading && projects.length === 0 && (
                <div className="border-2 border-border border-dotted p-12 text-center rounded-2xl text-tertiary text-[13px]">
                  No active project nodes found. Click "NEW_PROJECT" to
                  initialize a room.
                </div>
              )}

              {!isLoading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => navigate(`/canvas/${project.id}`)}
                      className="group cursor-pointer border border-zinc-800 bg-zinc-950 p-5 rounded-xl hover:border-zinc-700 transition shadow-lg flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <span className="text-zinc-600 font-mono text-[9px] uppercase tracking-wider">
                            {project.id.slice(0, 12)}...
                          </span>
                          <span className="w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-emerald-500 transition" />
                        </div>
                        <h3 className="text-sm font-bold text-zinc-200 group-hover:text-white mb-2 truncate">
                          {project.name}
                        </h3>
                      </div>
                      <p className="text-[10px] text-zinc-500 mt-4">
                        Created:{" "}
                        {new Date(project.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </main>
        </div>
      </section>
    </div>
  );
};

export default Nodes;
