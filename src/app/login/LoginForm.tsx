"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <div className="min-h-screen flex items-center justify-center bg-[color:var(--background)] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-lg shadow-md p-6 transition-all duration-300 ease-in-out"
      >
        <h2 className="text-2xl font-semibold text-center text-[#A69B90] mb-6">
          Employee Login
        </h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded-md p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-[#A69B90] transition duration-300"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded-md p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-[#A69B90] transition duration-300"
          required
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="bg-[#A69B90] text-white py-2 px-4 rounded-md w-full hover:bg-[#94897f] transition-colors duration-300"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-[#A69B90] hover:underline transition duration-300"
          >
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
