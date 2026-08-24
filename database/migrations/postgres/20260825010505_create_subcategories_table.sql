-- Migration (PostgreSQL / Supabase): create_subcategories_table
-- Created at: 2026-08-24T18:05:05.834Z

CREATE TABLE IF NOT EXISTS subcategories (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    category_id BIGINT NOT NULL,
    name VARCHAR(50) NOT NULL,
    slug VARCHAR(60) NOT NULL UNIQUE,
    CONSTRAINT fk_subcategories_category
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

ALTER TABLE subcategories ENABLE ROW LEVEL SECURITY;