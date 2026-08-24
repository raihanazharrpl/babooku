-- Migration (MySQL): create_notifications_table
-- Created at: 2026-08-24T23:19:32.469Z

CREATE TABLE IF NOT EXISTS example (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
