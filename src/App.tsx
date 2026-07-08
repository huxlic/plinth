import { Route, Routes } from "react-router";
import { navigationManifest } from "./config/navigation";
import LoginForm from "./auth/LoginForm";
import SignUpForm from "./auth/SignUpForm";

const App = () => {
  return (
    <div className="font-nunito selection:bg-secondary-hover bg-black text-primary">
      <Routes>
        {navigationManifest.map(({ id, element: Element, path }) => (
          <Route key={id} path={path} element={<Element />} />
        ))}

        <Route path="/signin" element={<LoginForm/>} />
        <Route path="/register" element={<SignUpForm/>} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </div>
  );
};

export default App;
