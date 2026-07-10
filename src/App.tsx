import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClientSideSuspense, LiveblocksProvider, RoomProvider } from "@liveblocks/react/suspense";
import { AuthProvider } from "./hooks/AuthContext";
import AppRoutes from "./AppRoutes";
import { LiveObject } from "@liveblocks/client";

const queryClient = new QueryClient();


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LiveblocksProvider
          publicApiKey={import.meta.env.VITE_LIVEBLOCKS_PUBLIC_KEY}
        >
          <div className="font-nunito selection:bg-secondary-hover bg-black text-primary">
            <RoomProvider
              id="canvas-1"
              initialPresence={{ cursor: null }}
              initialStorage={{
                input: new LiveObject({ text: "" }),
              }}
            >
              <ClientSideSuspense
                fallback={
                  <div className="h-screen bg-grid-faded bg-black flex justify-center items-center text-white font-mono text-xs tracking-widest animate-pulse">
                    ESTABLISHING_WEBSOCKET_MESH...
                  </div>
                }
              >
                <AppRoutes />
              </ClientSideSuspense>
            </RoomProvider>
          </div>
        </LiveblocksProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
