import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  // Check if user is already logged in
  const session = await getServerSession(authOptions);

  if (session) {
    // If logged in, redirect to dashboard
    redirect("/dashboard");
  }

  // Otherwise, show the login form
  return <LoginForm />;
}
