import { useState } from "react";
import { Link, NavLink } from "react-router";
import { navigationManifest } from "../config/navigation";
import Logo from "./ui/Logo";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  useGSAP(() => {

    gsap.from("nav", {
      yPercent: -100,
      opacity: 0,
      ease: "power3.out",
      duration: 0.8,
    })

  }, [])

  return (
    <nav className="fixed top-4 left-1/2 z-50 w-[calc(100%-1rem)] max-w-6xl -translate-x-1/2 rounded-3xl border border-[#232326] bg-[#111112]/80 px-4 py-3 backdrop-blur-md sm:w-[96%] sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <Logo />

          <span className="text-[10px] text-tertiary font-jetbrains-mono">v1.0.0</span>
        </Link>

        <ul className="hidden items-center gap-5 md:flex">
          {navigationManifest.map(({ id, label, path }) => (
            <li
              key={id}
              className="text-nav-link hover:text-nav-link-hover text-[13px] font-medium transition-colors"
            >
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive ? "text-nav-link-hover" : ""
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            to="/signin"
            className="text-nav-link hover:text-nav-link-hover text-[13px] font-medium transition-colors"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="group relative isolate inline-flex h-9 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-[linear-gradient(135deg,#5ab8ff_0%,#2997ff_42%,#006ee6_100%)] px-4 text-[12px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.32),0_6px_16px_rgba(41,151,255,0.22)] transition-all duration-300 before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(circle_at_30%_0%,rgba(255,255,255,0.38),transparent_34%)] after:absolute after:inset-y-0 after:-left-1/2 after:w-1/2 after:-skew-x-12 after:bg-white/20 after:opacity-0 after:transition-all after:duration-500 hover:-translate-y-0.5 hover:border-white/30 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.38),0_8px_20px_rgba(0,122,255,0.28)] hover:after:left-[125%] hover:after:opacity-100 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111112]"
          >
            Get Started
          </Link>
        </div>

        <button
          type="button"
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          onClick={() => setIsMenuOpen((current) => !current)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/70 md:hidden"
        >
          <span className="relative h-3.5 w-4">
            <span
              className={`absolute left-0 top-0 h-0.5 w-4 rounded-full bg-current transition-transform duration-200 ${
                isMenuOpen ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-0.5 w-4 rounded-full bg-current transition-opacity duration-200 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-0.5 w-4 rounded-full bg-current transition-transform duration-200 ${
                isMenuOpen ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 md:hidden ${
          isMenuOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="mt-4 border-t border-white/10 pt-3">
            <ul className="flex flex-col gap-1">
              {navigationManifest.map(({ id, label, path }) => (
                <li key={id}>
                  <NavLink
                    to={path}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `block rounded-2xl px-3 py-2 text-[13px] font-medium transition-colors ${
                        isActive
                          ? "bg-white/8 text-nav-link-hover"
                          : "text-nav-link hover:bg-white/5 hover:text-nav-link-hover"
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="mt-3 flex items-center gap-3 border-t border-white/10 pt-3">
              <Link
                to="/signin"
                onClick={closeMenu}
                className="flex h-10 flex-1 items-center justify-center rounded-full border border-white/10 text-[13px] font-medium text-nav-link transition-colors hover:bg-white/6 hover:text-nav-link-hover"
              >
                Log In
              </Link>
              <Link
                to="/register"
                onClick={closeMenu}
                className="flex h-10 flex-1 items-center justify-center rounded-full border border-white/20  bg-[linear-gradient(135deg,#5ab8ff_0%,#2997ff_42%,#006ee6_100%)] text-[13px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] transition-transform active:scale-[0.98]"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
