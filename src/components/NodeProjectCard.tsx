import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";

const NodeProjectCard = ({
  id,
  name,
  created_at,
}: {
  id: string;
  name: string;
  created_at: string}) => {

  return (
    <div className="border border-border bg-[#111112] p-4 rounded-xl hover:bg-[#0A0A0B] transition flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="h-16 w-8 bg-black rounded-md border border-border"></div>

        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-zinc-200 group-hover:text-white truncate">
            {name}
          </h3>
          <p className="text-[10px] text-tertiary">
            Created: {new Date(created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="">
        <Link to={`/canvas/${id}`} className="text-[12px] flex items-center gap-1 px-4 py-1.5 rounded-xl bg-black hover:bg-white text-white hover:text-black font-bold border border-border transition-colors duration-300" >Connect <ArrowUpRight size={13} /> </Link>
      </div>
    </div>
  );
};

export default NodeProjectCard;
