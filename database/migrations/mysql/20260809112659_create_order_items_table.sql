CREATE TABLE IF NOT EXISTS order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    book_id BIGINT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    price_at_purchase DECIMAL(10, 2) NOT NULL CHECK (price_at_purchase >= 0),
    subtotal DECIMAL(12, 2) GENERATED ALWAYS AS (quantity * price_at_purchase) STORED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Cegah buku ganda dalam 1 ID order
    CONSTRAINT uq_order_book UNIQUE (order_id, book_id),
    
    -- Foreign Keys
    CONSTRAINT fk_order_items_order 
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_order_items_book 
        FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE RESTRICT
);
