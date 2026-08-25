-- Migration (MySQL): create_book_reviews_table
-- Created at: 2026-08-25T01:54:21.597Z

CREATE TABLE IF NOT EXISTS example (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
