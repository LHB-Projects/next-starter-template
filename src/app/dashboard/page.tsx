import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

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
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-10">

        {/* Welcome Header */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-[#C4B8B0] mb-1" style={{ fontFamily: "var(--font)" }}>
            Employee Hub
          </p>
          <h1 className="text-3xl font-semibold text-[#2c2825]" style={{ fontFamily: "var(--font)" }}>
            Good to see you, {firstName}.
          </h1>
          <p className="text-sm text-[#A69B90] mt-1" style={{ fontFamily: "var(--font)" }}>
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {navItems.map((item) =>
            item.available ? (
              <Link
                key={item.title}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="relative flex flex-col bg-white rounded-2xl p-6 group transition-all duration-200"
                style={{
                  boxShadow: "0 2px 8px rgba(44,40,37,0.08), 0 0 0 1px rgba(44,40,37,0.06)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 8px 24px rgba(44,40,37,0.13), 0 0 0 1px rgba(166,155,144,0.25)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 2px 8px rgba(44,40,37,0.08), 0 0 0 1px rgba(44,40,37,0.06)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: "linear-gradient(135deg, color-mix(in srgb, var(--primary) 18%, white), color-mix(in srgb, var(--primary) 8%, white))",
                    boxShadow: "0 2px 6px color-mix(in srgb, var(--primary) 20%, transparent)",
                  }}
                >
                  <span style={{ color: "var(--primary)" }}>{item.icon}</span>
                </div>

                <h3
                  className="text-sm font-semibold text-[#2c2825] mb-1 group-hover:text-[color:var(--primary)] transition-colors duration-200"
                  style={{ fontFamily: "var(--font)" }}
                >
                  {item.title}
                </h3>
                <p className="text-xs text-[#A69B90] leading-relaxed" style={{ fontFamily: "var(--font)" }}>
                  {item.description}
                </p>

                {item.external && (
                  <svg
                    width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    className="absolute top-4 right-4 text-[#C4B8B0]"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                )}
              </Link>
            ) : (
              <div
                key={item.title}
                className="relative flex flex-col bg-white/50 rounded-2xl p-6"
                style={{
                  boxShadow: "0 1px 4px rgba(44,40,37,0.05), 0 0 0 1px rgba(44,40,37,0.04)",
                  opacity: 0.55,
                }}
              >
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: "color-mix(in srgb, var(--primary) 8%, white)",
                  }}
                >
                  <span style={{ color: "var(--primary)" }}>{item.icon}</span>
                </div>

                <h3 className="text-sm font-semibold text-[#2c2825] mb-1" style={{ fontFamily: "var(--font)" }}>
                  {item.title}
                </h3>
                <p className="text-xs text-[#A69B90] leading-relaxed" style={{ fontFamily: "var(--font)" }}>
                  {item.description}
                </p>

                <span
                  className="absolute top-4 right-4 text-[10px] uppercase tracking-widest text-[#C4B8B0] border border-[#e8e2db] bg-white px-2 py-0.5 rounded-full"
                  style={{ fontFamily: "var(--font)" }}
                >
                  Coming soon
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
