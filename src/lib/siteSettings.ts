import { supabase } from "./supabase";

export type SiteSettings = {
  id: number;
  primary_color: string;
  secondary_color: string;
  site_title: string;
  site_description: string;
  logo_url: string;
  font_style: string;
  updated_at: string;
};

export const defaultSettings: SiteSettings = {
  id: 1,
  primary_color: "#A69B90",
  secondary_color: "#94897f",
  site_title: "J. Michael's Prime",
  site_description: "Steaks & Seafood",
  logo_url: "/logo.png",
  font_style: "Georgia, serif",
  updated_at: new Date().toISOString(),
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const { data, error } = await supabase
    .from("SiteSettings")
    .select("*")
    .eq("id", 1)
    .single();

  if (error || !data) return defaultSettings;
  return data as SiteSettings;
}

export async function updateSiteSettings(
  settings: Partial<Omit<SiteSettings, "id" | "updated_at">>
): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from("SiteSettings")
    .update({ ...settings, updated_at: new Date().toISOString() })
    .eq("id", 1);

  return { error: error ? error.message : null };
}
