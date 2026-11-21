import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-3xl flex-col justify-center px-6">
      <p className="font-mono text-xs tracking-[0.2em] text-lime uppercase">404</p>
      <h1 className="mt-4 font-display text-6xl tracking-tight">This page is not on the site.</h1>
      <Link href="/" className="mt-8 inline-flex w-fit bg-lime px-5 py-3 text-sm font-semibold tracking-[0.14em] text-background uppercase">
        Back home
      </Link>
    </main>
  );
}
