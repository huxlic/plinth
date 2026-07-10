import { Link } from "react-router";

const Four0Four = () => {
  return (
    <section className="relative h-screen bg-black bg-grid-faded flex justify-center items-center px-4 overflow-hidden">

      <div className="absolute w-125 h-125 bg-red-500/5 blur-[140px] rounded-full pointer-events-none z-0" />

      <div className="relative flex flex-col items-center justify-center text-center z-10 max-w-md">
        <h1 className="font-inter font-black text-[130px] sm:text-[160px] leading-none text-white tracking-tighter opacity-80 select-none drop-shadow-[0_0_40px_rgba(255,255,255,0.05)]">
          404
        </h1>

        <p className="uppercase mt-2 text-[10px] font-jetbrains-mono text-red-400 tracking-[0.25em] bg-red-950/30 border border-red-900/40 px-3 py-1 rounded-md shadow-inner">
          Status: NODE_NOT_FOUND
        </p>

        <p className="mt-6 text-[13px] sm:text-[14px] text-tertiary font-inter leading-relaxed max-w-xs sm:max-w-sm">
          The grid coordinates you are trying to access do not exist or have
          been permanently decoupled from the Plinth mesh network.
        </p>

        <Link
          to="/"
          className="mt-8 text-[13px] px-4 py-2 text-black font-bold bg-white hover:bg-gray-200 active:scale-[0.98] transition-all rounded-2xl cursor-pointer font-inter text-center shadow-lg"
        >
          Return to Mesh
        </Link>
      </div>
    </section>
  );
};

export default Four0Four;
