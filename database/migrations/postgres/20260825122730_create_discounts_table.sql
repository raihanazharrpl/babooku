-- Migration (PostgreSQL / Supabase): create_discounts_table
-- Created at: 2026-08-25T05:27:30.106Z

CREATE TABLE IF NOT EXISTS discounts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL, -- Misal: "Promo Kemerdekaan", "Flash Sale"
    type VARCHAR(20) NOT NULL CHECK (type IN ('percentage', 'fixed')),
    value DECIMAL(10, 2) NOT NULL CHECK (value > 0), -- 20 untuk 20%, atau 15000 untuk Rp 15.000
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE books ADD COLUMN discount_id BIGINT 
    REFERENCES discounts(id) ON DELETE SET NULL;


-- Enable RLS 
ALTER TABLE discounts ENABLE ROW LEVEL SECURITY;

