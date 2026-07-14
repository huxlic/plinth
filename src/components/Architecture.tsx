import { architecture } from "../shared/constants";

const Architecture = () => {
  return (
    <section className="relative w-[calc(100%-1rem)] max-w-6xl mx-auto px-4 flex flex-col gap-4 py-20">
      <h2 className="text-tertiary font-jetbrains-mono text-[10px] uppercase">
        System · Architecture
      </h2>

      <h3 className="text-5xl font-semibold">Engineered from the packet up.</h3>

      <div className="grid gap-1 sm:gap-0 sm:grid-cols-3 mt-6">
        {architecture.map(({ heading, title, desc }, index) => (
          <div
            key={heading}
            className={`flex flex-col gap-4 ${index === 1 ? "sm:border-x-[.1px] border-l-[.1px] border-border" : "border-l-[.1px] sm:border-none border-border"} box-border p-8 hover:bg-[#111112] transition-colors duration-300`}
          >
            <p className="uppercase text-tertiary text-[10px] font-jetbrains-mono">
              {heading}
            </p>
            <h4 className="text-[20px] font-bold">{title}</h4>
            <p className="text-[13px] text-tertiary">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Architecture;
