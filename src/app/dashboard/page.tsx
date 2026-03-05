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
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
      ),
      href: "/profile",
      available: false,
      external: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f7] w-full px-6 py-10 max-w-4xl mx-auto">

      {/* Welcome Header */}
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-[#C4B8B0] mb-1">Employee Hub</p>
        <h1 className="text-3xl font-semibold text-[#2c2825]" style={{ fontFamily: "var(--font)" }}>
          Good to see you, {firstName}.
        </h1>
        <p className="text-sm text-[#A69B90] mt-1">
          {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* Module Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {navItems.map((item) =>
          item.available ? (
            <Link
              key={item.title}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="relative bg-white rounded-xl border border-[#e8e2db] p-6 hover:border-[color:var(--primary)] hover:shadow-sm transition-all duration-200 group"
            >
              <div className="flex items-start gap-4">
                <div
                  className="p-2.5 rounded-lg"
                  style={{ backgroundColor: "color-mix(in srgb, var(--primary) 12%, white)" }}
                >
                  <span style={{ color: "var(--primary)" }}>{item.icon}</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#2c2825] group-hover:text-[color:var(--primary)] transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#A69B90] mt-0.5 leading-relaxed">{item.description}</p>
                </div>
              </div>
              {item.external && (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="absolute top-4 right-4 text-[#C4B8B0]"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              )}
            </Link>
          ) : (
            <div
              key={item.title}
              className="relative bg-white rounded-xl border border-[#e8e2db] p-6 opacity-60"
            >
              <div className="flex items-start gap-4">
                <div
                  className="p-2.5 rounded-lg"
                  style={{ backgroundColor: "color-mix(in srgb, var(--primary) 12%, white)" }}
                >
                  <span style={{ color: "var(--primary)" }}>{item.icon}</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#2c2825]">{item.title}</h3>
                  <p className="text-xs text-[#A69B90] mt-0.5 leading-relaxed">{item.description}</p>
                </div>
              </div>
              <span className="absolute top-4 right-4 text-[10px] uppercase tracking-widest text-[#C4B8B0] border border-[#e8e2db] px-2 py-0.5 rounded-full">
                Coming soon
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}
