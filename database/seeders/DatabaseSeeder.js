import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { runUserSeeder } from './UserSeeder.js';
import { runCategorySeeder } from './CategorySeeder.js';
import { runBookSeeder } from './BookSeeder.js';

dotenv.config();

async function runDatabaseSeeder() {
  console.log('🌱 Memulai proses DatabaseSeeder...\n');

  let connection;

  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'babooku_db',
    });

    // Jalankan seeder terpisah satu per satu
    await runUserSeeder(connection);
    const { firstCatId, firstSubCatId } = await runCategorySeeder(connection);
    await runBookSeeder(connection, firstCatId, firstSubCatId);

    console.log('\n🎉 Seluruh Seeder Berhasil Dijalankan!');
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', '\n❌ DatabaseSeeder Error:', error.message);
  } finally {
    if (connection) await connection.end();
  }
}

runDatabaseSeeder();
