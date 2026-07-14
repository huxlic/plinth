import { features } from "../shared/constants";
import AutoCanvasFeature from "./features/AutoCanvasFeature";

const Showcase = () => {
  return (
    <section className="relative w-[calc(100%-1rem)] flex flex-col gap-15 h-max max-w-6xl px-4 mx-auto overflow-hidden box-border">
      <div className=" w-full border border-[#1c1c1e] bg-[#050506] rounded-3xl overflow-hidden">
        <div className="border-b border-[#1c1c1e] px-4 py-2 flex items-center justify-between font-jetbrains-mono">
          <div className="hidden sm:flex items-center gap-2">
            <div className="rounded-full h-2.5 w-2.5 bg-[#FF5F57]"></div>
            <div className="rounded-full h-2.5 w-2.5 bg-[#FEBC2E]"></div>
            <div className="rounded-full h-2.5 w-2.5 bg-[#28C840]"></div>
          </div>

          <div className="flex flex-1 xs:flex-none items-center gap-2 bg-black px-3 py-1 rounded-xl border border-[#1c1c1e] text-tertiary text-[10px] ">
            <span className="text-secondary-hover">◉</span>
            <p>plinth.io/canvas/main-grid-alpha</p>
          </div>

          <span className="text-tertiary text-[12px] hidden xs:block">
            3 users
          </span>
        </div>

        <AutoCanvasFeature />
      </div>

      <section className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4">
        {features.map(({ rate, title }) => (
          <div
            key={title}
            className="flex flex-col gap-2 bg-black border border-border p-8 box-border"
          >
            <h3 className="text-4xl font-bold">{rate}</h3>
            <p className="text-tertiary font-jetbrains-mono text-[10px] uppercase ">
              {title}
            </p>
          </div>
        ))}
      </section>
    </section>
  );
};

export default Showcase;
