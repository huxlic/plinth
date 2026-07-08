import { Link } from "react-router";
import logo from "../assets/plinth.svg";

const SignUpForm = () => {
  return (
    // Added 'relative' and 'overflow-hidden' to contain the background blur effect properly
    <section className="relative h-screen bg-grid-faded flex justify-center items-center px-4 overflow-hidden">
      {/* 🌌 Ambient Soft Blue Glow Effect */}
      <div className="absolute w-[450px] h-[450px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Main Content Container (Pushed to z-10 so it sits crisp above the glow) */}
      <div className="relative flex flex-col gap-2 justify-center items-center w-full max-w-md z-10">
        {/* Header Block */}
        <div className="flex flex-col items-center gap-4">
          <img
            src={logo}
            alt="Plinth Logo"
            className="w-8 h-8 tracking-normal"
          />
          <h2 className="text-[22px] font-inter font-semibold text-white tracking-tight">
            Create your Plinth account
          </h2>
        </div>
        <p className="uppercase text-[10px] font-jetbrains-mono text-tertiary tracking-widest">
          Developer Identity · Node Initialization
        </p>

        {/* Dynamic Card Form */}
        <form
          className="w-full flex flex-col gap-5 bg-[#111112]/90 backdrop-blur-md p-8 rounded-2xl border border-[#232326] mt-6 shadow-2xl"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Field 1: User Handle Metadata */}
          <div className="flex flex-col gap-2">
            <label
              className="uppercase text-[10px] text-tertiary font-jetbrains-mono tracking-wider"
              htmlFor="username"
            >
              Developer Handle
            </label>
            <input
              className="bg-black border border-[#232326] rounded-lg text-primary text-[13px] px-4 py-2.5 placeholder:text-[#474749] w-full outline-none focus:border-[#424246] transition-colors"
              type="text"
              name="username"
              id="username"
              placeholder="e.g., zero_entropy"
              required
            />
          </div>

          {/* Field 2: Email */}
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
            />
          </div>

          {/* Field 3: Security Key (Password) */}
          <div className="flex flex-col gap-2">
            <label
              className="uppercase text-[10px] text-tertiary font-jetbrains-mono tracking-wider"
              htmlFor="password"
            >
              Security Key / Password
            </label>
            <input
              className="bg-black border border-[#232326] rounded-lg text-primary text-[13px] px-4 py-2.5 placeholder:text-[#474749] w-full outline-none focus:border-[#424246] transition-colors"
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Core Submit Action */}
          <button
            type="submit"
            className="text-[13px] mt-2 px-4 py-3 text-black font-bold bg-white hover:bg-gray-200 active:scale-[0.98] transition-all rounded-lg cursor-pointer text-center"
          >
            Initialize Node
          </button>

          {/* Authentication Gateway Redirect Footer */}
          <div className="mt-2 flex items-center justify-center border-t border-[#1c1c1e] pt-4">
            <Link
              to="/signin"
              className="text-[10px] font-jetbrains-mono text-tertiary hover:text-white transition-colors tracking-wide"
            >
              Already have an account? Sign in →
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUpForm;
