import mysql from 'mysql2/promise';
import pkg from 'pg';
import inquirer from 'inquirer';
import dotenv from 'dotenv';

// Import hanya CategorySeeder
import { seedMySQL as seedCategoriesMySQL, seedPostgres as seedCategoriesPostgres } from './CategorySeeder.js';

dotenv.config();
const { Client: PgClient } = pkg;

// ----------------------------------------------------
// RUNNER MYSQL
// ----------------------------------------------------
async function runMySQLSeeder() {
  console.log('\n🌱 Memulai Database Seeder (MySQL)...\n');

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'babooku_db',
  });

  try {
    // Cukup jalankan CategorySeeder
    await seedCategoriesMySQL(connection);
    console.log('\n🎉 Seeder Kategori MySQL Berhasil Dijalankan!');
  } finally {
    await connection.end();
  }
}

// ----------------------------------------------------
// RUNNER POSTGRESQL / SUPABASE
// ----------------------------------------------------
async function runPostgresSeeder() {
  console.log('\n🌱 Memulai Database Seeder (PostgreSQL / Supabase)...\n');

  const client = new PgClient({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();

    // Cukup jalankan CategorySeeder
    await seedCategoriesPostgres(client);

    console.log('\n🎉 Seeder Kategori PostgreSQL Berhasil Dijalankan!');
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
      type: 'select', // Inquirer v10+ breaking change fix
      name: 'targetDb',
      message: 'Pilih target database untuk seeding:',
      choices: [
        { name: '🐬 MySQL (Local)', value: 'mysql' },
        { name: '⚡ PostgreSQL (Supabase)', value: 'postgres' },
      ],
    },
  ]);

  try {
    if (answers.targetDb === 'mysql') {
      await runMySQLSeeder();
    } else {
      await runPostgresSeeder();
    }
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', '\n❌ DatabaseSeeder Error:', error.message);
  }
}

main();
