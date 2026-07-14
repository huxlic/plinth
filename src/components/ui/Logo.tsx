
const Logo = () => {
  return (
    <div className="w-max flex items-center gap-2">
      <div className="w-5 h-5 relative grid grid-cols-2 grid-rows-2 gap-[1.5px]">
        <div className="bg-white"></div>
        <div className="bg-[#4D4C4D]"></div>
        <div className="bg-[#999999]"></div>
        <div className="bg-[#2997FF]"></div>
      </div>
      <span className="text-white font-black font-doto tracking-tight">PLINTH.</span>
    </div>
  );
}

export default Logo