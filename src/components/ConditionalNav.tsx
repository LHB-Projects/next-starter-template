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
    { label: "Home", href: "/dashboard" },
    {
      label: "Schedule",
      href: "https://login.getsling.com/?_gl=1*1tuzn6o*_gcl_au*NTI1MDkyMzkyLjE3NzI3Mzg2Mzg.",
      external: true,
    },
    { label: "Resources", href: "/resources" },
    { label: "Calendar", href: "/calendar" },
    { label: "Training Center", href: "/training" },
  ];

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 bg-white/90 backdrop-blur-sm border-b border-[#e8e2db]"
      style={{ height: "72px", boxShadow: "0 1px 12px 0 rgba(44,40,37,0.07)" }}
    >
      {/* Logo */}
      <Link href="/dashboard" className="flex-shrink-0">
        <Image
          src={settings.logo_url}
          alt={`${settings.site_title} Logo`}
          width={300}
          height={150}
          priority
          className="cursor-pointer w-auto object-contain"
          style={{ height: "52px" }}
        />
      </Link>

      {/* Centered nav links */}
      <nav className="hidden sm:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className={`relative px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                isActive
                  ? "font-semibold text-[color:var(--primary)]"
                  : "font-medium text-[#6b5f58] hover:text-[color:var(--primary)] hover:bg-[#f5f1ee]"
              }`}
              style={{ fontFamily: "var(--font)" }}
            >
              {link.label}
              {isActive && (
                <span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                  style={{ backgroundColor: "var(--primary)" }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User dropdown */}
      <NavDropdown />
    </header>
  );
}
