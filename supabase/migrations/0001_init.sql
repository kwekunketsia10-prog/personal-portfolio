-- Portfolio backend. Apply this only to the new personal-portfolio Supabase project.
-- Do not run it against The Girl's Closet or Nketsiaa.

create extension if not exists pgcrypto;

create table public.site_profile (
  id uuid primary key,
  name text not null default '',
  title text not null default '',
  location text not null default '',
  email text not null default '',
  whatsapp text not null default '',
  linkedin_url text not null default '',
  github_url text not null default '',
  availability_label text not null default '',
  hero_label text not null default '',
  hero_heading text not null default '',
  hero_accent text not null default '',
  hero_body text not null default '',
  hero_support text not null default '',
  portrait_path text not null default '',
  journey_video_path text not null default '',
  journey_poster_path text not null default '',
  journey_captions_path text not null default '',
  journey_video_autoplay boolean not null default false,
  seo_title text not null default '',
  seo_description text not null default '',
  updated_at timestamptz not null default now()
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null default '',
  summary text not null default '',
  objective text not null default '',
  design_direction text not null default '',
  highlights text[] not null default '{}',
  features text[] not null default '{}',
  role text not null default '',
  learned text not null default '',
  live_url text not null default '',
  technologies text[] not null default '{}',
  host text not null default '',
  layout text not null default 'full',
  desktop_image text not null default '',
  mobile_image text not null default '',
  sort_order integer not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table public.story_scenes (
  id text primary key,
  sort_order integer not null,
  on_screen_text text not null default '',
  voice_over text not null default '',
  closing_headline text not null default '',
  cta_label text not null default ''
);

create table public.journey_stages (
  id text primary key,
  sort_order integer not null,
  number text not null,
  title text not null,
  body text not null
);

create table public.capabilities (
  id text primary key,
  sort_order integer not null,
  number text not null,
  title text not null,
  body text not null,
  icon text not null default 'Layers'
);

create table public.skill_groups (
  id text primary key,
  sort_order integer not null,
  title text not null
);

create table public.skills (
  id text primary key,
  group_id text not null references public.skill_groups (id) on delete cascade,
  sort_order integer not null,
  label text not null
);

create table public.process_steps (
  id text primary key,
  sort_order integer not null,
  number text not null,
  title text not null,
  body text not null
);

create table public.value_points (
  id text primary key,
  sort_order integer not null,
  title text not null,
  body text not null
);

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  business_name text not null default '',
  website_type text not null,
  budget text not null default '',
  message text not null,
  ip_hash text not null default '',
  created_at timestamptz not null default now(),
  read_at timestamptz,
  email_status text not null default 'skipped' check (email_status in ('sent', 'failed', 'skipped')),
  email_error text not null default ''
);

create index enquiries_created_at_idx on public.enquiries (created_at desc);
create index enquiries_ip_hash_idx on public.enquiries (ip_hash, created_at desc);

create table public.admin_allowlist (
  email text primary key
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_allowlist
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

alter table public.site_profile enable row level security;
alter table public.projects enable row level security;
alter table public.story_scenes enable row level security;
alter table public.journey_stages enable row level security;
alter table public.capabilities enable row level security;
alter table public.skill_groups enable row level security;
alter table public.skills enable row level security;
alter table public.process_steps enable row level security;
alter table public.value_points enable row level security;
alter table public.enquiries enable row level security;
alter table public.admin_allowlist enable row level security;

create policy "public read profile" on public.site_profile for select to anon, authenticated using (true);
create policy "admin write profile" on public.site_profile for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "public read projects" on public.projects for select to anon, authenticated using (published = true or public.is_admin());
create policy "admin write projects" on public.projects for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "public read story" on public.story_scenes for select to anon, authenticated using (true);
create policy "admin write story" on public.story_scenes for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "public read journey" on public.journey_stages for select to anon, authenticated using (true);
create policy "admin write journey" on public.journey_stages for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "public read capabilities" on public.capabilities for select to anon, authenticated using (true);
create policy "admin write capabilities" on public.capabilities for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "public read skill groups" on public.skill_groups for select to anon, authenticated using (true);
create policy "admin write skill groups" on public.skill_groups for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "public read skills" on public.skills for select to anon, authenticated using (true);
create policy "admin write skills" on public.skills for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "public read process" on public.process_steps for select to anon, authenticated using (true);
create policy "admin write process" on public.process_steps for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "public read values" on public.value_points for select to anon, authenticated using (true);
create policy "admin write values" on public.value_points for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "admin read enquiries" on public.enquiries for select to authenticated using (public.is_admin());
create policy "admin update enquiries" on public.enquiries for update to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "admin read allowlist" on public.admin_allowlist for select to authenticated using (public.is_admin());

grant usage on schema public to anon, authenticated;
grant select on public.site_profile, public.projects, public.story_scenes, public.journey_stages, public.capabilities, public.skill_groups, public.skills, public.process_steps, public.value_points to anon, authenticated;
grant insert, update, delete on public.site_profile, public.projects, public.story_scenes, public.journey_stages, public.capabilities, public.skill_groups, public.skills, public.process_steps, public.value_points to authenticated;
grant select, update on public.enquiries to authenticated;
grant select on public.admin_allowlist to authenticated;

insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true)
on conflict (id) do nothing;

create policy "public read portfolio media"
on storage.objects for select
to public
using (bucket_id = 'portfolio-media');

create policy "admin insert portfolio media"
on storage.objects for insert
to authenticated
with check (bucket_id = 'portfolio-media' and public.is_admin());

create policy "admin update portfolio media"
on storage.objects for update
to authenticated
using (bucket_id = 'portfolio-media' and public.is_admin())
with check (bucket_id = 'portfolio-media' and public.is_admin());

create policy "admin delete portfolio media"
on storage.objects for delete
to authenticated
using (bucket_id = 'portfolio-media' and public.is_admin());
