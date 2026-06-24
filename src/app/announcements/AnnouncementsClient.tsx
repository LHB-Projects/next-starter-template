"use client";

import { useState } from "react";

type Announcement = {
  id: number;
  title: string;
  body: string;
  author_name: string;
  target_roles: string[];
  created_at: string;
};

const ALL_ROLES = ["employee", "admin", "manager"];

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" }) +
    " at " +
    d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

// ── Modal: view announcement ──────────────────────────────────────────────────

function ViewModal({
  announcement,
  isAdmin,
  onClose,
  onDelete,
}: {
  announcement: Announcement;
  isAdmin: boolean;
  onClose: () => void;
  onDelete: (id: number) => void;
}) {
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this announcement?")) return;
    setDeleting(true);
    await fetch(`/api/announcements?id=${announcement.id}`, { method: "DELETE" });
    onDelete(announcement.id);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(44,40,37,0.45)", backdropFilter: "blur(2px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
        style={{ boxShadow: "0 24px 64px rgba(44,40,37,0.18), 0 0 0 1px rgba(44,40,37,0.06)" }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-6 pt-5 pb-4 border-b border-[#f0ebe4]">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "color-mix(in srgb, var(--primary) 15%, white)", color: "var(--primary)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h2 className="text-base font-semibold flex-1" style={{ color: "var(--primary)", fontFamily: "var(--font)" }}>
            Announcement
          </h2>
          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#A69B90] hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  <path d="M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                </svg>
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-[#A69B90] hover:text-[#2c2825] hover:bg-[#f5f0eb] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Author row */}
        <div className="flex items-center gap-3 px-6 pt-4">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold text-white flex-shrink-0"
            style={{ backgroundColor: "var(--primary)" }}
          >
            {initials(announcement.author_name)}
          </div>
          <div>
            <p className="text-sm font-semibold text-[#2c2825]" style={{ fontFamily: "var(--font)" }}>
              {announcement.author_name}
            </p>
            <p className="text-xs text-[#A69B90]">{formatDate(announcement.created_at)}</p>
          </div>
        </div>

        {/* Recipients */}
        <div className="px-6 pt-3 pb-2">
          <p className="text-[10px] uppercase tracking-widest text-[#C4B8B0] mb-1.5">Recipients</p>
          <div className="flex flex-wrap gap-1.5">
            {announcement.target_roles.length === 0 ? (
              <span className="text-xs px-2.5 py-1 rounded-md font-medium text-[#2c2825]"
                style={{ backgroundColor: "color-mix(in srgb, var(--primary) 12%, white)" }}>
                Everyone
              </span>
            ) : (
              announcement.target_roles.map((r) => (
                <span key={r} className="text-xs px-2.5 py-1 rounded-md font-medium capitalize text-[#2c2825]"
                  style={{ backgroundColor: "color-mix(in srgb, var(--primary) 12%, white)" }}>
                  {r}
                </span>
              ))
            )}
          </div>
        </div>

        <div className="mx-6 border-t border-[#f0ebe4] my-3" />

        {/* Body */}
        <div className="px-6 pb-2">
          <h3 className="text-lg font-semibold text-[#2c2825] mb-2" style={{ fontFamily: "var(--font)" }}>
            {announcement.title}
          </h3>
          <p className="text-sm text-[#5a524c] leading-relaxed whitespace-pre-wrap">
            {announcement.body}
          </p>
        </div>

        <div className="mx-6 border-t border-[#f0ebe4] mt-4 mb-4" />

        {/* Footer */}
        <div className="px-6 pb-5">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-lg border border-[#e8e2db] text-sm font-medium text-[#A69B90] hover:text-[#2c2825] hover:border-[#C4B8B0] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Modal: compose announcement ───────────────────────────────────────────────

function ComposeModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: (a: Announcement) => void;
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function toggleRole(role: string) {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setError("Title and message are required.");
      return;
    }
    setSubmitting(true);
    setError("");

    const res = await fetch("/api/announcements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body, target_roles: selectedRoles }),
    });

    const data = await res.json() as Announcement & { error?: string };
    setSubmitting(false);

    if (!res.ok) {
      setError(data.error ?? "Failed to post announcement.");
    } else {
      onCreated(data);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(44,40,37,0.45)", backdropFilter: "blur(2px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
        style={{ boxShadow: "0 24px 64px rgba(44,40,37,0.18), 0 0 0 1px rgba(44,40,37,0.06)" }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-6 pt-5 pb-4 border-b border-[#f0ebe4]">
          <h2 className="text-base font-semibold flex-1 text-[#2c2825]" style={{ fontFamily: "var(--font)" }}>
            Post Announcement
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[#A69B90] hover:text-[#2c2825] hover:bg-[#f5f0eb] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-[#A69B90] uppercase tracking-wider mb-1.5">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Announcement title"
              className="w-full border border-[#e8e2db] rounded-lg px-4 py-2.5 text-[#2c2825] text-sm focus:outline-none focus:ring-2 transition"
              style={{ ["--tw-ring-color" as string]: "var(--primary)" }}
            />
          </div>

          {/* Recipients */}
          <div>
            <label className="block text-xs font-medium text-[#A69B90] uppercase tracking-wider mb-1.5">
              Recipients
            </label>
            <div className="flex flex-wrap gap-2">
              {ALL_ROLES.map((role) => {
                const selected = selectedRoles.includes(role);
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => toggleRole(role)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium capitalize border transition-all"
                    style={
                      selected
                        ? { backgroundColor: "var(--primary)", color: "white", borderColor: "var(--primary)" }
                        : { backgroundColor: "white", color: "#A69B90", borderColor: "#e8e2db" }
                    }
                  >
                    {role}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => setSelectedRoles([])}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all"
                style={
                  selectedRoles.length === 0
                    ? { backgroundColor: "var(--primary)", color: "white", borderColor: "var(--primary)" }
                    : { backgroundColor: "white", color: "#A69B90", borderColor: "#e8e2db" }
                }
              >
                Everyone
              </button>
            </div>
            <p className="text-[11px] text-[#C4B8B0] mt-1.5">
              {selectedRoles.length === 0
                ? "All employees will see this."
                : `Only ${selectedRoles.join(", ")} will see this.`}
            </p>
          </div>

          {/* Body */}
          <div>
            <label className="block text-xs font-medium text-[#A69B90] uppercase tracking-wider mb-1.5">
              Message
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your announcement here..."
              rows={5}
              className="w-full border border-[#e8e2db] rounded-lg px-4 py-2.5 text-[#2c2825] text-sm focus:outline-none focus:ring-2 transition resize-none"
              style={{ ["--tw-ring-color" as string]: "var(--primary)" }}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg border border-[#e8e2db] text-sm font-medium text-[#A69B90] hover:text-[#2c2825] hover:border-[#C4B8B0] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-2.5 rounded-lg text-white text-sm font-medium transition-all disabled:opacity-50"
              style={{ backgroundColor: "var(--primary)" }}
            >
              {submitting ? "Posting..." : "Post Announcement"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main list ─────────────────────────────────────────────────────────────────

export default function AnnouncementsClient({
  initialAnnouncements,
  isAdmin,
}: {
  initialAnnouncements: Announcement[];
  isAdmin: boolean;
}) {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [selected, setSelected] = useState<Announcement | null>(null);
  const [composing, setComposing] = useState(false);

  function handleCreated(a: Announcement) {
    setAnnouncements((prev) => [a, ...prev]);
    setComposing(false);
    setSelected(a);
  }

  function handleDelete(id: number) {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    setSelected(null);
  }

  return (
    <>
      {/* Page header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#C4B8B0] mb-1">Company</p>
          <h1 className="text-3xl font-semibold text-[#2c2825]" style={{ fontFamily: "var(--font)" }}>
            Announcements
          </h1>
          <p className="text-sm text-[#A69B90] mt-1">
            {announcements.length} {announcements.length === 1 ? "announcement" : "announcements"}
          </p>
        </div>
        {isAdmin && (
          <button
            onClick={() => setComposing(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-medium transition-all hover:opacity-90"
            style={{ backgroundColor: "var(--primary)" }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Post Announcement
          </button>
        )}
      </div>

      {/* List */}
      {announcements.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{ backgroundColor: "color-mix(in srgb, var(--primary) 10%, white)" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--primary)" }}>
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </div>
          <p className="text-[#2c2825] font-medium mb-1">No announcements yet</p>
          <p className="text-sm text-[#A69B90]">
            {isAdmin ? "Post your first announcement above." : "Check back soon."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#e8e2db] overflow-hidden">
          {announcements.map((a, i) => (
            <button
              key={a.id}
              onClick={() => setSelected(a)}
              className="w-full text-left flex items-center gap-4 px-6 py-4 hover:bg-[#faf9f7] transition-colors group"
              style={{ borderBottom: i < announcements.length - 1 ? "1px solid #f0ebe4" : "none" }}
            >
              {/* Author avatar */}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold text-white flex-shrink-0"
                style={{ backgroundColor: "var(--primary)" }}
              >
                {initials(a.author_name)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#2c2825] truncate group-hover:text-[color:var(--primary)] transition-colors" style={{ fontFamily: "var(--font)" }}>
                  {a.title}
                </p>
                <p className="text-xs text-[#A69B90] truncate mt-0.5">{a.author_name}</p>
              </div>

              {/* Meta */}
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <p className="text-xs text-[#C4B8B0]">{formatDate(a.created_at)}</p>
                {a.target_roles.length > 0 && (
                  <div className="flex gap-1">
                    {a.target_roles.map((r) => (
                      <span key={r} className="text-[10px] px-1.5 py-0.5 rounded-md capitalize font-medium text-[#A69B90] border border-[#e8e2db]">
                        {r}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#C4B8B0] flex-shrink-0">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          ))}
        </div>
      )}

      {/* Modals */}
      {selected && (
        <ViewModal
          announcement={selected}
          isAdmin={isAdmin}
          onClose={() => setSelected(null)}
          onDelete={handleDelete}
        />
      )}
      {composing && (
        <ComposeModal onClose={() => setComposing(false)} onCreated={handleCreated} />
      )}
    </>
  );
}
