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

// Helper membaca folder migrasi
function getPendingMigrations(dbType, executedMigrations) {
  const migrationsDir = path.resolve(__dirname, `../../database/migrations/${dbType}`);
  
  if (!fs.existsSync(migrationsDir)) {
    return { migrationsDir, pendingFiles: [] };
  }

  const files = fs.readdirSync(migrationsDir).sort();
  const pendingFiles = files.filter(
    (file) => file.endsWith('.sql') && !executedMigrations.includes(file)
  );

  return { migrationsDir, pendingFiles };
}

// ----------------------------------------------------
// MIGRASI MYSQL
// ----------------------------------------------------
async function runMySQL(isFresh = false) {
  console.log(`\n🚀 Memulai migrasi ke MySQL ${isFresh ? '(FRESH)' : ''}...\n`);
  const dbName = process.env.DB_NAME || 'babooku_db';

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true,
  });

  try {
    if (isFresh) {
      console.log(`🔥 Dropping database \x1b[31m${dbName}\x1b[0m...`);
      await connection.query(`DROP DATABASE IF EXISTS \`${dbName}\`;`);
      console.log('✨ Database berhasil dihapus.\n');
    }

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    await connection.query(`USE \`${dbName}\`;`);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        migration VARCHAR(255) NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const [rows] = await connection.query('SELECT migration FROM migrations');
    const executed = rows.map((r) => r.migration);
    
    const { migrationsDir, pendingFiles } = getPendingMigrations('mysql', executed);

    if (pendingFiles.length === 0) {
      console.log('✨ Database MySQL sudah up-to-date!');
      return;
    }

    for (const file of pendingFiles) {
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
      if (!sql.trim()) continue;

      console.log(`⏳ Running (MySQL): \x1b[33m${file}\x1b[0m`);
      await connection.query(sql);
      await connection.query('INSERT INTO migrations (migration) VALUES (?)', [file]);
      console.log(`✅ Success: \x1b[32m${file}\x1b[0m\n`);
    }
  } finally {
    await connection.end();
  }
}

// ----------------------------------------------------
// MIGRASI POSTGRESQL / SUPABASE
// ----------------------------------------------------
async function runPostgres(isFresh = false) {
  console.log(`\n🚀 Memulai migrasi ke Supabase Postgres ${isFresh ? '(FRESH)' : ''}...\n`);

  const client = new PgClient({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();

    if (isFresh) {
      console.log('🔥 Dropping schema \x1b[31mpublic\x1b[0m di Supabase...');
      // Menghapus schema public beserta seluruh isi tabel & tipe datanya, lalu membuat ulang
      await client.query('DROP SCHEMA public CASCADE;');
      await client.query('CREATE SCHEMA public;');
      await client.query('GRANT ALL ON SCHEMA public TO postgres;');
      await client.query('GRANT ALL ON SCHEMA public TO public;');
      console.log('✨ Schema public berhasil di-reset.\n');
    }

    await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        migration VARCHAR(255) NOT NULL,
        executed_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const { rows } = await client.query('SELECT migration FROM migrations');
    const executed = rows.map((r) => r.migration);

    const { migrationsDir, pendingFiles } = getPendingMigrations('postgres', executed);

    if (pendingFiles.length === 0) {
      console.log('✨ Database PostgreSQL Supabase sudah up-to-date!');
      return;
    }

    for (const file of pendingFiles) {
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
      if (!sql.trim()) continue;

      console.log(`⏳ Running (Postgres): \x1b[33m${file}\x1b[0m`);
      await client.query(sql);
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
      message: 'Pilih target database untuk migrasi:',
      choices: [
        { name: '🐬 MySQL (Local / Server)', value: 'mysql' },
        { name: '⚡ PostgreSQL (Supabase)', value: 'postgres' },
      ],
    },
    {
      type: 'select',
      name: 'mode',
      message: 'Pilih mode eksekusi migrasi:',
      choices: [
        { name: '⏩ Run Pending Migrations (Aman / Standard)', value: 'standard' },
        { name: '💥 Fresh Migration (HAPUS DB & Ulang dari awal)', value: 'fresh' },
      ],
    },
  ]);

  try {
    const isFresh = answers.mode === 'fresh';

    if (answers.targetDb === 'mysql') {
      await runMySQL(isFresh);
    } else {
      await runPostgres(isFresh);
    }
    console.log('🎉 Seluruh proses migrasi selesai!');
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', '\n❌ Migrasi gagal:', error.message);
  }
}

main();
