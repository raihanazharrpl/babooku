-- Migration (PostgreSQL / Supabase): create_books_table
-- Created at: 2026-08-25T05:22:47.990Z

CREATE TABLE IF NOT EXISTS books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    category_id BIGINT NOT NULL,
    subcategory_id BIGINT,
    publisher_id BIGINT,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    cover_image VARCHAR(255),
    
    -- FORMAT BUKU (Mendukung Multi-Select: Physical, Ebook, Audiobook)
    format TEXT[] NOT NULL DEFAULT '{physical}'::TEXT[],
    file_url VARCHAR(255), -- Path/URL file PDF/EPUB/MP3 jika e-book / audiobook
    weight INT DEFAULT 300,  -- Berat fisik dalam gram (untuk kalkulasi ongkir)

    keywords TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'active' 
        CHECK (status IN ('active', 'inactive', 'maintenance', 'archived')),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_books_category
        FOREIGN KEY (category_id) REFERENCES categories(id),
    CONSTRAINT fk_books_subcategory
        FOREIGN KEY (subcategory_id) REFERENCES subcategories(id) ON DELETE SET NULL,
    CONSTRAINT fk_books_publisher
        FOREIGN KEY (publisher_id) REFERENCES publishers(id) ON DELETE SET NULL
);

ALTER TABLE books ENABLE ROW LEVEL SECURITY;
