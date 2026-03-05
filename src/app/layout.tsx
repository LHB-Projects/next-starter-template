import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { getSiteSettings } from "@/lib/siteSettings";
import NavDropdown from "@/components/NavDropdown";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function generateMetadata() {
  const settings = await getSiteSettings();
  return {
    title: settings.site_title,
    description: settings.site_description,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  const session = await getServerSession(authOptions);
  const user = session?.user as { name?: string; email?: string; role?: string } | undefined;
  const isAdmin = user?.role === "admin";

  const cssVars = {
    "--primary": settings.primary_color,
    "--primary-hover": settings.secondary_color,
    "--font": settings.font_style,
  } as React.CSSProperties;

  return (
    <html lang="en">
      <body className="relative min-h-screen" style={cssVars}>

        {/* Fixed navbar */}
        <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-2 bg-white/80 backdrop-blur-sm border-b border-[#e8e2db]">
          <Link href="/dashboard">
            <Image
              src={settings.logo_url}
              alt={`${settings.site_title} Logo`}
              width={160}
              height={80}
              priority
              className="cursor-pointer w-auto h-12 object-contain"
            />
          </Link>

          {/* Right side nav */}
          {user && (
            <NavDropdown
              userName={user.name ?? ""}
              userEmail={user.email ?? ""}
              isAdmin={isAdmin}
            />
          )}
        </header>

        {/* Main content pushed below navbar */}
        <main className="flex justify-center items-start mt-[64px]">
          {children}
        </main>

      </body>
    </html>
  );
}
