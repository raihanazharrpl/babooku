-- Migration (PostgreSQL / Supabase): create_books_table
-- Created at: 2026-08-24T18:05:21.505Z

CREATE TABLE IF NOT EXISTS books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    category_id BIGINT NOT NULL,
    subcategory_id BIGINT,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    cover_image VARCHAR(255),
    keywords TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'active' 
        CHECK (status IN ('active', 'inactive', 'maintenance', 'archived')),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_books_category
        FOREIGN KEY (category_id) REFERENCES categories(id),
    CONSTRAINT fk_books_subcategory
        FOREIGN KEY (subcategory_id) REFERENCES subcategories(id) ON DELETE SET NULL
);

ALTER TABLE books ENABLE ROW LEVEL SECURITY;
