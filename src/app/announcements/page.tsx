import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import AnnouncementsClient from "./AnnouncementsClient";

export default async function AnnouncementsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const userRole = (session.user as { role?: string }).role ?? "employee";
  const isAdmin = userRole === "admin";

  const { data } = await supabase
    .from("Announcement")
    .select("id, title, body, author_name, target_roles, created_at")
    .order("created_at", { ascending: false });

  const announcements = (data ?? []).filter(
    (a: { target_roles: string[] }) =>
      a.target_roles.length === 0 || a.target_roles.includes(userRole)
  );

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(160deg, #faf9f7 0%, #f0ebe4 100%)" }}
    >
      <div className="max-w-3xl mx-auto px-6 pt-16 pb-16">
        <AnnouncementsClient initialAnnouncements={announcements} isAdmin={isAdmin} />
      </div>
    </div>
  );
}
