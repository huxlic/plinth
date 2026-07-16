import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!glowRef.current || !containerRef.current) return;

      const xTo = gsap.quickTo(glowRef.current, "x", {
        duration: 0.4,
        ease: "power3.out",
      });
      const yTo = gsap.quickTo(glowRef.current, "y", {
        duration: 0.4,
        ease: "power3.out",
      });

      const handleMouseMove = (e: MouseEvent) => {
        const rect = containerRef.current!.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        xTo(x - 192);
        yTo(y - 192);
      };

      const handleMouseEnter = () => {
        gsap.to(glowRef.current, { opacity: 0.15, duration: 0.3 });
      };

      const handleMouseLeave = () => {
        gsap.to(glowRef.current, { opacity: 0, duration: 0.3 });
      };

      // 2. Attach event listeners
      const container = containerRef.current;
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);

      const texts = gsap.utils.toArray(".hero-content");

      gsap.from(texts, {
        opacity: 0,
        yPercent: 20,
        duration: 1,
        ease: "power1.inOut",
        stagger: 0.2,
      });

      // Cleanup listeners on unmount
      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="py-20 pt-40 bg-grid-faded relative overflow-hidden flex justify-center items-center"
      id="hero"
    >
      <div
        ref={glowRef}
        className="absolute top-0 left-0 w-60 h-60 bg-secondary bg-pixel-glow blur-[120px] pointer-events-none opacity-0"
      />

      <div className="w-full max-w-6xl flex flex-col gap-6 px-4 sm:w-[96%] sm:px-6">
        <h1 className="hero-content text-white font-black font-doto text-4xl sm:text-5xl text-center md:text-start md:text-6xl lg:text-8xl uppercase tracking-tight">
          The World's Shared Live Canvas.
        </h1>
        <p className="hero-content text-tertiary text-[16px]  sm:text-xl text-center md:text-start">
          Sub-millisecond packet synchronization. Low-overhead state tracking.
          Zero-latency collaboration.
        </p>

        <div className="flex flex-col sm:flex-row w-full justify-center md:justify-center gap-4 mt-4">
          <Link
            to="/dashboard"
            className="hero-content bg-primary text-black text-[14px] rounded-full px-4 py-2 font-bold flex items-center justify-center hover:bg-tertiary transition-colors"
          >
            Open Node Hub
          </Link>
          <Link
            to="/register"
            className="hero-content flex items-center justify-center gap-2 text-primary text-[14px] px-4 py-2 font-semibold rounded-full bg-[#111112] border border-border "
          >
            <span>Enter Alpha</span>
            <ChevronRight size={15} className="text-tertiary" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
