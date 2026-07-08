import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Showcase from "../components/Showcase";

const Overview = () => {
  return (
    <div className="bg-black">
      <Navbar />
      <Hero />
      <Showcase />
    </div>
  );
};

export default Overview;
