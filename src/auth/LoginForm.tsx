import { Link } from "react-router";
import logo from "../assets/plinth.svg";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "../lib/utils/supabaseClient";

const LoginForm = () => {
  const [credentials, setCredentials] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const loginMutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      return data;
    },
    onSuccess: (data) => {
      console.log("🔓 Node Accessed Successfully. Session established:", data);
    },
    onError: (error) => {
      console.error("❌ Access Denied:", error.message);
    },
  });

  const signInUser = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    loginMutation.mutate({ email, password });
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
          className="w-full flex flex-col gap-5 bg-[#111112]/90 backdrop-blur-md p-8 rounded-2xl border border-border mt-6 shadow-2xl"
          onSubmit={(e) => {
            e.preventDefault();
            signInUser(e);
          }}
        >
          <div className="flex flex-col gap-2">
            <label
              className="uppercase text-[10px] text-tertiary font-jetbrains-mono tracking-wider"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="bg-black border border-border rounded-lg text-primary text-[13px] px-4 py-2.5 placeholder:text-[#474749] w-full outline-none focus:border-[#424246] transition-colors"
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
              className="bg-black border border-border rounded-lg text-primary text-[13px] px-4 py-2.5 placeholder:text-[#474749] w-full outline-none focus:border-[#424246] transition-colors"
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
            className={`text-[13px] mt-2 px-4 py-3 text-black font-bold ${loginMutation.isPending ? "cursor-not-allowed bg-gray-300" : "bg-white hover:bg-gray-200 cursor-pointer"} active:scale-[0.98] transition-all rounded-lg text-center`}
          >
            {loginMutation.isPending ? "CONNECTING_TO_NODE..." : "Access Node"}
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
