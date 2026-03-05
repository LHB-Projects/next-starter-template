"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const res = await signIn("credentials", {
      redirect: false,
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Logo above the form */}
      <div className="mb-6">
        <Image
          src="/logo.png"
          alt="Logo"
          width={320}
          height={160}
          priority
          className="w-auto h-auto max-w-[320px]"
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-lg shadow-md p-6 transition-all duration-300 ease-in-out"
      >
        <h2
          className="text-2xl font-semibold text-center mb-6"
          style={{ color: "var(--primary)", fontFamily: "var(--font)" }}
        >
          Employee Login
        </h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded-md p-3 mb-4 w-full focus:outline-none transition duration-300"
          style={{ fontFamily: "var(--font)" }}
          onFocus={(e) => (e.target.style.boxShadow = `0 0 0 2px var(--primary)`)}
          onBlur={(e) => (e.target.style.boxShadow = "none")}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded-md p-3 mb-4 w-full focus:outline-none transition duration-300"
          style={{ fontFamily: "var(--font)" }}
          onFocus={(e) => (e.target.style.boxShadow = `0 0 0 2px var(--primary)`)}
          onBlur={(e) => (e.target.style.boxShadow = "none")}
          required
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="text-white py-2 px-4 rounded-md w-full transition-colors duration-300"
          style={{ backgroundColor: "var(--primary)", fontFamily: "var(--font)" }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.backgroundColor = "var(--primary-hover)")}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.backgroundColor = "var(--primary)")}
        >
          Login
        </button>

        <p className="text-sm text-center mt-4 text-gray-600" style={{ fontFamily: "var(--font)" }}>
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            className="hover:underline transition duration-300"
            style={{ color: "var(--primary)" }}
          >
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
