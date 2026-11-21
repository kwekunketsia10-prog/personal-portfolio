import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-3xl flex-col justify-center px-6">
      <p className="font-mono text-[11px] tracking-[0.18em] text-lime uppercase">404</p>
      <h1 className="mt-3 font-display text-5xl leading-[0.95] tracking-tight">This page is not on the site.</h1>
      <Link href="/" className="mt-5 inline-flex w-fit rounded-full bg-lime px-5 py-3 text-sm font-semibold tracking-[0.12em] text-background uppercase">
        Back home
      </Link>
    </main>
  );
}
