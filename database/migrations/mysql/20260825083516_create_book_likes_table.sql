-- Migration (MySQL): create_book_likes_table
-- Created at: 2026-08-25T01:35:16.316Z

CREATE TABLE IF NOT EXISTS example (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
