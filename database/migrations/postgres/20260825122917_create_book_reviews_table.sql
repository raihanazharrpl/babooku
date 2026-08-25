-- Migration (PostgreSQL / Supabase): create_book_reviews_table
-- Created at: 2026-08-25T05:29:17.697Z

CREATE TABLE IF NOT EXISTS book_reviews (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    book_id BIGINT NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5), -- Bintang 1 sampai 5
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    
    -- Satu user hanya bisa memberi 1 ulasan per buku
    CONSTRAINT uq_user_book_review UNIQUE (user_id, book_id)
);

ALTER TABLE book_reviews ENABLE ROW LEVEL SECURITY;
