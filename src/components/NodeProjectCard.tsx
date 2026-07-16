import { ArrowUpRight, Clock } from "lucide-react";
import { Link } from "react-router";
import getRelativeTime from "../lib/utils/getRelativeTime";
import getAccentColor from "../lib/utils/getAccentColor";

const NodeProjectCard = ({
  id,
  name,
  created_at,
  created_by,
  created_by_username,
  currentUserId,
}: {
  id: string;
  name: string;
  created_at: string;
  created_by: string;
  created_by_username?: string;
  currentUserId?: string;
}) => {
  const accentColor = getAccentColor(id);
  const isOwnedByCurrentUser = created_by === currentUserId;

  

  return (
    <div className="group border border-border bg-[#111112] p-4 rounded-xl hover:bg-[#0A0A0B] hover:border-zinc-700 transition-all duration-300 flex justify-between items-center">
      <div className="flex items-center gap-4 min-w-0">
        <div
          className="h-16 w-1 rounded-l-sm transition-shadow duration-300 group-hover:shadow-[0_0_8px_var(--accent)]"
          style={
            {
              backgroundColor: accentColor,
              "--accent": accentColor,
            } as React.CSSProperties
          }
        />

        <div className="flex flex-col gap-1.5 min-w-0">
          <h3 className="font-bold text-zinc-200 group-hover:text-white truncate transition-colors">
            {name}
          </h3>

          <div className="flex items-center gap-3 font-jetbrains-mono">
            {(isOwnedByCurrentUser || created_by_username) && (
              <span className="text-[10px] text-tertiary truncate">
                by{" "}
                <span className="text-zinc-400">
                  {isOwnedByCurrentUser ? "you" : created_by_username}
                </span>
              </span>
            )}
            <span className="flex items-center gap-1 text-[10px] text-tertiary">
              <Clock size={10} />
              {getRelativeTime(created_at)}
            </span>
          </div>
        </div>
      </div>

      <Link
        to={`/canvas/${id}`}
        className="shrink-0 text-[12px] flex items-center gap-1 px-4 py-1.5 rounded-xl bg-black hover:bg-white text-white hover:text-black font-bold transition-colors duration-300"
      >
        Connect <ArrowUpRight size={13} />
      </Link>
    </div>
  );
};

export default NodeProjectCard;
