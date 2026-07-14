import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { supabase } from "../lib/utils/supabaseClient";
import type { ProjectDetails } from "../types";
import MultiplayerSurface from "../components/features/MultiplayerSurface";
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react";
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

const Canvas = () => {
  const navigate = useNavigate();

  const { id: roomId } = useParams<{ id: string }>();

  const query = useQuery({
    queryKey: ["project", roomId],
    queryFn: () => fetchProjectDetails(roomId!),
    enabled: !!roomId, // Guard: Only run if roomId exists
  });

  return (
    <RoomProvider
      id={`project-room-${roomId}`}
      initialStorage={{
        artNodes: new LiveList([]),
      }}
    >
      <div className="min-h-screen grid grid-cols-[300px_1fr] grid-rows-1 ">
        <aside className="bg-black border border-border">
          <div className="font-jetbrains-mono p-2 border-b border-border flex justify-between items-center">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-[11px] flex items-center gap-1 hover:text-[#2997FF] transition-colors"
            >
              {" "}
              <ArrowLeft size={13} /> Node Hub
            </button>

            {query.isLoading ? (
              <div className="bg-[#111112] flex py-2 px-8 animate-pulse rounded-lg"></div>
            ) : (
              <p className="text-[11px] text-tertiary uppercase">
                {query.data?.name}
              </p>
            )}
          </div>
        </aside>
        <main className="">
          <ClientSideSuspense
            fallback={
              <div className="flex h-screen items-center justify-center text-white bg-black">
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

export default Canvas;
