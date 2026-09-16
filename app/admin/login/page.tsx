"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const supabase = createClient();

      console.log("Starting Supabase login...");
      console.log(
        "Supabase URL:",
        process.env.NEXT_PUBLIC_SUPABASE_URL
      );

      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      console.log("Login response:", {
        data,
        loginError,
      });

      if (loginError) {
        setError(loginError.message);
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to connect to Supabase."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#04070d] px-6 text-[#f3efe8]">
      <form
        onSubmit={login}
        className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-8"
      >
        <p className="text-xs uppercase tracking-[0.5em] text-[#d9c5a2]">
          Images Production
        </p>

        <h1 className="mt-4 text-3xl uppercase tracking-[0.14em]">
          Admin Login
        </h1>

        <div className="mt-8 space-y-4">
          <input
            id="email"
            name="email"
            required
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            className="w-full rounded-xl border border-white/10 bg-[#0b1220] p-3 text-sm text-white outline-none"
          />

          <input
            id="password"
            name="password"
            required
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            className="w-full rounded-xl border border-white/10 bg-[#0b1220] p-3 text-sm text-white outline-none"
          />
        </div>

        {error && (
          <p className="mt-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-300">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-[#d9c5a2] px-5 py-3 text-xs uppercase tracking-[0.2em] text-[#03080d] disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}