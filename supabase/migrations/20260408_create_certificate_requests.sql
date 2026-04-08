create extension if not exists pgcrypto;

create table if not exists public.certificate_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  date_of_birth date not null,
  age integer not null check (age > 0),
  address text not null,
  admin_fields jsonb not null default '{}'::jsonb,
  pdf_url text,
  status text not null default 'pending' check (status in ('pending', 'in-progress', 'completed'))
);

create index if not exists certificate_requests_created_at_idx
  on public.certificate_requests (created_at desc);

alter table public.certificate_requests enable row level security;