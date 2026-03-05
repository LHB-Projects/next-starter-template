import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = session.user as { email?: string };

  const { data, error } = await supabase
    .from("Employee")
    .select("id, name, email, phone, position, department, start_date, avatar_url, role")
    .eq("email", user.email!)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = session.user as { email?: string };
  const body = await req.json() as {
    name?: string;
    phone?: string;
    position?: string;
    department?: string;
    start_date?: string;
    avatar_url?: string;
  };

  // Only allow updating safe fields
  const { name, phone, position, department, start_date, avatar_url } = body;

  const { error } = await supabase
    .from("Employee")
    .update({ name, phone, position, department, start_date, avatar_url })
    .eq("email", user.email!);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: "Profile updated" });
}
