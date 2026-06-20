-- ============================================================
-- Vigil Research Hub — Database Schema
-- Изпълни целия този файл в Supabase SQL Editor (Database > SQL Editor > New Query)
-- ============================================================

-- Таблица за запазените статии
create table saved_articles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  url text not null,
  tag text default 'Общо',
  source_name text,
  created_at timestamp with time zone default now()
);

-- Включваме Row Level Security — БЕЗ това всеки вижда чужди данни
alter table saved_articles enable row level security;

-- Политика: потребител вижда САМО своите статии
create policy "Users can view own articles"
  on saved_articles for select
  using (auth.uid() = user_id);

-- Политика: потребител може да добавя само свои статии
create policy "Users can insert own articles"
  on saved_articles for insert
  with check (auth.uid() = user_id);

-- Политика: потребител може да трие само свои статии
create policy "Users can delete own articles"
  on saved_articles for delete
  using (auth.uid() = user_id);

-- Политика: потребител може да редактира само свои статии
create policy "Users can update own articles"
  on saved_articles for update
  using (auth.uid() = user_id);

-- Индекс за по-бързо филтриране по потребител
create index saved_articles_user_id_idx on saved_articles(user_id);
create index saved_articles_tag_idx on saved_articles(tag);
