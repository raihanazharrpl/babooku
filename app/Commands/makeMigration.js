import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper untuk format timestamp YYYYMMDDHHMMSS
function getTimestamp() {
  const now = new Date();
  return [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
    String(now.getHours()).padStart(2, '0'),
    String(now.getMinutes()).padStart(2, '0'),
    String(now.getSeconds()).padStart(2, '0'),
  ].join('');
}

// Template SQL untuk MySQL
function getMysqlTemplate(cleanName) {
  return `-- Migration (MySQL): ${cleanName}
-- Created at: ${new Date().toISOString()}

CREATE TABLE IF NOT EXISTS example (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;
}

// Template SQL untuk PostgreSQL / Supabase
function getPostgresTemplate(cleanName) {
  return `-- Migration (PostgreSQL / Supabase): ${cleanName}
-- Created at: ${new Date().toISOString()}

CREATE TABLE IF NOT EXISTS example (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS 
ALTER TABLE example ENABLE ROW LEVEL SECURITY;

`;
}

// Helper pembuat file migrasi
function createMigrationFile(dbType, cleanName, timestamp) {
  const targetDir = path.resolve(__dirname, `../../database/migrations/${dbType}`);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Cek file duplikat
  const existingFiles = fs.readdirSync(targetDir);
  const isDuplicate = existingFiles.some((file) => {
    const fileWithoutTimestamp = file.replace(/^\d{14}_/, '');
    return fileWithoutTimestamp === `${cleanName}.sql`;
  });

  if (isDuplicate) {
    console.log(
      '\x1b[33m%s\x1b[0m',
      `⚠️  Skipped [${dbType}]: File migrasi '${cleanName}.sql' sudah ada.`
    );
    return;
  }

  const fileName = `${timestamp}_${cleanName}.sql`;
  const filePath = path.join(targetDir, fileName);
  const template = dbType === 'mysql' ? getMysqlTemplate(cleanName) : getPostgresTemplate(cleanName);

  fs.writeFileSync(filePath, template, 'utf8');
  console.log('\x1b[32m%s\x1b[0m', `✅ Created [${dbType}]: database/migrations/${dbType}/${fileName}`);
}

async function main() {
  // 1. Ambil nama migrasi dari CLI argumen jika ada
  let migrationNameInput = process.argv[2];

  if (!migrationNameInput) {
    const nameAnswer = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Masukkan nama migrasi:',
        validate: (input) => (input.trim() ? true : 'Nama migrasi tidak boleh kosong!'),
      },
    ]);
    migrationNameInput = nameAnswer.name;
  }

  const cleanName = migrationNameInput.toLowerCase().trim().replace(/[\s-]+/g, '_');

  // 2. Pilih target database
  const answers = await inquirer.prompt([
    {
      type: 'select', // Ubah dari 'list' ke 'select'
      name: 'targetDb',
      message: 'Pilih target database untuk migrasi ini:',
      choices: [
        { name: '🐬 MySQL Saja', value: 'mysql' },
        { name: '⚡ PostgreSQL (Supabase) Saja', value: 'postgres' },
        { name: '📦 Keduanya (MySQL & Postgres)', value: 'both' },
      ],
    },
  ]);


  const timestamp = getTimestamp();

  console.log('\n⏳ Membuat file migrasi...\n');

  if (answers.targetDb === 'mysql' || answers.targetDb === 'both') {
    createMigrationFile('mysql', cleanName, timestamp);
  }

  if (answers.targetDb === 'postgres' || answers.targetDb === 'both') {
    createMigrationFile('postgres', cleanName, timestamp);
  }

  console.log('\n🎉 Selesai!\n');
}

main();