-- Migration (PostgreSQL / Supabase): create_publishers_table
-- Created at: 2026-08-25T02:14:40.743Z

CREATE TABLE IF NOT EXISTS publishers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE,
    slug VARCHAR(170) NOT NULL UNIQUE,
    logo VARCHAR(255),
    email VARCHAR(100),
    phone VARCHAR(30),
    website VARCHAR(255),
    address TEXT,
    description TEXT,
    is_official BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) NOT NULL DEFAULT 'active' 
        CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE publishers ENABLE ROW LEVEL SECURITY;
