import { useOthers } from "@liveblocks/react";
import Navbar from "../components/ui/Navbar";
import Telemetry from "../components/Telemetry";

const Nodes = () => {
  const others = useOthers();

  const activities: { total: string | number; type: string }[] = [
    { total: others.length + 1, type: "users online" },
    { total: others.length + 1, type: "Active nodes" },
  ];

  return (
    <div className="relative min-h-screen px-8 bg-grid-faded">
      <Navbar />

      <section className="pt-24 flex flex-col gap-8">
        <div className="flex justify-between items-center">
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

          <main className="bg-[#111112] box-border">
            <div
              className="text-tertiary text-[10px] font-jetbrains-mono uppercase"
            >
              <p className="">Active Grids · 5</p>
              <p className="">Sorted by load ↓</p>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default Nodes;
