import { Link } from "react-router";
import logo from "../assets/plinth.svg";
import { useState } from "react";

const LoginForm = () => {

    const [credentials, setCredentials] = useState<{
        username: string;
        email: string;
        password: string;
      }>({
        username: "",
        email: "",
        password: "",
      });
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
      };

  return (
    <section className="relative h-screen bg-grid-faded flex justify-center items-center px-4 overflow-hidden">
      <div className="absolute w-112.5 h-112.5 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="relative flex flex-col gap-2 justify-center items-center w-full max-w-md z-10">
        <div className="flex flex-col items-center gap-4">
          <img
            src={logo}
            alt="Plinth Logo"
            className="w-8 h-8 tracking-normal"
          />
          <h2 className="text-[22px] font-inter font-semibold text-white tracking-tight">
            Sign in to Plinth
          </h2>
        </div>
        <p className="uppercase text-[10px] font-jetbrains-mono text-tertiary tracking-widest">
          Developer Identity · Node Access
        </p>

        <form
          className="w-full flex flex-col gap-5 bg-[#111112]/90 backdrop-blur-md p-8 rounded-2xl border border-[#232326] mt-6 shadow-2xl"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-col gap-2">
            <label
              className="uppercase text-[10px] text-tertiary font-jetbrains-mono tracking-wider"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="bg-black border border-[#232326] rounded-lg text-primary text-[13px] px-4 py-2.5 placeholder:text-[#474749] w-full outline-none focus:border-[#424246] transition-colors"
              type="email"
              name="email"
              id="email"
              placeholder="you@domain.com"
              required
              value={credentials.email}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              className="uppercase text-[10px] text-tertiary font-jetbrains-mono tracking-wider"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="bg-black border border-[#232326] rounded-lg text-primary text-[13px] px-4 py-2.5 placeholder:text-[#474749] w-full outline-none focus:border-[#424246] transition-colors"
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              required
              value={credentials.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="text-[13px] mt-2 px-4 py-3 text-black font-bold bg-white hover:bg-gray-200 active:scale-[0.98] transition-all rounded-lg cursor-pointer text-center"
          >
            Access Node
          </button>

          <div className="mt-2 flex items-center justify-between border-t border-[#1c1c1e] pt-4">
            <button
              type="button"
              className="text-[10px] font-jetbrains-mono text-tertiary hover:text-white transition-colors tracking-wide cursor-pointer outline-none"
            >
              Forgot?
            </button>
            <Link
              to="/register"
              className="text-[10px] font-jetbrains-mono text-tertiary hover:text-white transition-colors tracking-wide"
            >
              Create identity →
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
