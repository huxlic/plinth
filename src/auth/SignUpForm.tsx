import { Link } from "react-router";
import logo from "../assets/plinth.svg";
import { useState } from "react";
import { supabase } from "../lib/utils/supabaseClient";
import { useMutation } from "@tanstack/react-query";

const SignUpForm = () => {
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

  const signupMutation = useMutation({
    mutationFn: async ({
      email,
      password,
      username,
    }: {
      email: string;
      password: string;
      username: string;
    }) => {
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      if (data?.user && username) {
        const { error: profileError } = await supabase
          .from("profiles")
          .insert([{ id: data.user.id, username }]);

        if (profileError) throw profileError;
      }

      return data;
    },

    onSuccess: (data) => {
      console.log("🚀 Node Initialized Successfully:", data);
      alert("Node created! Check your email or try logging in.");
    },

    // 3. Fires automatically if Supabase rejects the password, email, or unique handle
    onError: (error) => {
      console.error("❌ Initialization Failed:", error.message);
    },
  });

  const registerUser = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const username = e.target.username.value;

    signupMutation.mutate({ email, password, username });
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
            Create your Plinth account
          </h2>
        </div>
        <p className="uppercase text-[10px] font-jetbrains-mono text-tertiary tracking-widest">
          Developer Identity · Node Initialization
        </p>

        <form
          className="w-full flex flex-col gap-5 bg-[#111112]/90 backdrop-blur-md p-8 rounded-2xl border border-[#232326] mt-6 shadow-2xl"
          onSubmit={(e) => {
            e.preventDefault();
            registerUser(e);
          }}
        >
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
              value={credentials.username}
              onChange={handleChange}
            />
          </div>

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
              Security Key / Password
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
            disabled={signupMutation.isPending}
            type="submit"
            className={`text-[13px] mt-2 px-4 py-3 text-black font-bold ${signupMutation.isPending ? "cursor-not-allowed bg-gray-300" : "bg-white hover:bg-gray-200 cursor-pointer"} active:scale-[0.98] transition-all rounded-lg text-center`}
          >
            {signupMutation.isPending
              ? "INITIALIZING_NODE..."
              : "Initialize Node"}
          </button>

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
