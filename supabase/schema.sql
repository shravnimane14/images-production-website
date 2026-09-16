create extension if not exists pgcrypto;

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(), name text not null, slug text unique not null,
  description text not null default '', cover_image text not null default '', display_order integer not null default 0,
  published boolean not null default false, created_at timestamptz not null default now()
);
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(), category_id uuid not null references public.categories(id) on delete cascade,
  project_name text not null, slug text not null, description text not null default '', cover_image text not null default '',
  event_date date, location text not null default '', featured boolean not null default false, published boolean not null default false,
  display_order integer not null default 0, created_at timestamptz not null default now(), unique(category_id, slug)
);
create table if not exists public.media (
  id uuid primary key default gen_random_uuid(), category_id uuid not null references public.categories(id) on delete cascade,
  project_id uuid not null references public.projects(id) on delete cascade, file_url text not null, storage_path text,
  thumbnail_url text, media_type text not null check (media_type in ('photo', 'video')), title text not null,
  description text not null default '', tags text[] not null default '{}', location text not null default '', date date,
  featured boolean not null default false, published boolean not null default false, display_order integer not null default 0,
  created_at timestamptz not null default now()
);
alter table public.categories enable row level security;
alter table public.projects enable row level security;
alter table public.media enable row level security;
create policy "published categories are public" on public.categories for select using (published);
create policy "published projects are public" on public.projects for select using (published);
create policy "published media are public" on public.media for select using (published);
create policy "authenticated users manage categories" on public.categories for all to authenticated using (true) with check (true);
create policy "authenticated users manage projects" on public.projects for all to authenticated using (true) with check (true);
create policy "authenticated users manage media" on public.media for all to authenticated using (true) with check (true);
insert into public.categories (name, slug, display_order, published) values
('Wedding','wedding',1,true), ('Pre-Wedding','pre-wedding',2,true), ('Engagement','engagement',3,true), ('Events','events',4,true),
('Reels','reels',5,true), ('Cinematography','cinematography',6,true), ('Video Editing','video-editing',7,true), ('Product / Brand Content','product-brand-content',8,true)
on conflict (slug) do nothing;
insert into storage.buckets (id, name, public) values ('media', 'media', true) on conflict (id) do nothing;
create policy "public media files are readable" on storage.objects for select using (bucket_id = 'media');
create policy "authenticated users upload media" on storage.objects for insert to authenticated with check (bucket_id = 'media');
create policy "authenticated users update media" on storage.objects for update to authenticated using (bucket_id = 'media');
create policy "authenticated users delete media" on storage.objects for delete to authenticated using (bucket_id = 'media');