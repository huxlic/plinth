import Architecture from "../components/Architecture";
import Hero from "../components/Hero";
import Showcase from "../components/Showcase";
import Footer from "../components/ui/Footer";
import Navbar from "../components/ui/Navbar";

const Overview = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Hero />
      <Showcase />
      <Architecture />
      <Footer />
    </div>
  );
};

export default Overview;
