-- Create admin_users table to track which auth users are admins
create table if not exists public.admin_users (
  id uuid not null default gen_random_uuid() primary key,
  auth_id uuid not null references auth.users(id) on delete cascade unique,
  email text not null unique,
  role text default 'admin' check (role in ('admin', 'super_admin')),
  created_at timestamp with time zone default now(),
  created_by_id uuid references auth.users(id),
  is_active boolean default true
);

-- Enable RLS
alter table public.admin_users enable row level security;

-- Policy: Authenticated users can view their own admin record
create policy "Users can view their own admin record"
  on public.admin_users for select
  using (auth.uid() = auth_id);

-- Policy: Only super_admins can view/manage all admin users
create policy "Super admins can manage admin users"
  on public.admin_users for all
  using (
    exists (
      select 1 from admin_users
      where auth_id = auth.uid() and role = 'super_admin'
    )
  );

-- Create index for faster lookups
create index if not exists admin_users_auth_id_idx on public.admin_users(auth_id);
create index if not exists admin_users_email_idx on public.admin_users(email);
