import Link from "next/link";
import { markEnquiryRead } from "@/lib/actions";
import { createServiceClient } from "@/lib/supabase/admin";

type EnquiryRow = {
  id: string;
  full_name: string;
  email: string;
  business_name: string;
  website_type: string;
  budget: string;
  message: string;
  created_at: string;
  read_at: string | null;
  email_status: string;
};

export default async function InboxPage() {
  const service = createServiceClient();
  const result = service
    ? await service
        .from("enquiries")
        .select("id, full_name, email, business_name, website_type, budget, message, created_at, read_at, email_status")
        .order("created_at", { ascending: false })
    : { data: [], error: null };
  const enquiries = (result.data ?? []) as EnquiryRow[];

  return (
    <section>
      <h1 className="font-display text-5xl tracking-tight">Inbox</h1>
      <p className="mt-3 max-w-2xl text-muted">Enquiries saved from the contact form. Email status shows whether the notification was actually sent.</p>
      {!service ? <p className="mt-6 text-lime">The service role key is missing, so the inbox cannot be read yet.</p> : null}
      <div className="mt-10 space-y-6">
        {enquiries.length === 0 ? <p className="text-muted">No enquiries yet.</p> : null}
        {enquiries.map((enquiry) => (
          <article key={enquiry.id} className="border border-line bg-surface p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-2xl">{enquiry.full_name}</h2>
                <p className="text-muted">{enquiry.email}</p>
              </div>
              <p className="font-mono text-[11px] tracking-[0.14em] text-lime uppercase">
                Email {enquiry.email_status}
                {enquiry.read_at ? " · Read" : " · New"}
              </p>
            </div>
            <p className="mt-4 text-sm text-muted">
              {enquiry.website_type}
              {enquiry.business_name ? ` · ${enquiry.business_name}` : ""}
              {enquiry.budget ? ` · ${enquiry.budget}` : ""}
            </p>
            <p className="mt-4 leading-relaxed whitespace-pre-wrap">{enquiry.message}</p>
            <p className="mt-4 text-sm text-muted">{new Date(enquiry.created_at).toLocaleString()}</p>
            {!enquiry.read_at ? (
              <form action={markEnquiryRead} className="mt-4">
                <input type="hidden" name="id" value={enquiry.id} />
                <button className="text-sm text-lime">Mark as read</button>
              </form>
            ) : null}
          </article>
        ))}
      </div>
      <Link href="/admin/profile" className="mt-10 inline-block text-sm text-muted hover:text-lime">
        Edit profile
      </Link>
    </section>
  );
}
