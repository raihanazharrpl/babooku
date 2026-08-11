import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load variabel dari .env
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigrations() {
  console.log('🚀 Memulai proses migrasi ke MySQL...\n');

  let connection;

  try {
    // 1. Buat koneksi ke server MySQL
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      multipleStatements: true, // Penting agar bisa eksekusi multiple SQL dalam 1 file
    });

    const dbName = process.env.DB_NAME || 'toko_buku';

    // 2. Buat database jika belum ada
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    await connection.query(`USE \`${dbName}\`;`);
    console.log(`📡 Terhubung ke database: \x1b[36m${dbName}\x1b[0m\n`);

    // 3. Buat tabel pelacak 'migrations' jika belum ada
    await connection.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        migration VARCHAR(255) NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 4. Ambil daftar migrasi yang sudah pernah di-run
    const [rows] = await connection.query('SELECT migration FROM migrations');
    const executedMigrations = rows.map((row) => row.migration);

    // 5. Baca semua file di folder database/migrations/
    const migrationsDir = path.resolve(__dirname, '../../database/migrations');

    if (!fs.existsSync(migrationsDir)) {
      console.log('⚠️ Folder database/migrations/ tidak ditemukan.');
      process.exit(0);
    }

    const files = fs.readdirSync(migrationsDir).sort(); // Urutkan berdasarkan timestamp/nama
    const pendingFiles = files.filter(
      (file) => file.endsWith('.sql') && !executedMigrations.includes(file)
    );

    if (pendingFiles.length === 0) {
      console.log('✨ Tidak ada migrasi baru. Database sudah up-to-date!');
      process.exit(0);
    }

    // 6. Eksekusi setiap file SQL yang pending
    for (const file of pendingFiles) {
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, 'utf8');

      if (!sql.trim()) {
        console.log(`⏩ Skipping empty file: ${file}`);
        continue;
      }

      console.log(`⏳ Running: \x1b[33m${file}\x1b[0m`);

      // Jalankan query SQL
      await connection.query(sql);

      // Catat file ke tabel migrations
      await connection.query('INSERT INTO migrations (migration) VALUES (?)', [file]);

      console.log(`✅ Success: \x1b[32m${file}\x1b[0m\n`);
    }

    console.log('🎉 Seluruh migrasi berhasil dijalankan!');
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', '\n❌ Proses migrasi gagal:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

runMigrations();
