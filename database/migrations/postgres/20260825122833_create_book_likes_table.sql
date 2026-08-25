-- Migration (PostgreSQL / Supabase): create_book_likes_table
-- Created at: 2026-08-25T05:28:33.814Z

CREATE TABLE IF NOT EXISTS book_likes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    book_id BIGINT NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    
    -- Cegah user memencet tombol like berulang kali pada buku yang sama
    CONSTRAINT uq_user_book_like UNIQUE (user_id, book_id)
);

ALTER TABLE book_likes ENABLE ROW LEVEL SECURITY;