create table if not exists categories (
  id text primary key,
  name text not null,
  slug text not null unique,
  description text,
  type text not null,
  icon text,
  color text,
  is_active boolean default true,
  "order" integer default 0
);

create table if not exists stores (
  id text primary key,
  name text not null,
  slug text not null unique,
  short_description text,
  full_description text,
  main_category text,
  secondary_categories text,
  city text,
  country text default 'Paraguai',
  address text,
  latitude double precision,
  longitude double precision,
  google_maps_url text,
  instagram_url text,
  facebook_url text,
  website_url text,
  whatsapp text,
  phone text,
  opening_hours text,
  payment_methods text,
  parking_info text,
  has_air_conditioning boolean,
  has_restroom boolean,
  sells_wholesale boolean default false,
  ships_to_brazil boolean default false,
  warranty_info text,
  recommended_products text,
  brands text,
  tags text,
  frontier_score numeric(3,1),
  price_score numeric(3,1),
  trust_score numeric(3,1),
  variety_score numeric(3,1),
  service_score numeric(3,1),
  warranty_score numeric(3,1),
  location_score numeric(3,1),
  parking_score numeric(3,1),
  wholesale_score numeric(3,1),
  review_summary text,
  frontier_note text,
  is_featured boolean default false,
  is_partner boolean default false,
  is_premium boolean default false,
  status text default 'draft',
  last_verified_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists guides (
  id text primary key,
  title text not null,
  slug text not null unique,
  category text,
  summary text,
  content text,
  cover_image text,
  is_premium boolean default false,
  status text default 'draft',
  accent text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists suppliers (
  id text primary key,
  name text not null,
  slug text not null unique,
  segment text,
  description text,
  city text,
  country text default 'Paraguai',
  address text,
  latitude double precision,
  longitude double precision,
  google_maps_url text,
  instagram_url text,
  facebook_url text,
  website_url text,
  whatsapp text,
  phone text,
  minimum_order text,
  sells_wholesale boolean default false,
  ships_to_brazil boolean default false,
  payment_methods text,
  product_categories text,
  brands text,
  frontier_note text,
  frontier_score numeric(3,1),
  is_premium boolean default false,
  status text default 'draft',
  last_verified_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists restaurants (
  id text primary key,
  name text not null,
  slug text not null unique,
  cuisine_type text,
  description text,
  city text,
  country text default 'Paraguai',
  address text,
  latitude double precision,
  longitude double precision,
  google_maps_url text,
  instagram_url text,
  website_url text,
  whatsapp text,
  phone text,
  opening_hours text,
  price_range text,
  best_for text,
  parking_info text,
  frontier_score numeric(3,1),
  frontier_note text,
  status text default 'draft',
  last_verified_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists hotels (
  id text primary key,
  name text not null,
  slug text not null unique,
  description text,
  city text,
  country text default 'Paraguai',
  address text,
  latitude double precision,
  longitude double precision,
  google_maps_url text,
  instagram_url text,
  website_url text,
  whatsapp text,
  phone text,
  price_range text,
  distance_to_microcentro text,
  amenities text,
  parking_info text,
  frontier_score numeric(3,1),
  frontier_note text,
  status text default 'draft',
  last_verified_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists exchange_houses (
  id text primary key,
  name text not null,
  slug text not null unique,
  description text,
  city text,
  country text default 'Paraguai',
  address text,
  latitude double precision,
  longitude double precision,
  google_maps_url text,
  instagram_url text,
  website_url text,
  whatsapp text,
  phone text,
  opening_hours text,
  locations text,
  frontier_score numeric(3,1),
  frontier_note text,
  status text default 'draft',
  last_verified_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists parking (
  id text primary key,
  name text not null,
  slug text not null unique,
  description text,
  city text,
  country text default 'Paraguai',
  address text,
  latitude double precision,
  longitude double precision,
  google_maps_url text,
  whatsapp text,
  phone text,
  opening_hours text,
  price_range text,
  security_level text,
  covered boolean,
  frontier_score numeric(3,1),
  frontier_note text,
  status text default 'draft',
  last_verified_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists collections (
  id text primary key,
  title text not null,
  slug text not null unique,
  description text,
  objective text,
  icon text,
  cover_image text,
  is_premium boolean default false,
  status text default 'draft',
  "order" integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  full_name text,
  role text not null default 'FREE' check (role in ('FREE', 'PRO', 'BUSINESS')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists subscription_webhook_events (
  id bigint generated always as identity primary key,
  provider text not null,
  event_name text,
  event_status text,
  customer_email text,
  matched_role text check (matched_role in ('PRO', 'BUSINESS')),
  external_order_id text,
  external_transaction_id text,
  processing_status text not null,
  error_message text,
  payload jsonb not null,
  created_at timestamptz default now(),
  processed_at timestamptz
);

create index if not exists stores_status_idx on stores (status);
create index if not exists stores_slug_idx on stores (slug);
create index if not exists suppliers_status_idx on suppliers (status);
create index if not exists guides_status_idx on guides (status);
create index if not exists categories_slug_idx on categories (slug);
create index if not exists restaurants_status_idx on restaurants (status);
create index if not exists hotels_status_idx on hotels (status);
create index if not exists exchange_houses_status_idx on exchange_houses (status);
create index if not exists parking_status_idx on parking (status);
create index if not exists collections_status_idx on collections (status);
create index if not exists profiles_role_idx on profiles (role);
create index if not exists subscription_webhook_events_provider_idx on subscription_webhook_events (provider);
create index if not exists subscription_webhook_events_customer_email_idx on subscription_webhook_events (customer_email);
create index if not exists subscription_webhook_events_processing_status_idx on subscription_webhook_events (processing_status);

alter table categories enable row level security;
alter table stores enable row level security;
alter table guides enable row level security;
alter table suppliers enable row level security;
alter table restaurants enable row level security;
alter table hotels enable row level security;
alter table exchange_houses enable row level security;
alter table parking enable row level security;
alter table collections enable row level security;
alter table profiles enable row level security;
alter table subscription_webhook_events enable row level security;

drop policy if exists "Public can read active categories" on categories;
create policy "Public can read active categories"
on categories
for select
to anon, authenticated
using (is_active = true);

drop policy if exists "Public can read visible stores" on stores;
create policy "Public can read visible stores"
on stores
for select
to anon, authenticated
using (status in ('active', 'review'));

drop policy if exists "Public can read visible guides" on guides;
create policy "Public can read visible guides"
on guides
for select
to anon, authenticated
using (status in ('active', 'review'));

drop policy if exists "Public can read visible suppliers" on suppliers;
create policy "Public can read visible suppliers"
on suppliers
for select
to anon, authenticated
using (status in ('active', 'review'));

drop policy if exists "Public can read visible restaurants" on restaurants;
create policy "Public can read visible restaurants"
on restaurants
for select
to anon, authenticated
using (status in ('active', 'review'));

drop policy if exists "Public can read visible hotels" on hotels;
create policy "Public can read visible hotels"
on hotels
for select
to anon, authenticated
using (status in ('active', 'review'));

drop policy if exists "Public can read visible exchange houses" on exchange_houses;
create policy "Public can read visible exchange houses"
on exchange_houses
for select
to anon, authenticated
using (status in ('active', 'review'));

drop policy if exists "Public can read visible parking" on parking;
create policy "Public can read visible parking"
on parking
for select
to anon, authenticated
using (status in ('active', 'review'));

drop policy if exists "Public can read visible collections" on collections;
create policy "Public can read visible collections"
on collections
for select
to anon, authenticated
using (status in ('active', 'review'));

grant select, insert on table profiles to authenticated;

drop policy if exists "Users can read own profile" on profiles;
create policy "Users can read own profile"
on profiles
for select
to authenticated
using ((select auth.uid()) = id);

drop policy if exists "Users can create own profile" on profiles;
create policy "Users can create own profile"
on profiles
for insert
to authenticated
with check ((select auth.uid()) = id);
