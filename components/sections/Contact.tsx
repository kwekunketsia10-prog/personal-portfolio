"use client";

import { useState } from "react";
import { websiteTypes } from "@/data/navigation";
import type { Profile } from "@/lib/types";
import { SocialLinks } from "@/components/ui/SocialLinks";

type FieldErrors = Partial<Record<"fullName" | "email" | "websiteType" | "message", string>>;

export function Contact({ profile }: { profile: Profile }) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      fullName: String(data.get("fullName") ?? ""),
      email: String(data.get("email") ?? ""),
      businessName: String(data.get("businessName") ?? ""),
      websiteType: String(data.get("websiteType") ?? ""),
      budget: String(data.get("budget") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    const nextErrors: FieldErrors = {};
    if (payload.fullName.trim().length < 2) nextErrors.fullName = "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())) nextErrors.email = "Enter a valid email address.";
    if (!payload.websiteType) nextErrors.websiteType = "Choose the type of website you need.";
    if (payload.message.trim().length < 20) nextErrors.message = "Tell me a little more about the project, at least a sentence or two.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus("submitting");
    setMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await response.json()) as { ok?: boolean; error?: string; fields?: FieldErrors };
      if (!response.ok || !body.ok) {
        setStatus("error");
        setErrors(body.fields ?? {});
        setMessage(body.error || "The enquiry could not be saved.");
        return;
      }
      setStatus("success");
      setMessage("Your enquiry has been received. I'll read it from the project inbox.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("The enquiry could not be sent. Please try again in a moment.");
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto grid w-full max-w-[1440px] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-5">
          <h2 className="font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.94] tracking-[-0.045em]">
            Have a project in mind?
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Tell me a little about your business or idea. I&apos;d love to hear what you&apos;re planning.
          </p>
          <div className="mt-8 space-y-3 text-ink">
            {profile.email ? <p><a className="hover:text-lime" href={`mailto:${profile.email}`}>{profile.email}</a></p> : <p className="text-muted">Email: add yours in the admin.</p>}
            {profile.whatsapp ? <p>WhatsApp: {profile.whatsapp}</p> : null}
            {profile.location ? <p className="text-muted">{profile.location}</p> : null}
          </div>
          <SocialLinks profile={profile} className="mt-8" />
        </div>

        <form onSubmit={onSubmit} noValidate className="border border-line bg-surface p-6 sm:p-8 lg:col-span-7">
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Full name" name="fullName" error={errors.fullName} autoComplete="name" />
            <Field label="Email address" name="email" type="email" error={errors.email} autoComplete="email" />
            <Field label="Business name" name="businessName" optional autoComplete="organization" />
            <label className="block">
              <span className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Type of website needed</span>
              <select name="websiteType" defaultValue="" className="mt-3 w-full border-b border-line bg-transparent py-3 text-ink outline-none">
                <option value="" disabled>Select one</option>
                {websiteTypes.map((type) => (
                  <option key={type} value={type} className="bg-background">{type}</option>
                ))}
              </select>
              {errors.websiteType ? <span className="mt-2 block text-sm text-lime">{errors.websiteType}</span> : null}
            </label>
            <Field label="Project budget" name="budget" optional className="sm:col-span-2" />
            <label className="block sm:col-span-2">
              <span className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Message</span>
              <textarea name="message" rows={6} className="mt-3 w-full resize-y border-b border-line bg-transparent py-3 text-ink outline-none" />
              {errors.message ? <span className="mt-2 block text-sm text-lime">{errors.message}</span> : null}
            </label>
          </div>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-8 inline-flex min-h-12 items-center bg-lime px-6 text-[0.78rem] font-semibold tracking-[0.16em] text-background uppercase hover:bg-ink disabled:opacity-60"
          >
            {status === "submitting" ? "Sending" : "Send project enquiry"}
          </button>
          {message ? (
            <p className={`mt-4 text-sm ${status === "success" ? "text-ink" : "text-lime"}`} role="status">
              {message}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  optional = false,
  error,
  autoComplete,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  optional?: boolean;
  error?: string;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
        {label}
        {optional ? " (optional)" : ""}
      </span>
      <input name={name} type={type} autoComplete={autoComplete} className="mt-3 w-full border-b border-line bg-transparent py-3 text-ink outline-none" />
      {error ? <span className="mt-2 block text-sm text-lime">{error}</span> : null}
    </label>
  );
}
