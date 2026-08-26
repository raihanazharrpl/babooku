import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';
import pkg from 'pg';
import inquirer from 'inquirer';
import dotenv from 'dotenv';

dotenv.config();

const { Client: PgClient } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper membaca folder migrasi & memfilter file yang belum dijalankan
function getPendingMigrations(dbType, executedMigrations) {
  const migrationsDir = path.resolve(__dirname, `../../database/migrations/${dbType}`);
  
  if (!fs.existsSync(migrationsDir)) {
    return { migrationsDir, pendingFiles: [] };
  }

  const files = fs.readdirSync(migrationsDir).sort();
  // Hanya ambil file .sql yang BELUM ada di tabel 'migrations'
  const pendingFiles = files.filter(
    (file) => file.endsWith('.sql') && !executedMigrations.includes(file)
  );

  return { migrationsDir, pendingFiles };
}

// ----------------------------------------------------
// MIGRASI MYSQL (SAFE - NO DROP)
// ----------------------------------------------------
async function runMySQL() {
  console.log(`\n🚀 Memulai pembaruan migrasi ke MySQL...\n`);
  const dbName = process.env.DB_NAME || 'babooku_db';

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true,
  });

  try {
    // Pastikan DB ada (Tanpa Hapus Data!)
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    await connection.query(`USE \`${dbName}\`;`);

    // Pastikan Tabel Migrations ada
    await connection.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        migration VARCHAR(255) NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Ambil daftar file yang sudah dieksekusi sebelumnya
    const [rows] = await connection.query('SELECT migration FROM migrations');
    const executed = rows.map((r) => r.migration);
    
    const { migrationsDir, pendingFiles } = getPendingMigrations('mysql', executed);

    if (pendingFiles.length === 0) {
      console.log('✨ Database MySQL sudah up-to-date! Tidak ada tabel/skema baru.');
      return;
    }

    console.log(`📌 Ditemukan ${pendingFiles.length} file migrasi baru yang belum dieksekusi.\n`);

    for (const file of pendingFiles) {
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
      if (!sql.trim()) continue;

      console.log(`⏳ Executing: \x1b[33m${file}\x1b[0m`);
      
      // Jalankan query SQL migrasi baru
      await connection.query(sql);
      // Catat ke tabel migrations agar tidak dijalankan ulang nanti
      await connection.query('INSERT INTO migrations (migration) VALUES (?)', [file]);
      
      console.log(`✅ Success: \x1b[32m${file}\x1b[0m\n`);
    }
  } finally {
    await connection.end();
  }
}

// ----------------------------------------------------
// MIGRASI POSTGRESQL / SUPABASE (SAFE - NO DROP)
// ----------------------------------------------------
async function runPostgres() {
  console.log(`\n🚀 Memulai pembaruan migrasi ke Supabase Postgres...\n`);

  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL tidak ditemukan di file .env');
  }

  const client = new PgClient({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();

    // Pastikan Tabel Migrations ada (Tanpa Hapus Data!)
    await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        migration VARCHAR(255) NOT NULL,
        executed_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Ambil daftar file yang sudah dieksekusi sebelumnya
    const { rows } = await client.query('SELECT migration FROM migrations');
    const executed = rows.map((r) => r.migration);

    const { migrationsDir, pendingFiles } = getPendingMigrations('postgres', executed);

    if (pendingFiles.length === 0) {
      console.log('✨ Database Supabase sudah up-to-date! Tidak ada tabel/skema baru.');
      return;
    }

    console.log(`📌 Ditemukan ${pendingFiles.length} file migrasi baru yang belum dieksekusi.\n`);

    for (const file of pendingFiles) {
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
      if (!sql.trim()) continue;

      console.log(`⏳ Executing (Supabase): \x1b[33m${file}\x1b[0m`);
      
      // Jalankan query SQL migrasi baru
      await client.query(sql);
      // Catat ke tabel migrations agar tidak dijalankan ulang nanti
      await client.query('INSERT INTO migrations (migration) VALUES ($1)', [file]);
      
      console.log(`✅ Success: \x1b[32m${file}\x1b[0m\n`);
    }
  } finally {
    await client.end();
  }
}

// ----------------------------------------------------
// MAIN PROMPT
// ----------------------------------------------------
async function main() {
  const answers = await inquirer.prompt([
    {
      type: 'select',
      name: 'targetDb',
      message: 'Pilih target database untuk update skema:',
      choices: [
        { name: '🐬 MySQL (Local / Server)', value: 'mysql' },
        { name: '⚡ PostgreSQL (Supabase Cloud)', value: 'postgres' },
      ],
    },
    {
      type: 'confirm',
      name: 'confirmRun',
      message: 'Jalankan pengecekan & update tabel baru (Aman / Data lama tetap utuh)?',
      default: true,
    },
  ]);

  if (!answers.confirmRun) {
    console.log('\x1b[36m%s\x1b[0m', '🚫 Eksekusi dibatalkan.');
    process.exit(0);
  }

  try {
    if (answers.targetDb === 'mysql') {
      await runMySQL();
    } else {
      await runPostgres();
    }
    console.log('🎉 Seluruh skema database berhasil diperbarui tanpa menghapus data!');
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', '\n❌ Update migrasi gagal:', error.message);
  }
}

main();
