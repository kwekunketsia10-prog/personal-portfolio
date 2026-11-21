import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { getSiteContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await getSiteContent();
  return {
    metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined,
    title: {
      default: profile.seoTitle,
      template: `%s · ${profile.name}`,
    },
    description: profile.seoDescription,
    openGraph: {
      title: profile.seoTitle,
      description: profile.seoDescription,
      type: "website",
    },
  };
}

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const { profile, projects } = await getSiteContent();
  return (
    <>
      <Suspense fallback={<div className="h-[4.5rem]" />}>
        <Navbar profile={profile} />
      </Suspense>
      <div id="content" className="bg-secondary">{children}</div>
      <Suspense>
        <Footer profile={profile} projects={projects} />
      </Suspense>
      <WhatsAppButton profile={profile} />
    </>
  );
}
