"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

type Profile = {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  start_date: string;
  avatar_url: string;
  role: string;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/profile", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: unknown) => {
        setProfile(data as Profile);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => setAvatarPreview(ev.target?.result as string);
    reader.readAsDataURL(file);

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/profile/avatar", {
      method: "POST",
      body: formData,
    });

    const data = await res.json() as { avatar_url?: string; error?: string };
    setUploading(false);

    if (!res.ok) {
      setError(data.error ?? "Upload failed");
      setAvatarPreview(null);
    } else if (data.avatar_url) {
      const updated = await fetch("/api/profile", { cache: "no-store" });
      const updatedProfile = await updated.json() as Profile;
      setProfile(updatedProfile);
      setAvatarPreview(null);
    }
  }

  async function handleSave() {
    if (!profile) return;
    setSaving(true);
    setError("");
    setSaved(false);

    const res = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: profile.name,
        phone: profile.phone,
        position: profile.position,
        department: profile.department,
        start_date: profile.start_date,
      }),
    });

    const data = await res.json() as { error?: string };
    setSaving(false);

    if (!res.ok) {
      setError(data.error ?? "Failed to save");
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  }

  const avatarSrc = avatarPreview ?? profile?.avatar_url ?? null;
  const initials = profile?.name
    ? profile.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "var(--primary)", borderTopColor: "transparent" }} />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#A69B90]">Could not load profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f7] w-full px-6 py-10 max-w-3xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest text-[#C4B8B0] mb-1">Account</p>
        <h1 className="text-3xl font-semibold text-[#2c2825]" style={{ fontFamily: "var(--font)" }}>
          My Profile
        </h1>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl border border-[#e8e2db] overflow-hidden mb-6">
        <div className="px-6 pb-6">
          <div className="flex items-center gap-4 mt-6 mb-4">

            {/* Avatar */}
            <div className="relative group">
              <div
                className="w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden flex items-center justify-center text-white text-2xl font-semibold cursor-pointer"
                style={{ backgroundColor: "var(--primary)" }}
                onClick={() => fileInputRef.current?.click()}
              >
                {avatarSrc ? (
                  <Image
                    src={avatarSrc}
                    alt="Profile"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  initials
                )}
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {uploading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                    </svg>
                  )}
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#2c2825]">{profile.name}</h2>
              <p className="text-sm text-[#A69B90]">{profile.position || "No position set"}</p>
            </div>

            <div className="ml-auto">
              <span
                className="text-xs font-medium px-3 py-1 rounded-full capitalize"
                style={{
                  backgroundColor: "color-mix(in srgb, var(--primary) 12%, white)",
                  color: "var(--primary)",
                }}
              >
                {profile.role}
              </span>
            </div>
          </div>

          {/* Info pills */}
          <div className="flex flex-wrap gap-3">
            {profile.email && (
              <div className="flex items-center gap-1.5 text-xs text-[#A69B90]">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                {profile.email}
              </div>
            )}
            {profile.department && (
              <div className="flex items-center gap-1.5 text-xs text-[#A69B90]">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
                {profile.department}
              </div>
            )}
            {profile.start_date && (
              <div className="flex items-center gap-1.5 text-xs text-[#A69B90]">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                Since {new Date(profile.start_date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <div className="bg-white rounded-xl border border-[#e8e2db] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#e8e2db]">
          <h3 className="text-sm font-semibold text-[#2c2825] uppercase tracking-widest">Edit Information</h3>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#A69B90] uppercase tracking-wider mb-2">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full border border-[#e8e2db] rounded-lg px-4 py-2.5 text-[#2c2825] text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)] transition"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#A69B90] uppercase tracking-wider mb-2">Phone</label>
              <input
                type="tel"
                value={profile.phone ?? ""}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                placeholder="(555) 000-0000"
                className="w-full border border-[#e8e2db] rounded-lg px-4 py-2.5 text-[#2c2825] text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)] transition"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#A69B90] uppercase tracking-wider mb-2">Position</label>
              <input
                type="text"
                value={profile.position ?? ""}
                onChange={(e) => setProfile({ ...profile, position: e.target.value })}
                placeholder="e.g. Server, Chef, Host"
                className="w-full border border-[#e8e2db] rounded-lg px-4 py-2.5 text-[#2c2825] text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)] transition"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#A69B90] uppercase tracking-wider mb-2">Department</label>
              <input
                type="text"
                value={profile.department ?? ""}
                onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                placeholder="e.g. Front of House, Kitchen"
                className="w-full border border-[#e8e2db] rounded-lg px-4 py-2.5 text-[#2c2825] text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)] transition"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#A69B90] uppercase tracking-wider mb-2">Start Date</label>
              <input
                type="date"
                value={profile.start_date ?? ""}
                onChange={(e) => setProfile({ ...profile, start_date: e.target.value })}
                className="w-full border border-[#e8e2db] rounded-lg px-4 py-2.5 text-[#2c2825] text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)] transition"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#A69B90] uppercase tracking-wider mb-2">Email</label>
              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full border border-[#e8e2db] rounded-lg px-4 py-2.5 text-[#A69B90] text-sm bg-[#faf9f7] cursor-not-allowed"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2.5 rounded-lg text-white text-sm font-medium transition-all duration-200 disabled:opacity-50"
              style={{ backgroundColor: "var(--primary)" }}
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
          </div>
        </div>
      </div>

      <p className="text-xs text-[#C4B8B0] text-center mt-6">
        Click your profile picture to upload a new one. Max 5MB.
      </p>
    </div>
  );
}
