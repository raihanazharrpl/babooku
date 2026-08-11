CREATE TABLE books (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_id BIGINT NOT NULL,
    subcategory_id BIGINT,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    cover_image VARCHAR(255),
    keywords TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_books_category 
        FOREIGN KEY (category_id) REFERENCES categories(id),
    CONSTRAINT fk_books_subcategory 
        FOREIGN KEY (subcategory_id) REFERENCES subcategories(id) ON DELETE SET NULL
);
