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
      className="fixed top-0 left-0 w-full z-50 flex items-center"
      style={{
        height: "56px",
        backgroundColor: "var(--primary)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      }}
    >
      {/* Logo — flush left, fills the bar height */}
      <Link
        href="/dashboard"
        className="flex items-center justify-center px-4 h-full flex-shrink-0 border-r"
        style={{ borderColor: "rgba(255,255,255,0.15)" }}
      >
        <Image
          src={settings.logo_url}
          alt={settings.site_title}
          width={120}
          height={48}
          priority
          className="w-auto object-contain brightness-0 invert"
          style={{ height: "34px" }}
        />
      </Link>

      {/* Nav links */}
      <nav className="hidden sm:flex items-center h-full ml-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="relative flex items-center h-full px-4 text-sm font-medium transition-all duration-150"
              style={{
                fontFamily: "var(--font)",
                color: isActive ? "#ffffff" : "rgba(255,255,255,0.75)",
                backgroundColor: isActive ? "rgba(0,0,0,0.15)" : "transparent",
              }}
              onMouseEnter={(e) => {
                if (!isActive)
                  (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(0,0,0,0.1)";
                (e.currentTarget as HTMLElement).style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)";
                }
              }}
            >
              {link.label}
              {isActive && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* User dropdown */}
      <div className="pr-4">
        <NavDropdown />
      </div>
    </header>
  );
}
