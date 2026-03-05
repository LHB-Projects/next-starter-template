import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { getSiteSettings } from "@/lib/siteSettings";

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

  const cssVars = {
    "--primary": settings.primary_color,
    "--primary-hover": settings.secondary_color,
    "--font": settings.font_style,
  } as React.CSSProperties;

  return (
    <html lang="en">
      <body className="relative min-h-screen" style={cssVars}>

        {/* Fixed navbar with logo in top-left */}
        <header className="fixed top-0 left-0 w-full z-50 flex items-center px-6 py-2 bg-white/80 backdrop-blur-sm border-b border-[#e8e2db]">
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
        </header>

        {/* Main content pushed below navbar */}
        <main className="flex justify-center items-start mt-[64px]">
          {children}
        </main>

      </body>
    </html>
  );
}
