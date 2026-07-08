import { Route, Routes } from "react-router";
import { navigationManifest } from "./config/navigation";

const App = () => {
  return (
    <div className="font-nunito selection:bg-secondary-hover bg-black text-primary">
      <Routes>
        {navigationManifest.map(({ id, element: Element, path }) => (
          <Route key={id} path={path} element={<Element />} />
        ))}
      </Routes>
    </div>
  );
};

export default App;
