-- NandedSeva Database Schema
-- Run this entire file in your Supabase SQL Editor

-- ─────────────────────────────────────────────
-- LEADS TABLE
-- ─────────────────────────────────────────────
create table if not exists public.leads (
  id             uuid default gen_random_uuid() primary key,
  name           text not null,
  mobile         text not null,
  service        text not null,
  address        text not null,
  taluka         text,
  preferred_date date,
  message        text,
  status         text not null default 'New'
                   check (status in ('New','Contacted','Assigned','Completed','Cancelled')),
  language       text not null default 'en',
  created_at     timestamptz not null default now()
);

-- Add taluka column to existing installs (safe to re-run)
alter table public.leads add column if not exists taluka text;

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx     on public.leads (status);
create index if not exists leads_mobile_idx     on public.leads (mobile);

alter table public.leads enable row level security;

drop policy if exists "Anyone can insert a lead"                on public.leads;
drop policy if exists "Anon can insert a lead"                  on public.leads;
drop policy if exists "Anon can read leads"                     on public.leads;
drop policy if exists "Anon can update leads"                   on public.leads;
drop policy if exists "Authenticated users can read leads"      on public.leads;
drop policy if exists "Authenticated users can update leads"    on public.leads;

create policy "Anyone can insert a lead"
  on public.leads for insert to anon with check (true);

create policy "Anon can read leads"
  on public.leads for select to anon using (true);

create policy "Anon can update leads"
  on public.leads for update to anon using (true) with check (true);


-- ─────────────────────────────────────────────
-- SERVICES TABLE
-- ─────────────────────────────────────────────
create table if not exists public.services (
  id                     uuid default gen_random_uuid() primary key,
  name                   text not null,
  description            text,
  category               text check (category in ('home', 'travel')),
  price                  text,
  visit_charge           text,
  visit_charge_adjusted  boolean default true,
  icon                   text,
  is_active              boolean default true,
  sort_order             integer default 0,
  created_at             timestamptz default now(),
  updated_at             timestamptz default now()
);

alter table public.services enable row level security;

drop policy if exists "Anyone can read services"   on public.services;
drop policy if exists "Anyone can modify services"  on public.services;

create policy "Anyone can read services"
  on public.services for select using (true);

create policy "Anyone can modify services"
  on public.services for all using (true);


-- ─────────────────────────────────────────────
-- SEED SERVICES (skip if already seeded)
-- ─────────────────────────────────────────────
insert into public.services
  (name, description, category, price, visit_charge, visit_charge_adjusted, icon, sort_order)
select name, description, category, price, visit_charge, visit_charge_adjusted, icon, sort_order
from (values
  ('Electrician',              'Wiring, repairs, fuse box, switches & all electrical work',          'home',   '₹200 onwards',    '₹100',       true,  'zap',             1),
  ('AC Repair & Installation', 'AC servicing, gas refill, installation & repair for all brands',    'home',   '₹500 onwards',    '₹150',       true,  'wind',            2),
  ('Plumbing',                 'Pipe fitting, leakage repair, tap fixing & bathroom fittings',      'home',   '₹250 onwards',    '₹100',       true,  'droplets',        3),
  ('RO Water Filter Service',  'RO installation, filter replacement & water purifier repair',       'home',   '₹300 onwards',    '₹100',       true,  'filter',          4),
  ('Mistri Work',              'Brick work, cement, compound wall, renovation & construction',      'home',   '₹500 onwards',    '₹200',       true,  'hammer',          5),
  ('Painting',                 'Interior & exterior painting, texture work & waterproofing',        'home',   '₹8/sq ft onwards','Free visit', false, 'paintbrush',      6),
  ('Washing Machine Repair',   'All brands, semi & fully automatic washing machine repair',         'home',   '₹300 onwards',    '₹150',       true,  'washing-machine', 7),
  ('Driver for a Day',         'Hire a verified driver for your car for a full day',                'travel', '₹800/day',        null,         false, 'user',            8),
  ('Car Rental',               'Comfortable cars with experienced drivers for any occasion',        'travel', '₹1000 onwards',   null,         false, 'car',             9),
  ('Outstation Taxi Booking',  'Book a taxi for outstation travel from Nanded',                     'travel', '₹12/km onwards',  null,         false, 'navigation',      10),
  ('Airport Pickup & Drop',    'Timely pickup & drop to Hyderabad & other airports',                'travel', '₹1200 onwards',   null,         false, 'plane',           11),
  ('Nanded to Hyderabad Taxi', 'Comfortable & affordable taxi service to Hyderabad',                'travel', '₹3500 onwards',   null,         false, 'map-pin',         12),
  ('Nanded to Pune Taxi',      'Reliable taxi service from Nanded to Pune & return',                'travel', '₹3500 onwards',   null,         false, 'map-pin',         13)
) as v(name, description, category, price, visit_charge, visit_charge_adjusted, icon, sort_order)
where not exists (select 1 from public.services where public.services.name = v.name);
