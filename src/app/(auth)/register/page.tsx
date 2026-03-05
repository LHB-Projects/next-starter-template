"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        password: form.get("password"),
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = (await res.json()) as { error?: string };
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Something went wrong");
    } else {
      router.push("/login");
    }
  }

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center px-4"
      style={{ background: "linear-gradient(160deg, #faf9f7 0%, #f0ebe4 100%)" }}
    >
      {/* Logo */}
      <div className="mb-4">
        <Image
          src="/logo.png"
          alt="J. Michael's Prime"
          width={480}
          height={240}
          priority
          className="w-auto h-auto max-w-[480px]"
        />
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/80 px-8 py-8">

        {/* Divider with text */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-[#e8e2db]" />
          <span className="text-xs uppercase tracking-[0.2em] text-[#A69B90]" style={{ fontFamily: "var(--font)" }}>
            Create Account
          </span>
          <div className="flex-1 h-px bg-[#e8e2db]" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Name */}
          <div className="relative">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C4B8B0]"
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
            <input
              name="name"
              type="text"
              placeholder="Full name"
              className="w-full border border-[#e8e2db] rounded-xl pl-10 pr-4 py-3 text-sm text-[#2c2825] bg-white/80 focus:outline-none focus:border-[color:var(--primary)] focus:ring-2 focus:ring-[color:var(--primary)]/20 transition duration-200 placeholder:text-[#C4B8B0]"
              style={{ fontFamily: "var(--font)" }}
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C4B8B0]"
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <input
              name="email"
              type="email"
              placeholder="Email address"
              className="w-full border border-[#e8e2db] rounded-xl pl-10 pr-4 py-3 text-sm text-[#2c2825] bg-white/80 focus:outline-none focus:border-[color:var(--primary)] focus:ring-2 focus:ring-[color:var(--primary)]/20 transition duration-200 placeholder:text-[#C4B8B0]"
              style={{ fontFamily: "var(--font)" }}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C4B8B0]"
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full border border-[#e8e2db] rounded-xl pl-10 pr-4 py-3 text-sm text-[#2c2825] bg-white/80 focus:outline-none focus:border-[color:var(--primary)] focus:ring-2 focus:ring-[color:var(--primary)]/20 transition duration-200 placeholder:text-[#C4B8B0]"
              style={{ fontFamily: "var(--font)" }}
              required
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-white text-sm font-medium tracking-wide transition-all duration-200 disabled:opacity-60"
            style={{ backgroundColor: "var(--primary)", fontFamily: "var(--font)" }}
            onMouseEnter={(e) => !loading && ((e.target as HTMLElement).style.backgroundColor = "var(--primary-hover)")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.backgroundColor = "var(--primary)")}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Creating account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="text-xs text-center mt-5 text-[#A69B90]" style={{ fontFamily: "var(--font)" }}>
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium hover:underline transition duration-200"
            style={{ color: "var(--primary)" }}
          >
            Sign in
          </a>
        </p>
      </div>

      {/* Footer */}
      <p className="mt-5 text-xs text-[#C4B8B0]" style={{ fontFamily: "var(--font)" }}>
        © {new Date().getFullYear()} J. Michael&apos;s Prime. All rights reserved.
      </p>
    </div>
  );
}
