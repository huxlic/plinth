const Telemetry = ({
  GLOBAL_NODES,
  USERS_ONLINE,
}: {
  GLOBAL_NODES: number;
  USERS_ONLINE: number;
}) => {
  const globalNodes = GLOBAL_NODES;
  const usersOnline = USERS_ONLINE;
  const upTime = "99.998%";

  const telemetry: { title: string; rate: number | string }[] = [
    { title: "Global nodes", rate: globalNodes },
    { title: "Users online", rate: usersOnline },
    { title: "Uptime", rate: upTime },
  ];

  return (
    <aside className="h-max lg:sticky top-20 bg-[#111112] box-border border border-border rounded-xl overflow-hidden">
      <div className="border-b border-border px-4 py-2 flex items-center justify-between">
        <p className="text-[14px] font-semibold">Telemetry</p>

        <div className="flex items-center gap-1">
          <div className="h-1 w-1 rounded-full bg-[#30D158]"></div>
          <p className="text-[10px] font-jetbrains-mono text-tertiary">LIVE</p>
        </div>
      </div>

      <div className="px-4 font-jetbrains-mono">
        <ul className="py-4 flex flex-col gap-2 border-b border-border">
          {telemetry.map(({ title, rate }) => (
            <li key={title} className="flex justify-between items-center">
              <p className="uppercase text-tertiary text-[11px]">{title}</p>
              <p className="uppercase text-[13px]">{rate}</p>
            </li>
          ))}
        </ul>

        <div className="py-4">
          <p className="uppercase text-tertiary text-[10px]">Throughput · 60s</p>
          <div className=""></div>
        </div>
      </div>
    </aside>
  );
};

export default Telemetry;
