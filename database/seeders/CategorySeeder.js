import mysql from 'mysql2/promise';

export async function runCategorySeeder(connection) {
  // 1. Insert Kategori Utama
  const categories = [
    ['Pemrograman & Teknologi', 'pemrograman-teknologi'],
    ['Novel & Fiksi', 'novel-fiksi'],
    ['Bisnis & Manajemen', 'bisnis-manajemen'],
  ];

  const [catResult] = await connection.query(
    `INSERT INTO categories (name, slug) VALUES ?`,
    [categories]
  );
  const firstCatId = catResult.insertId;

  // 2. Insert Subkategori
  const subcategories = [
    [firstCatId, 'Web Development', 'web-development'],
    [firstCatId, 'Mobile App', 'mobile-app'],
    [firstCatId + 1, 'Novel Fantasi', 'novel-fantasi'],
  ];

  const [subCatResult] = await connection.query(
    `INSERT INTO subcategories (category_id, name, slug) VALUES ?`,
    [subcategories]
  );
  const firstSubCatId = subCatResult.insertId;

  console.log('  └─ ✅ CategorySeeder: Kategori & Subkategori berhasil ditambahkan.');

  // Mengembalikan ID untuk digunakan oleh BookSeeder
  return { firstCatId, firstSubCatId };
}
