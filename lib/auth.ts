import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireAdmin() {
  const supabase = await createClient();
  if (!supabase) redirect("/admin/login?error=setup");
  const { data } = await supabase.auth.getUser();
  const email = data.user?.email?.toLowerCase() ?? "";
  const allowed = process.env.ADMIN_EMAIL?.toLowerCase() ?? "";
  if (!email || !allowed || email !== allowed || !data.user) {
    if (data.user) await supabase.auth.signOut();
    redirect("/admin/login?error=forbidden");
  }
  return data.user;
}
