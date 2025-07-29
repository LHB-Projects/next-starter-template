"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic"; // 

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <p>Loading...</p>;

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-xl font-bold">Welcome, {session.user?.name}!</h1>
    </div>
  );
}
