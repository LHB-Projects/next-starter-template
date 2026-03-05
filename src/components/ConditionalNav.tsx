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

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-2 bg-white/80 backdrop-blur-sm border-b border-[#e8e2db]">
      <Link href="/dashboard">
        <Image
          src={settings.logo_url}
          alt={`${settings.site_title} Logo`}
          width={300}
          height={150}
          priority
          className="cursor-pointer w-auto h-20 object-contain"
        />
      </Link>
      <NavDropdown />
    </header>
  );
}
