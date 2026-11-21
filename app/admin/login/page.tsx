import Link from "next/link";
import { LoginForm } from "@/components/admin/LoginForm";
import { isSupabaseConfigured } from "@/lib/supabase/admin";

export const instant = false;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const connected = isSupabaseConfigured();

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-lg flex-col justify-center px-6">
      <p className="font-mono text-xs tracking-[0.18em] text-lime uppercase">Admin</p>
      <h1 className="mt-3 font-display text-5xl tracking-tight">Sign in</h1>
      <p className="mt-4 leading-relaxed text-muted">
        This admin belongs to the new portfolio Supabase project. The Girl&apos;s Closet and Nketsiaa projects are not used here.
      </p>
      {!connected ? (
        <p className="mt-6 border border-line bg-surface p-4 text-sm leading-relaxed">
          The new project is not connected yet. Create an empty Supabase project, add its URL and keys to <code>.env.local</code>, run the migration, then run <code>npm run seed</code>.
        </p>
      ) : null}
      {params.error === "forbidden" ? <p className="mt-4 text-sm text-lime">That account cannot open this admin.</p> : null}
      <LoginForm />
      <Link href="/" className="mt-8 text-sm text-muted hover:text-lime">
        Back to the site
      </Link>
    </main>
  );
}
