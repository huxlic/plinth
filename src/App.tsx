
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./hooks/AuthContext";
import AppRoutes from "./AppRoutes";

const queryClient = new QueryClient();
const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="font-nunito selection:bg-secondary-hover bg-black text-primary">
         <AppRoutes/>
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
