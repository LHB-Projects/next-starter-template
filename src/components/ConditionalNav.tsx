"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import NavDropdown from "@/components/NavDropdown";

type Settings = {
  logo_url: string;
  site_title: string;
};

export default function ConditionalNav({ settings }: { settings: Settings }) {
  const { data: session } = useSession();
  const pathname = usePathname();

  const hideNav = !session || pathname === "/login" || pathname === "/register";

  if (hideNav) return null;

  const navLinks = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Schedule", href: "https://login.getsling.com/?_gl=1*1tuzn6o*_gcl_au*NTI1MDkyMzkyLjE3NzI3Mzg2Mzg.", external: true },
    { label: "Profile", href: "/profile" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 bg-white/80 backdrop-blur-sm border-b border-[#e8e2db]" style={{ height: "72px" }}>
      {/* Logo */}
      <Link href="/dashboard" className="flex-shrink-0">
        <Image
          src={settings.logo_url}
          alt={`${settings.site_title} Logo`}
          width={300}
          height={150}
          priority
          className="cursor-pointer w-auto object-contain"
          style={{ height: "56px" }}
        />
      </Link>

      {/* Nav links */}
      <nav className="hidden sm:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              pathname === link.href
                ? "text-[color:var(--primary)] bg-[color-mix(in_srgb,var(--primary)_10%,white)]"
                : "text-[#6b5f58] hover:text-[color:var(--primary)] hover:bg-[color-mix(in_srgb,var(--primary)_8%,white)]"
            }`}
            style={{ fontFamily: "var(--font)" }}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Right side: user dropdown */}
      <NavDropdown />
    </header>
  );
}
