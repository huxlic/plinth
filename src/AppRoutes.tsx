import { Navigate, Route, Routes } from "react-router";
import { navigationManifest } from "./config/navigation";
import LoginForm from "./auth/LoginForm";
import SignUpForm from "./auth/SignUpForm";
import { useAuth } from "./hooks/AuthContext";
import Four0Four from "./pages/Four0Four";
import Profile from "./pages/Profile";

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen bg-black flex justify-center items-center text-white font-mono text-xs">
        SYNCHRONIZING_NODE...
      </div>
    );
  }

  return (
    <Routes>
      {navigationManifest.map(({ id, element: Element, path, isTerminal }) =>
        isTerminal ? (
          <Route
            key={id}
            path={path}
            element={user ? <Element /> : <Navigate to="/signin" replace />}
          />
        ) : (
          <Route key={id} path={path} element={<Element />} />
        ),
      )}

      <Route
        path="/profile"
        element={user ? <Profile/> : <LoginForm />}
      />
      <Route
        path="/signin"
        element={user ? <Navigate to="/dashboard" replace /> : <LoginForm />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/dashboard" replace /> : <SignUpForm />}
      />
      <Route path="*" element={<Four0Four/>} />
    </Routes>
  );
};

export default AppRoutes
