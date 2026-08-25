-- Migration (MySQL): create_publishers_table
-- Created at: 2026-08-25T02:14:40.739Z

CREATE TABLE IF NOT EXISTS example (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
