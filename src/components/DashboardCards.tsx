"use client";

import Link from "next/link";

type NavItem = {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  available: boolean;
  external: boolean;
};

export default function DashboardCards({ navItems }: { navItems: NavItem[] }) {
  return (
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
              className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 flex-shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, color-mix(in srgb, var(--primary) 18%, white), color-mix(in srgb, var(--primary) 8%, white))",
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
                width="13"
                height="13"
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
            className="relative flex flex-col bg-white/50 rounded-2xl p-6"
            style={{
              boxShadow: "0 1px 4px rgba(44,40,37,0.05), 0 0 0 1px rgba(44,40,37,0.04)",
              opacity: 0.55,
            }}
          >
            {/* Icon */}
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 flex-shrink-0"
              style={{
                background: "color-mix(in srgb, var(--primary) 8%, white)",
              }}
            >
              <span style={{ color: "var(--primary)" }}>{item.icon}</span>
            </div>

            <h3
              className="text-sm font-semibold text-[#2c2825] mb-1"
              style={{ fontFamily: "var(--font)" }}
            >
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
  );
}
