import "./globals.css";
import { getSiteSettings } from "@/lib/siteSettings";
import SessionProvider from "@/components/SessionProvider";
import ConditionalNav from "@/components/ConditionalNav";

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
        <SessionProvider>
          <ConditionalNav settings={{ logo_url: settings.logo_url, site_title: settings.site_title }} />
          <main>
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
