import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userRole = (session.user as { role?: string }).role ?? "employee";

  const { data, error } = await supabase
    .from("Announcement")
    .select("id, title, body, author_name, target_roles, created_at")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Show announcement if target_roles is empty (all) or includes user's role
  const filtered = (data ?? []).filter(
    (a: { target_roles: string[] }) =>
      a.target_roles.length === 0 || a.target_roles.includes(userRole)
  );

  return NextResponse.json(filtered);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userRole = (session.user as { role?: string }).role ?? "employee";
  if (userRole !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json() as { title?: string; body?: string; target_roles?: string[] };
  const { title, body: text, target_roles } = body;

  if (!title?.trim() || !text?.trim()) {
    return NextResponse.json({ error: "Title and body are required" }, { status: 400 });
  }

  const authorName = session.user?.name ?? "Admin";

  const { data, error } = await supabase
    .from("Announcement")
    .insert({
      title: title.trim(),
      body: text.trim(),
      author_name: authorName,
      target_roles: target_roles ?? [],
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userRole = (session.user as { role?: string }).role ?? "employee";
  if (userRole !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const { error } = await supabase.from("Announcement").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
