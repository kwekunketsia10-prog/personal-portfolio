import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { enquirySchema } from "@/lib/validators";
import { createServiceClient, isServiceConfigured } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  if (!isServiceConfigured()) {
    return NextResponse.json(
      { ok: false, error: "The enquiry service is not connected yet. Add the new Supabase project keys to continue." },
      { status: 503 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "The form could not be read." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(json);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "");
      if (key && !fields[key]) fields[key] = issue.message;
    }
    return NextResponse.json({ ok: false, error: "Check the highlighted fields.", fields }, { status: 400 });
  }

  const supabase = createServiceClient();
  if (!supabase) {
    return NextResponse.json({ ok: false, error: "The enquiry service is not connected yet." }, { status: 503 });
  }

  const forwarded = request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? "local";
  const ip = forwarded.split(",")[0]?.trim() || "local";
  const ipHash = createHash("sha256").update(`${ip}:portfolio-enquiry`).digest("hex");
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const recent = await supabase
    .from("enquiries")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", since);

  if ((recent.count ?? 0) >= 5) {
    return NextResponse.json(
      { ok: false, error: "Too many enquiries were sent from this connection. Please try again in an hour." },
      { status: 429 },
    );
  }

  const input = parsed.data;
  const inserted = await supabase
    .from("enquiries")
    .insert({
      full_name: input.fullName,
      email: input.email,
      business_name: input.businessName ?? "",
      website_type: input.websiteType,
      budget: input.budget ?? "",
      message: input.message,
      ip_hash: ipHash,
      email_status: "skipped",
    })
    .select("id")
    .single();

  if (inserted.error || !inserted.data) {
    return NextResponse.json({ ok: false, error: "The enquiry could not be saved." }, { status: 500 });
  }

  let emailStatus: "sent" | "failed" | "skipped" = "skipped";
  let emailError = "";
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  const from = process.env.ENQUIRY_FROM_EMAIL;

  if (apiKey && to && from) {
    try {
      const resend = new Resend(apiKey);
      const sent = await resend.emails.send({
        from,
        to,
        replyTo: input.email,
        subject: `New project enquiry from ${input.fullName}`,
        text: [
          `${input.fullName} sent a project enquiry.`,
          `Email: ${input.email}`,
          `Business: ${input.businessName || "Not provided"}`,
          `Website type: ${input.websiteType}`,
          `Budget: ${input.budget || "Not provided"}`,
          "",
          input.message,
        ].join("\n"),
      });
      if (sent.error) {
        emailStatus = "failed";
        emailError = sent.error.message;
      } else {
        emailStatus = "sent";
      }
    } catch (error) {
      emailStatus = "failed";
      emailError = error instanceof Error ? error.message : "Email could not be sent.";
    }
  }

  await supabase.from("enquiries").update({ email_status: emailStatus, email_error: emailError }).eq("id", inserted.data.id);

  return NextResponse.json({ ok: true, email: emailStatus });
}
