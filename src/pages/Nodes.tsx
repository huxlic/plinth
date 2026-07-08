// import Navbar from "../components/ui/Navbar";
import { supabase } from "../lib/utils/supabaseClient";


const logCanvasEvent = async (actionName: string, x = null, y = null) => {
  try {
    const { data, error } = await supabase
      .from("canvas_events") // Points directly to your new table
      .insert([
        {
          action: actionName, // e.g., "SHUFFLE_CLICKED"
          x_pos: x, // Number or null
          y_pos: y, // Number or null
        },
      ]);

    if (error) {
      console.error("❌ Database insertion failed:", error.message);
    } else {
      console.log("🚀 Event successfully saved to the cloud matrix!");
    }
  } catch (err) {
    console.error("System error communicating with server:", err);
  }
};

const Nodes = () => {
  return (
    <div className="relative min-h-screen">
      {/* <Navbar /> */}
      <button
        onClick={() => {
          // 1. Run your existing canvas shuffle math code here...
          // handleShuffle();

          // 2. Fire the log payload straight to your live cloud database!
          logCanvasEvent("USER_CLICKED_SHUFFLE");
        }}
        className="bg-[#1c1c1e] text-white rounded-xl text-xs py-2 px-4"
      >
        Re-Shuffle
      </button>
    </div>
  );
}

export default Nodes