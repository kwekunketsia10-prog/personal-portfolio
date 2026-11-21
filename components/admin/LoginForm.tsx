"use client";

import { useActionState } from "react";
import { signIn, type AuthState } from "@/lib/actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(signIn, {} as AuthState);

  return (
    <form action={action} className="mt-8 space-y-5">
      <label className="block">
        <span className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Email</span>
        <input name="email" type="email" autoComplete="username" required className="mt-2 w-full border-b border-line bg-transparent py-3 outline-none" />
      </label>
      <label className="block">
        <span className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Password</span>
        <input name="password" type="password" autoComplete="current-password" required className="mt-2 w-full border-b border-line bg-transparent py-3 outline-none" />
      </label>
      {state.error ? <p className="text-sm text-lime">{state.error}</p> : null}
      <button disabled={pending} className="inline-flex min-h-12 items-center bg-lime px-5 text-sm font-semibold tracking-[0.14em] text-ink uppercase disabled:opacity-60">
        {pending ? "Signing in" : "Sign in"}
      </button>
    </form>
  );
}
