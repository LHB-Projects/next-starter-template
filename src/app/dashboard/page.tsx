import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardPage() {
  // Check the session server-side
  const session = await getServerSession(authOptions);

  if (!session) {
    // If not logged in, redirect immediately before rendering
    redirect("/login");
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-xl font-bold">Welcome, {session.user?.name}!</h1>
    </div>
  );
}
