import mysql from 'mysql2/promise';
import { createBookFactory } from '../factories/bookFactory.js';

export async function runBookSeeder(connection, categoryId, subcategoryId) {
  const books = [];

  // Generate 12 buku dummy via Factory
  for (let i = 0; i < 12; i++) {
    const book = createBookFactory(categoryId, subcategoryId);
    books.push([
      book.category_id,
      book.subcategory_id,
      book.title,
      book.author,
      book.description,
      book.price,
      book.stock,
      book.cover_image,
      book.keywords,
    ]);
  }

  await connection.query(
    `INSERT INTO books (category_id, subcategory_id, title, author, description, price, stock, cover_image, keywords) VALUES ?`,
    [books]
  );

  console.log('  └─ ✅ BookSeeder: 12 Buku dummy berhasil ditambahkan.');
}
