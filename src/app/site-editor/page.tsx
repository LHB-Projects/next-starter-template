"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type SiteSettings = {
  primary_color: string;
  secondary_color: string;
  site_title: string;
  site_description: string;
  logo_url: string;
  font_style: string;
};

const FONT_OPTIONS = [
  { label: "Georgia (Serif)", value: "Georgia, serif" },
  { label: "Playfair Display (Elegant)", value: "'Playfair Display', Georgia, serif" },
  { label: "Cormorant Garamond (Luxury)", value: "'Cormorant Garamond', Georgia, serif" },
  { label: "Helvetica (Modern Sans)", value: "Helvetica, Arial, sans-serif" },
  { label: "Garamond (Classic)", value: "Garamond, 'Times New Roman', serif" },
];

export default function SiteEditorPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<SiteSettings>({
    primary_color: "#A69B90",
    secondary_color: "#94897f",
    site_title: "J. Michael's Prime",
    site_description: "Steaks & Seafood",
    logo_url: "/logo.png",
    font_style: "Georgia, serif",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data: SiteSettings) => {
        setSettings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true);
    setError("");
    setSaved(false);

    const res = await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });

    const data = await res.json() as { error?: string };
    setSaving(false);

    if (!res.ok) {
      setError(data.error || "Failed to save settings");
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#A69B90] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f7]" style={{ fontFamily: settings.font_style }}>
      {/* Header */}
      <div className="border-b border-[#e8e2db] bg-white px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#2c2825] tracking-tight">Site Editor</h1>
          <p className="text-sm text-[#A69B90] mt-0.5">Customize the appearance of your employee hub</p>
        </div>
        <button
          onClick={() => router.push("/dashboard")}
          className="text-sm text-[#A69B90] hover:text-[#2c2825] transition-colors duration-200 flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Settings Panel */}
        <div className="space-y-6">

          {/* Branding */}
          <div className="bg-white rounded-xl border border-[#e8e2db] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#e8e2db]">
              <h2 className="text-sm font-semibold text-[#2c2825] uppercase tracking-widest">Branding</h2>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#A69B90] uppercase tracking-wider mb-2">
                  Site Title
                </label>
                <input
                  type="text"
                  value={settings.site_title}
                  onChange={(e) => setSettings({ ...settings, site_title: e.target.value })}
                  className="w-full border border-[#e8e2db] rounded-lg px-4 py-2.5 text-[#2c2825] text-sm focus:outline-none focus:ring-2 focus:ring-[#A69B90] focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#A69B90] uppercase tracking-wider mb-2">
                  Tagline
                </label>
                <input
                  type="text"
                  value={settings.site_description}
                  onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
                  className="w-full border border-[#e8e2db] rounded-lg px-4 py-2.5 text-[#2c2825] text-sm focus:outline-none focus:ring-2 focus:ring-[#A69B90] focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#A69B90] uppercase tracking-wider mb-2">
                  Logo URL
                </label>
                <input
                  type="text"
                  value={settings.logo_url}
                  onChange={(e) => setSettings({ ...settings, logo_url: e.target.value })}
                  className="w-full border border-[#e8e2db] rounded-lg px-4 py-2.5 text-[#2c2825] text-sm focus:outline-none focus:ring-2 focus:ring-[#A69B90] focus:border-transparent transition"
                  placeholder="/logo.png"
                />
              </div>
            </div>
          </div>

          {/* Colors */}
          <div className="bg-white rounded-xl border border-[#e8e2db] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#e8e2db]">
              <h2 className="text-sm font-semibold text-[#2c2825] uppercase tracking-widest">Colors</h2>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#A69B90] uppercase tracking-wider mb-2">
                  Primary Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={settings.primary_color}
                    onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
                    className="w-12 h-10 rounded-lg border border-[#e8e2db] cursor-pointer p-1"
                  />
                  <input
                    type="text"
                    value={settings.primary_color}
                    onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
                    className="flex-1 border border-[#e8e2db] rounded-lg px-4 py-2.5 text-[#2c2825] text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#A69B90] transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#A69B90] uppercase tracking-wider mb-2">
                  Secondary Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={settings.secondary_color}
                    onChange={(e) => setSettings({ ...settings, secondary_color: e.target.value })}
                    className="w-12 h-10 rounded-lg border border-[#e8e2db] cursor-pointer p-1"
                  />
                  <input
                    type="text"
                    value={settings.secondary_color}
                    onChange={(e) => setSettings({ ...settings, secondary_color: e.target.value })}
                    className="flex-1 border border-[#e8e2db] rounded-lg px-4 py-2.5 text-[#2c2825] text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#A69B90] transition"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div className="bg-white rounded-xl border border-[#e8e2db] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#e8e2db]">
              <h2 className="text-sm font-semibold text-[#2c2825] uppercase tracking-widest">Typography</h2>
            </div>
            <div className="px-6 py-5">
              <label className="block text-xs font-medium text-[#A69B90] uppercase tracking-wider mb-2">
                Font Style
              </label>
              <select
                value={settings.font_style}
                onChange={(e) => setSettings({ ...settings, font_style: e.target.value })}
                className="w-full border border-[#e8e2db] rounded-lg px-4 py-2.5 text-[#2c2825] text-sm focus:outline-none focus:ring-2 focus:ring-[#A69B90] transition bg-white"
              >
                {FONT_OPTIONS.map((f) => (
                  <option key={f.value} value={f.value} style={{ fontFamily: f.value }}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 py-3 rounded-xl text-white text-sm font-medium tracking-wide transition-all duration-200 disabled:opacity-50"
              style={{ backgroundColor: settings.primary_color }}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            {saved && (
              <span className="text-sm text-green-600 font-medium flex items-center gap-1.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Saved
              </span>
            )}
            {error && <span className="text-sm text-red-500">{error}</span>}
          </div>
        </div>

        {/* Live Preview */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-[#e8e2db] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#e8e2db] flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[#2c2825] uppercase tracking-widest">Live Preview</h2>
              <span className="text-xs text-[#A69B90] bg-[#faf9f7] px-2 py-1 rounded-full border border-[#e8e2db]">
                Updates as you type
              </span>
            </div>
            <div className="p-6">
              {/* Mock Login Card Preview */}
              <div
                className="rounded-xl shadow-lg p-6 border border-[#e8e2db]"
                style={{ fontFamily: settings.font_style, backgroundColor: "#fff" }}
              >
                <div className="text-center mb-5">
                  <div
                    className="text-xl font-semibold mb-1"
                    style={{ color: settings.primary_color }}
                  >
                    {settings.site_title || "Site Title"}
                  </div>
                  <div className="text-xs text-gray-400 uppercase tracking-widest">
                    {settings.site_description || "Tagline"}
                  </div>
                </div>

                <div className="space-y-3">
                  <div
                    className="w-full h-9 rounded-lg border text-sm px-3 flex items-center text-gray-300 text-xs"
                    style={{ borderColor: "#e8e2db" }}
                  >
                    Email address
                  </div>
                  <div
                    className="w-full h-9 rounded-lg border text-sm px-3 flex items-center text-gray-300 text-xs"
                    style={{ borderColor: "#e8e2db" }}
                  >
                    Password
                  </div>
                  <div
                    className="w-full h-9 rounded-lg flex items-center justify-center text-white text-xs font-medium"
                    style={{ backgroundColor: settings.primary_color }}
                  >
                    Sign In
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#e8e2db] flex items-center justify-between">
                  <span className="text-xs" style={{ color: settings.secondary_color }}>
                    Employee Portal
                  </span>
                  <span className="text-xs text-gray-300">Register →</span>
                </div>
              </div>

              {/* Color swatches */}
              <div className="mt-4 flex gap-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-full border border-[#e8e2db] shadow-sm"
                    style={{ backgroundColor: settings.primary_color }}
                  />
                  <span className="text-xs text-[#A69B90]">Primary</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-full border border-[#e8e2db] shadow-sm"
                    style={{ backgroundColor: settings.secondary_color }}
                  />
                  <span className="text-xs text-[#A69B90]">Secondary</span>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-xs text-[#A69B90]" style={{ fontFamily: settings.font_style }}>
                    Aa — {FONT_OPTIONS.find(f => f.value === settings.font_style)?.label.split(" ")[0] ?? "Font"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
