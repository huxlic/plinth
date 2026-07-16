import { Construction } from "lucide-react";
import { Link } from "react-router";

const Metrics = () => {
  return (
    <section className="min-h-screen bg-black bg-grid-faded flex flex-col justify-center items-center font-jetbrains-mono">
      <div className="flex items-center gap-2">
        <Construction size={30} /> Under construction...
      </div>

      <Link
        to="/"
        className="mt-8 text-[13px] px-4 py-2 text-black font-bold bg-white hover:bg-gray-200 active:scale-[0.98] transition-all rounded-xl cursor-pointer font-inter text-center shadow-lg"
      >
        Return to Mesh
      </Link>
    </section>
  );
};

export default Metrics;
