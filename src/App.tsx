import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  LiveblocksProvider,
} from "@liveblocks/react/suspense";
import { AuthProvider } from "./hooks/AuthContext";
import AppRoutes from "./AppRoutes";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LiveblocksProvider
          publicApiKey={import.meta.env.VITE_LIVEBLOCKS_PUBLIC_KEY}
        >
          <div className="font-nunito selection:bg-secondary-hover bg-black text-primary">
            <AppRoutes />
          </div>
        </LiveblocksProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
