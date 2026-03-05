import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import DashboardCards from "@/components/DashboardCards";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const user = session.user as { name?: string; email?: string; role?: string };
  const firstName = user.name?.split(" ")[0] ?? "there";

  const navItems = [
    {
      title: "Schedule",
      description: "View your upcoming shifts and availability",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      ),
      href: "https://login.getsling.com/?_gl=1*1tuzn6o*_gcl_au*NTI1MDkyMzkyLjE3NzI3Mzg2Mzg.",
      available: true,
      external: true,
    },
    {
      title: "Time & Attendance",
      description: "Clock in, clock out, and review your hours",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
        </svg>
      ),
      href: "#",
      available: false,
      external: false,
    },
    {
      title: "Announcements",
      description: "Stay up to date with the latest from management",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      ),
      href: "#",
      available: false,
      external: false,
    },
    {
      title: "My Profile",
      description: "Update your contact information and preferences",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
      ),
      href: "/profile",
      available: true,
      external: false,
    },
    {
      title: "Resources",
      description: "Access company documents, policies, and guides",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      ),
      href: "/resources",
      available: false,
      external: false,
    },
    {
      title: "Training Center",
      description: "Complete onboarding tasks and training modules",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      ),
      href: "/training",
      available: false,
      external: false,
    },
  ];

  return (
    <div
      className="fixed inset-0 overflow-auto"
      style={{ background: "linear-gradient(160deg, #faf9f7 0%, #f0ebe4 100%)" }}
    >
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-10">
        {/* Welcome Header */}
        <div className="mb-10">
          <p
            className="text-xs uppercase tracking-widest text-[#C4B8B0] mb-1"
            style={{ fontFamily: "var(--font)" }}
          >
            Employee Hub
          </p>
          <h1
            className="text-3xl font-semibold text-[#2c2825]"
            style={{ fontFamily: "var(--font)" }}
          >
            Good to see you, {firstName}.
          </h1>
          <p className="text-sm text-[#A69B90] mt-1" style={{ fontFamily: "var(--font)" }}>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Cards */}
        <DashboardCards navItems={navItems} />
      </div>
    </div>
  );
}
