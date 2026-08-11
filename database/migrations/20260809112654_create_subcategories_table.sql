CREATE TABLE subcategories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_id BIGINT NOT NULL,
    name VARCHAR(50) NOT NULL,
    slug VARCHAR(60) NOT NULL UNIQUE,
    CONSTRAINT fk_subcategories_category 
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);
