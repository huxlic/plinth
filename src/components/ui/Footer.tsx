import { Link } from "react-router";
import Logo from "./Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-black/40 backdrop-blur-md font-jetbrains-mono text-[11px] text-zinc-500 py-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
          <Link to={"/"}>
            <Logo />
          </Link>
          <span className="hidden sm:inline text-zinc-850">|</span>
          <span>© {currentYear} · Global Collaborative Canvas</span>
        </div>

        {/* Resource & Social Links */}
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/huxlic/plinth"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-200 transition-colors duration-150"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
