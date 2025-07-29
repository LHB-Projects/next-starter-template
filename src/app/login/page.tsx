import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
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
