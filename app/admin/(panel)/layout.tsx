import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import { signOut } from "@/lib/actions";
import { requireAdmin } from "@/lib/auth";

export const instant = false;

const links = [
  { href: "/admin", label: "Inbox" },
  { href: "/admin/profile", label: "Profile" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/sections", label: "Sections" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<p className="p-10 text-muted">Opening the admin…</p>}>
      <AdminShell>{children}</AdminShell>
    </Suspense>
  );
}

async function AdminShell({ children }: { children: ReactNode }) {
  const user = await requireAdmin();
  return (
    <div className="min-h-svh bg-background">
      <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-5 py-8 lg:grid-cols-[220px_1fr] lg:px-10">
        <aside>
          <p className="font-mono text-[11px] tracking-[0.18em] text-lime uppercase">Portfolio admin</p>
          <p className="mt-3 text-sm text-muted">{user.email}</p>
          <nav className="mt-8 flex flex-col gap-3">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-lg hover:text-lime">
                {link.label}
              </Link>
            ))}
            <Link href="/" className="text-lg text-muted hover:text-lime">
              View site
            </Link>
          </nav>
          <form action={signOut} className="mt-8">
            <button className="text-sm text-muted hover:text-lime">Sign out</button>
          </form>
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
}
