import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { supabase } from "../lib/utils/supabaseClient";
import type { ProjectDetails } from "../types";
import MultiplayerSurface from "../components/features/MultiplayerSurface";
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import { LiveList } from "@liveblocks/client";

const fetchProjectDetails = async (roomId: string) => {
  const { data, error } = await supabase
    .from("projects")
    .select("id, name, created_by")
    .eq("id", roomId)
    .single();

  if (error) throw new Error(error.message);
  return data as ProjectDetails;
};

const PlayGround = () => {
  const navigate = useNavigate();

  const { id: roomId } = useParams<{ id: string }>();

  const query = useQuery({
    queryKey: ["project", roomId],
    queryFn: () => fetchProjectDetails(roomId!),
    enabled: !!roomId, // Guard: Only run if roomId exists
  });

  return (
    <RoomProvider
      id={`project-room-v1-${roomId}-test-1`}
      initialStorage={{
        artNodes: new LiveList([]),
      }}
    >
      <div className="min-h-screen grid grid-cols-1 grid-rows-[auto_1fr] ">
        
        {/* Aside: Top bar on mobile, left sidebar on desktop */}
        <aside className="bg-black border-b md:border-b-0 md:border-r border-border">
          <div className="font-jetbrains-mono p-2 border-b border-border flex justify-between items-center">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-[11px] flex items-center gap-1 hover:text-[#2997FF] transition-colors"
            >
              <ArrowLeft size={13} /> Node Hub
            </button>

            {query.isLoading ? (
              <div className="bg-[#111112] flex py-2 px-8 animate-pulse rounded-lg"></div>
            ) : (
              <p className="text-[11px] text-tertiary">
                {query.data?.name}
              </p>
            )}

            <p className="text-[11px]">2 peers online</p>
          </div>
        </aside>

        {/* Main: Fills the remaining space perfectly */}
        <main className="w-full h-full overflow-hidden">
          <ClientSideSuspense
            fallback={
              <div className="flex h-screen items-center justify-center text- bg-[#111112] bg-grid-faded">
                Loading canvas...
              </div>
            }
          >
            <MultiplayerSurface />
          </ClientSideSuspense>
        </main>
      </div>
    </RoomProvider>
  );
};

export default PlayGround;
