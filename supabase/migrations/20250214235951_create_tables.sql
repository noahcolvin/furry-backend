create table if not exists item (
  id serial primary key,
  name varchar not null,
  price numeric not null,
  description varchar not null,
  rating numeric not null,
  image varchar not null,
  about text[] not null,
  categories text[] not null,
  created_at timestamptz default now()
);

create table if not exists friend (
  id serial primary key,
  name varchar not null,
  image varchar not null,
  created_at timestamptz default now()
);