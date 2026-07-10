const architecture: { heading: string; title: string; desc: string }[] = [
  {
    heading: "TRANSPORT",
    title: "WebSocket Mesh",
    desc: "Persistent duplex channels with binary framing. Each pixel mutation is a 12-byte payload.",
  },
  {
    heading: "CONSISTENCY",
    title: "CRDT State",
    desc: "Conflict-free replicated grids. No merge conflicts, no lost writes, at any scale.",
  },
  {
    heading: "RUNTIME",
    title: "Edge Rendering",
    desc: "GPU-accelerated canvas with dirty-rect batching. 240Hz on modern displays.",
  },
];

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
            className={`flex flex-col gap-4 ${index === 1 ? "sm:border-x-[.1px] border-l-[.1px] border-[#232326]" : "border-l-[.1px] sm:border-none border-[#232326]"} box-border p-8 hover:bg-[#111112] transition-colors duration-300`}
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
