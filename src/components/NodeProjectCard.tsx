import { useNavigate } from "react-router";

const NodeProjectCard = ({
  id,
  name,
  created_at,
}: {
  id: string;
  name: string;
  created_at: string}) => {

    const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/canvas/${id}`)}
      className="group cursor-pointer border border-border bg-[#111112] p-5 rounded-xl hover:border-zinc-700 transition shadow-lg flex flex-col justify-between"
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <span className="text-zinc-600 font-mono text-[9px] uppercase tracking-wider">
            {id.slice(0, 12)}...
          </span>
          <span className="w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-emerald-500 transition" />
        </div>
        <h3 className="text-sm font-bold text-zinc-200 group-hover:text-white mb-2 truncate">
          {name}
        </h3>
      </div>
      <p className="text-[10px] text-zinc-500 mt-4">
        Created: {new Date(created_at).toLocaleDateString()}
      </p>
    </div>
  );
};

export default NodeProjectCard;
