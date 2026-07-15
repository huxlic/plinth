import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { supabase } from "../lib/utils/supabaseClient";
import type { ArtNode, ProjectDetails } from "../types";
import MultiplayerSurface from "../components/features/MultiplayerSurface";
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import { LiveMap } from "@liveblocks/client";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/AuthContext";

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
  const { user } = useAuth();
  const navigate = useNavigate();

  const { id: roomId } = useParams<{ id: string }>();
  const [onlineCount, setOnlineCount] = useState(1);

  const query = useQuery({
    queryKey: ["project", roomId],
    queryFn: () => fetchProjectDetails(roomId!),
    enabled: !!roomId, // Guard: Only run if roomId exists
  });

  useEffect(() => {
    if (!user?.id) return;

    // Create a generic "lobby" presence channel
    const channel = supabase.channel("online-users-lobby", {
      config: {
        presence: { key: user.id },
      },
    });

    channel
      .on("presence", { event: "sync" }, () => {
        const presenceState = channel.presenceState();
        // Count the unique active connections in the lobby
        setOnlineCount(Object.keys(presenceState).length);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          // Track that this current user is online
          await channel.track({ online_at: new Date().toISOString() });
        }
      });

    return () => {
      // Clean up the websocket channel when the dashboard unmounts
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  return (
    <RoomProvider
      id={`project-lobby-v1-${roomId}-test-1`}
      initialStorage={{
        artNodes: new LiveMap<string, ArtNode>(),
      }}
    >
      <div className="min-h-screen grid grid-cols-1 grid-rows-[auto_1fr] ">
        <section className="bg-[#0A0A0B] bg-grid-faded border-b border-border">
          <div className="font-jetbrains-mono py-2 px-3 border-b border-border flex justify-between items-center">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-[11px] flex items-center gap-1 hover:text-[#2997FF] transition-colors"
            >
              <ArrowLeft size={13} /> Node Hub
            </button>

            <div
              className="flex h-7 items-center px-2.5 w-32 sm:w-max rounded-lg backdrop-blur-sm select-none font-jetbrains-mono"
              title={query.data?.name}
            >
              {query.isLoading ? (
                <div className="h-3 w-16 animate-pulse rounded bg-zinc-800" />
              ) : (
                <p className="truncate text-[11px] font-medium text-zinc-400">
                  {query.data?.name || "Untitled Canvas"}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-[#30D158]"></div>
              <p className="text-[10px]">
                {onlineCount} {onlineCount <= 1 ? "person" : "people"} online
              </p>
            </div>
          </div>
        </section>

        {/* Main: Fills the remaining space perfectly */}
        <main className="w-full h-full overflow-hidden">
          <ClientSideSuspense
            fallback={
              <div className="flex h-screen items-center justify-center text- bg-[#111112] bg-grid-faded font-jetbrains-mono">
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
